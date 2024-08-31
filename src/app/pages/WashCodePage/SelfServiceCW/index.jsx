import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getWashCodeDetail, toWashCode } from 'src/api/game/gamelist';
import Loading from 'src/app/components/Loader/index';
import AlertContainer from 'src/app/components/Modal/AlertContainer';
import { updateBalance } from 'src/reducers/userInfo';
import { WashCodeTable } from '../Fragments/WashCodeTable';
import { SelfServiceHeader } from '../Fragments/tableData/SelfServiceHeader';
import styles from './index.module.scss';

export default function SelfServiceCW() {
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const takeMe = useNavigate();
  const [total, setTotal] = useState();
  const [alertWash, setAlertWash] = useState(false);
  const [disableWash, setDisableWash] = useState(false);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = async () => {
    try {
      //hide the lottery games
      setIsLoading(true);
      const res = await getWashCodeDetail();
      setServiceData(res.data?.data?.rspGameTypeWashCodes.filter((item) => item.gameTypeId !== 6));
    } catch (Error) {
      console.log(Error);
    } finally {
      setIsLoading(false);
    }
  };

  function navigateToHome() {
    takeMe('/');
  }

  function pressWashCode() {
    // setServiceData([]);
    setDisableWash(true);
    setAlertWash(true);
    toWashCode()
      .then((res) => {
        //hide the lottery games
        // setServiceData(res.data.data?.rspGameTypeWashCodes);
        setServiceData(res.data.data?.rspGameTypeWashCodes);
      })
      .catch((err) => {
        alert(err.msg);
      });
    setTimeout(() => {
      setAlertWash(false);
      setDisableWash(false);
      reloadData();
      dispatch(updateBalance());
      let x = 0;
      serviceData?.map((i) => {
        x += i.washCodeAmount;
        setTotal(parseFloat(x).toFixed(2));
      });
    }, 1500);
  }

  useEffect((i) => {
    let x = 0;
    serviceData?.map((i) => {
      x += i.washCodeAmount;
      setTotal(parseFloat(x).toFixed(2));
    });
  });

  return (
    <>
      <div className={styles.selfServiceContainer} data-theme={currTheme}>
        <AlertContainer alertMe={alertWash} notify={'操作成功'} top={2} left={2.8} />
        <div className={styles.wrapper}>
          <div className={styles.tableContainer}>
            {isLoading ? (
              <div className={styles.loading}>
                <Loading load={isLoading} classname={styles.loading} />
              </div>
            ) : (
              <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
                <WashCodeTable
                  pbot={'.03rem'}
                  expandlang={true}
                  headerData={SelfServiceHeader}
                  tableData={serviceData}
                />
              </PullToRefresh>
            )}
          </div>

          <div className={styles.footer}>
            <div className={styles.infoCont}>
              <div className={styles.infoKey}>可领取洗码总额</div>
              <div className={styles.infoValue}>¥&nbsp; {total}</div>
            </div>
            <div className={styles.buttonCont}>
              <div onClick={disableWash ? null : pressWashCode} className={styles.button}>
                <span>一键领取</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
