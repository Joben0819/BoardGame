import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { default as ReactSelect, default as Select } from 'react-select';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getFundDetails, getTradeTypes } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { VIPAccountDetailsTableHeader } from 'src/app/data/Tables/VIPAccountDetails';
import styles from './index.module.scss';

export default function AccountDetails({ selectBrEnumTime, defVal }) {
  const [timeFrame, setTimeFrame] = useState(selectBrEnumTime[0]?.name);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [selectTradeType, setSelectTradeType] = useState([]);
  const [vipAccountDetailsTableData, setVipAccountDetailsTableData] = useState([]);
  const [tradeTypeName, setTradeTypeName] = useState(defVal[0]?.name);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getTradeTypes().then((res) => {
      const fetchedTradeTypes = res.data.data.filter(
        (type) => !type.name.toLowerCase().includes('lottery')
      );

      let transformedTradeTypes = [];
      fetchedTradeTypes?.map((type, idx) => {
        transformedTradeTypes.push({
          value: idx + 2,
          name: type.name,
          label: type.des,
        });
        if (idx === fetchedTradeTypes?.length - 1) {
          setSelectTradeType(defVal.concat(transformedTradeTypes));
        }
      });
    });
  }, []);

  useEffect(() => {
    let scrollableAccountDetails = document.getElementById('scrollableAccountDetails');
    scrollableAccountDetails.scrollTop = 0;
    reloadData();
    setPage(1);
  }, [timeFrame, tradeTypeName]);

  const reloadData = async () => {
    getFundDetails(tradeTypeName, timeFrame, 1).then((res) => {
      setVipAccountDetailsTableData(res.data.data);
      if (res.data.data?.length < 50) {
        setHasMore(false);
      } else if (res.data.data?.length === 50) {
        setHasMore(true);
      } else {
        setHasMore(true);
      }
    });
  };

  const loadMoreData = async () => {
    getFundDetails(tradeTypeName, timeFrame, page + 1)
      .then((res) => {
        setVipAccountDetailsTableData((prev) => [...prev, ...res.data?.data]);
        setPage((prevPage) => prevPage + 1);
        // Check if there is more data available
        if (res.data.data?.length === 0) {
          setHasMore(false);
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={styles.container} data-theme={currTheme}>
      <div className={styles.accountDetails_wrapper}>
        <div className={styles.accountDetails_1stBox}>
          <div className={styles.acBox_leftside}>
            <div className={styles.acLeft_selectLabel}>交易时间</div>
            <Select
              options={selectBrEnumTime}
              // menuIsOpen={true}
              onChange={(e) => {
                setTimeFrame(e.name);
              }}
              defaultValue={selectBrEnumTime[0]}
              classNamePrefix={'vipSelectdd'}
              isSearchable={false}
            />
          </div>
          <div className={styles.acBox_rightside}>
            <div className={styles.acRight_selectLabel}>交易状态</div>
            <ReactSelect
              options={selectTradeType}
              // menuIsOpen={true}
              onChange={(e) => {
                setTradeTypeName(e.name);
              }}
              defaultValue={defVal[0]}
              classNamePrefix={'vipSelectdd'}
              isSearchable={false}
            />
          </div>
        </div>
        <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
          <div id='scrollableAccountDetails' className={styles.accountDetails_2ndBox}>
            <InfiniteScroll
              dataLength={vipAccountDetailsTableData?.length}
              next={loadMoreData}
              hasMore={hasMore}
              loader={
                <div className={styles.dataSizeIndicator}>
                  {!vipAccountDetailsTableData || !vipAccountDetailsTableData?.length
                    ? ''
                    : 'Loading...'}
                </div>
              }
              endMessage={
                <div className={styles.dataSizeIndicator}>
                  {/* {!vipAccountDetailsTableData ||
                  !vipAccountDetailsTableData?.length
                    ? ""
                    : "No more data"} */}
                </div>
              }
              scrollableTarget='scrollableAccountDetails'
            >
              <BasicTable
                headerData={VIPAccountDetailsTableHeader}
                basicData={vipAccountDetailsTableData ? vipAccountDetailsTableData : []}
              />
            </InfiniteScroll>
          </div>

          {!vipAccountDetailsTableData ||
            (!vipAccountDetailsTableData?.length && (
              <div className={styles.noDataAccountDetails}>
                <NoData />
              </div>
            ))}
        </PullToRefresh>
      </div>
    </div>
  );
}
