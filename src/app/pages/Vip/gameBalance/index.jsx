import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { gameWithdrawal, getGameBalance } from 'src/api/game/gamelist';
import GameBalanceCard from 'src/app/components/GameBalanceCard/Index';
import AlertContainer from 'src/app/components/Modal/AlertContainer';
import NoData from 'src/app/components/NoData';
import { updateBalance } from 'src/reducers/userInfo';
import styles from './index.module.scss';

export default function GameBalance() {
  const [alertMe, setAlertMe] = useState(false);
  const [gameBalanceData, setGameBalanceData] = useState([]);
  const [notifyMsg, setNotifyMsg] = useState(null);
  const dispatch = useDispatch();
  let alertTimer;

  const reloadData = async () => {
    getGameBalance().then((res) => {
      setGameBalanceData(res.data.data);
    });
  };

  useEffect(() => {
    getGameBalance().then((res) => {
      setGameBalanceData(res.data.data);
    });
  }, []);

  function getBackMoney(id, money) {
    gameWithdrawal(id).then((res) => {
      if (res.data.code === 200) {
      }
      setNotifyMsg(res.data.msg);
      setAlertMe(true);
      alertTimer = setTimeout(() => {
        dispatch(updateBalance());
        setAlertMe(false);
        setNotifyMsg(null);
        reloadData();
        clearTimeout(alertTimer);
      }, 2000);
    });
  }

  return (
    <div className={styles.container}>
      <>
        {gameBalanceData?.length < 0 ? (
          <div className={styles.noDataWrapper}>
            <NoData />
          </div>
        ) : (
          <div
            className={classnames(styles.gameBalance_mainWrapper, {
              [styles.noData]: gameBalanceData?.length <= 0,
            })}
          >
            <AlertContainer alertMe={alertMe} notify={notifyMsg} top={2.5} left={2.2} />
            <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
              <div className={styles.gameBalanceCardContainer}>
                {gameBalanceData?.length > 0 ? (
                  gameBalanceData?.map((BalanceData, index) => {
                    return (
                      <GameBalanceCard
                        getBackMoney={() => getBackMoney(BalanceData.platformId, BalanceData.money)}
                        platformId={BalanceData.platformId}
                        platformName={BalanceData.platformName}
                        money={BalanceData.money}
                      />
                    );
                  })
                ) : (
                  <div className={styles.noDataWrapper}>
                    <NoData />
                  </div>
                )}
              </div>
            </PullToRefresh>
          </div>
        )}
      </>
    </div>
  );
}
