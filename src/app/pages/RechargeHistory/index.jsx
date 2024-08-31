import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { withdrawRechargeDetail } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';
import OtherHeader from 'src/app/components/OtherHeader';
import SidebarV2 from 'src/app/components/Sidebar';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { isLoggedIn } from 'src/utils/helpers';
import { RechargeHistory as HeaderData } from '../../data/Tables/RechargeHistory';
import styles from './index.module.scss';

const RechargeHistory = () => {
  const list = ['在线充值', '银行卡充值', 'USDT充值'];
  const rechargeType = ['rechargeOnline', 'rechargeBank', 'rechargeUsdt'];
  const [activeItem, setActiveItem] = useState(0);
  const [rechargeDetails, setRechargeDetails] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activePage, setActivePage] = useState();
  const [buttonsNum, setButtonsNum] = useState();
  const takeMe = useNavigate();
  const { currTheme } = useSelector((state) => state.gameSettings);

  if (!isLoggedIn()) {
    takeMe('/');
  }

  useEffect(() => {
    withdrawRechargeDetail(rechargeType[activeItem]).then((res) => {
      setButtonsNum(Math.ceil(res.data?.data.length / pageSize));
    });
  }, [activeItem, pageSize]);

  const reloadData = async () => {
    withdrawRechargeDetail(rechargeType[activeItem], pageNum, pageSize).then((res) => {
      setRechargeDetails(res.data?.data);
    });
  };
  useEffect(() => {
    withdrawRechargeDetail(rechargeType[activeItem], pageNum, pageSize).then((res) => {
      setRechargeDetails(res.data?.data);
    });
  }, [activeItem, pageNum, pageSize]);
  return (
    isLoggedIn() && (
      <>
        <OtherHeader title={'充值记录'} />
        <div className={styles.rechargeHistoryWrapper}>
          <SidebarV2 list={list} activeItem={activeItem} setActiveItem={setActiveItem} />
          <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
            <div className={styles.rechargeHistoryContentWrapper} data-theme={currTheme}>
              <div>
                {rechargeDetails && (
                  <BasicTable
                    noHeader={true}
                    headerData={HeaderData}
                    basicData={rechargeDetails}
                    borderRight='none'
                  />
                )}
              </div>
              {rechargeDetails?.length === 0 && (
                <div className={styles.ndCont} style={{ marginTop: '13%' }}>
                  <NoData />
                </div>
              )}

              {/* <div className={styles.paginationContainer}>
            
              {buttonsNum &&
                [...Array(buttonsNum)]?.map((page, index) => {
                  return (
                    <div
                      className={`${styles.pageButton} ${
                        activePage === index + 1
                          ? styles.activePageButton
                          : null
                      } `}
                      onClick={() => {
                        setPageNum(index + 1);
                        setActivePage(index + 1);
                      }}
                    >
                      <span>{index + 1}</span>
                    </div>
                  );
                })}
            </div> */}
            </div>
          </PullToRefresh>
        </div>
      </>
    )
  );
};

export default RechargeHistory;
