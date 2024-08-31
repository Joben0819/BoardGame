import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getRecommendDetailList } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { PerfomanceInquiryTableHeader } from 'src/app/data/Tables/PerformanceInquiryTableHeader';
import styles from './index.module.scss';

export default function PerformanceInquiry() {
  const [promoteSearchID, setPromoteSearchID] = useState('');
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [performanceInquiryTableData, setPerformanceInquiryTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // getRecommendDetailList(promoteSearchID).then((res) => {
    //   setPerformanceInquiryTableData(res.data.data);
    // });
    let scrollablePerformanceInq = document.getElementById('scrollablePerformanceInq');
    scrollablePerformanceInq.scrollTop = 0;
    reloadData();
    setPage(1);
  }, [promoteSearchID]);

  const reloadData = async () => {
    getRecommendDetailList(promoteSearchID, 1).then((res) => {
      setPerformanceInquiryTableData(res.data?.data);
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
    getRecommendDetailList(promoteSearchID, page + 1)
      .then((res) => {
        setPerformanceInquiryTableData((prev) => [...prev, ...res.data?.data]);
        setPage((prevPage) => prevPage + 1);
        // Check if there is more data available
        if (res.data.data?.length === 0) {
          setHasMore(false);
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className={styles.container} data-theme={currTheme}>
        <div className={styles.performanceInquiry_wrapper}>
          <div className={styles.performanceInquiry_1stBox}>
            <div className={styles.pInquiry_inputHolder}>
              <input
                type='text'
                placeholder='输入会员ID查看下级信息'
                value={promoteSearchID}
                onChange={(e) => {
                  setPromoteSearchID(e.target.value);
                }}
              ></input>
              {promoteSearchID ? (
                <img
                  onClick={() => {
                    setPromoteSearchID('');
                  }}
                  src={require(`./../../../assets/${currTheme}/main/search-clear${
                    currTheme === 'greenYellow' ||
                    currTheme === 'redGold' ||
                    currTheme === 'whiteGold' ||
                    currTheme === 'skyBlue'
                      ? '2'
                      : ''
                  }.png`)}
                  style={{
                    width: '0.1rem',
                    height: '.1rem',
                    marginTop: '0.07rem',
                    marginLeft: '-0.11rem',
                  }}
                  alt='Search Clear'
                />
              ) : (
                <img
                  src={require(`../../../assets/${currTheme}/main/search-icon${
                    currTheme === 'greenYellow' ||
                    currTheme === 'whiteGold' ||
                    currTheme === 'skyBlue'
                      ? '2'
                      : ''
                  }.png`)}
                  style={{
                    width: '0.1rem',
                    height: '.1rem',
                    marginTop: '0.07rem',
                    marginLeft: '-0.11rem',
                  }}
                  alt='Search Icon'
                />
              )}
            </div>
            <div className={styles.pInquiry_buttonHolder}>
              <button onClick={() => reloadData(promoteSearchID)}>搜索 </button>
            </div>
          </div>
          <div className={styles.line} data-theme={currTheme}></div>
          <PullToRefresh className={styles.pullToRefresh} onRefresh={reloadData}>
            <div id='scrollablePerformanceInq' className={styles.PerfomanceInquiryTableContainer}>
              {(performanceInquiryTableData?.length > 0 && (
                <InfiniteScroll
                  dataLength={performanceInquiryTableData?.length}
                  next={loadMoreData}
                  hasMore={hasMore}
                  loader={<div className={styles.dataSizeIndicator}>Loading...</div>}
                  endMessage={<div className={styles.dataSizeIndicator}></div>}
                  scrollableTarget='scrollablePerformanceInq'
                >
                  <BasicTable
                    headerData={PerfomanceInquiryTableHeader}
                    basicData={performanceInquiryTableData ? performanceInquiryTableData : []}
                  />
                </InfiniteScroll>
              )) || (
                <div className={styles.NodataCont}>
                  <BasicTable headerData={PerfomanceInquiryTableHeader} basicData={[]} />
                  <NoData />
                </div>
              )}
            </div>
          </PullToRefresh>
        </div>
      </div>
    </>
  );
}
