import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { payTypeList } from 'src/api/game/gamelist';
import Loading from 'src/app/components/Loader/index';
import OtherHeader from 'src/app/components/OtherHeader';
import SidebarV2 from 'src/app/components/Sidebar';
import { setIpAddress } from 'src/reducers/userInfo';
import { isLoggedIn } from 'src/utils/helpers';
import soundFile from './../../data/audioData/recharge.mp3';
import RechargeContent from './components/RechargeContent';
import SuccessRechargeModal from './components/SuccessRechargeModal';
import styles from './index.module.scss';

const Recharge = () => {
  const [rechargeItemList, setRechargeItemList] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [credPaymentSuccess, setCredPaymentSuccess] = useState(false);
  const { ipAddress } = useSelector((state) => state.userInfo);
  const takeMe = useNavigate();
  const location = useLocation();
  const locationState = location.state;
  const dispatch = useDispatch();

  if (!isLoggedIn()) {
    takeMe('/');
  }

  useEffect(() => {
    payTypeList().then((res) => {
      setRechargeItemList(res.data.data);
    });

    if (
      locationState?.from === 'RechargeHistory' &&
      localStorage.getItem('credPaymentSuccess') === 'true'
    ) {
      setCredPaymentSuccess(true);
    }
  }, []);

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    audioFile.play();
    !ipAddress &&
      fetch('https://www.taobao.com/help/getip.php?callback=ipCallback')
        .then((response) => response.json())
        .then((data) => {
          const ipAddress = data.ip;
          dispatch(setIpAddress(ipAddress || localStorage.getItem('externalIP')));
        })
        .catch((error) => {
          fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
              const ipAddress = data.ip;
              dispatch(setIpAddress(ipAddress || localStorage.getItem('externalIP')));
            });
        });
    // IP()
    //   .then((res) => dispatch(setIpAddress(res.data?.ip)))
    //   .catch((err) => {
    //     IPBackup().then((res) => dispatch(setIpAddress(res.data?.ip)));
    //   });
  }, []);

  const load = rechargeItemList.length === 0;
  return (
    isLoggedIn() && (
      <>
        {load && <Loading load={load} />}
        {showSuccessModal && <SuccessRechargeModal setShowSuccessModal={setShowSuccessModal} />}
        <div className={styles.rechargeWrapper}>
          <OtherHeader title={'充值'} />
          <div className={styles.rechargeContent}>
            <SidebarV2
              list={rechargeItemList}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
            {rechargeItemList?.map((item, index) => {
              return (
                activeItem === index && (
                  <RechargeContent
                    key={index}
                    setShowSuccessModal={setShowSuccessModal}
                    activeSidebarItem={item}
                    credPaymentSuccess={credPaymentSuccess}
                    setCredPaymentSuccess={setCredPaymentSuccess}
                  />
                )
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

export default Recharge;
