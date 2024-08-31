import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowseInit, loginDevice } from 'src/api/game/gamelist';
import NECaptchaComponent from 'src/commons/Captcha/NECaptchaComponent';
import {
  setShowAnnouncementModal,
  setShowBindWithdrawModal,
  setShowLoginModal,
  setShowOtherModalComp,
} from 'src/reducers/gameSettings';
import { setUserBalance, setUserData } from 'src/reducers/userInfo';
import { getDeviceModel } from 'src/utils/helpers';
import closeImg from '../../../assets/blackGold/login_register/loginClose.png';
import leftBtn from '../../../assets/blackGold/login_register/lYellowBtn.png';
import superRightBtn from '../../../assets/blackGold/login_register/purpleBtn.png';
import rightBtn from '../../../assets/blackGold/login_register/rGreenBtn.png';
import AlertContainer from '../AlertContainer';

const LoginModal = ({ setIsShowUserAuth }) => {
  const dispatch = useDispatch();
  // const { switchLine, urlDomains } = useLineSwitch();
  // const [prod, setProd] = useState();
  const [captchaId, setCaptchaId] = useState();
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState(false);

  useEffect(() => {
    BrowseInit().then((res) => {
      // setProd(res.data.data?.productId);
      setCaptchaId(res.data.data?.captchaId);
      setIsCaptchaEnabled(res.data.data?.actionSwitch === '1' ? true : false);
    });
  }, []);

  function getMachineCode() {
    // code to get machine code
    let machineId = localStorage.getItem('MachineId');
    if (!machineId) {
      var d = new Date().getTime();
      machineId = 'xxxxxxyxxyxxxyy'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 15) % 15 | 0;
        d = Math.floor(d / 15);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(15);
      });
      localStorage.setItem('MachineId', machineId);
    }
    return machineId;
  }

  getMachineCode();

  function getMyTourist(captchaData) {
    const inviterCode = localStorage.getItem('channelCode');
    const machineId = localStorage.getItem('MachineId');
    const ip = localStorage.getItem('externalIP');
    const deviceModel = getDeviceModel();
    const validate = isCaptchaEnabled ? captchaData : null;

    const loginToDevice = (ip) => {
      loginDevice({ inviterCode, machineId, ip, deviceModel, validate }).then((res) => {
        setIsCaptchaOpen(false);
        if (res.data.code === 200) {
          dispatch(setShowOtherModalComp(true));
          dispatch(setShowAnnouncementModal(true));
          dispatch(setShowBindWithdrawModal(true));
          dispatch(setUserData(res.data.data));
          dispatch(setShowLoginModal(false));
          localStorage.setItem('loginNow', JSON.stringify(res.data.data));
          dispatch(setUserBalance(res.data.data?.accountNow));
        } else {
          alert(res.data.msg);
        }
      });
    };

    if (ip) {
      loginToDevice(ip);
    } else {
      fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem('externalIP', data.ip);
          loginToDevice(data.ip);
        });
    }
  }

  const handleCaptchaSuccess = (data) => {
    getMyTourist(data);
  };

  const handleCaptchaFailure = (err) => {
    // console.error("NECaptcha verification failed:", err);
  };

  const [alertTourist, setAlertTourist] = useState(false);
  const [alertSwitch, setAlertSwitch] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  function alertButtonSwitch() {
    setAlertSwitch(true);

    //disabled for the mean time
    // if (urlDomains?.length > 0) {
    //   setAlertMsg("成功");
    // } else if (!urlDomains.length) {
    //   setAlertMsg("没有发现其他域名");
    // } else {
    //   setAlertMsg("切换线路失败");
    // }
    setAlertMsg('没有发现其他域名');

    setTimeout(() => {
      setAlertSwitch(false);
      setAlertTourist(false);
    }, 2500);
  }

  // function alertButtonTourist() {
  //   setAlertTourist(true);
  //   setAlertMsg('旅遊失敗');
  //   setTimeout(() => {
  //     setAlertTourist(false);
  //   }, 2500);
  // }

  // const lineSwitch = async () => {
  //   // switchLine();
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='overlay'
      //   style={{ position: "absolute", top: aTop, left: aLeft }}
    >
      <div className={'modalContainer'}>
        {/* <div className="modalContainer"> */}
        <AlertContainer
          top={2}
          left={2.1}
          alertMe={alertSwitch || alertTourist}
          notify={alertMsg}
          centered
        />
        <div className='modalRight'>
          <p className='closeBtn'>
            <img
              onClick={() => dispatch(setShowLoginModal(false))}
              style={{ width: '0.2rem' }}
              src={closeImg}
              alt='closeButton'
            />
          </p>
        </div>

        {isCaptchaOpen && isCaptchaEnabled && (
          <NECaptchaComponent
            onSuccess={handleCaptchaSuccess}
            onFailure={handleCaptchaFailure}
            captchaId={captchaId}
            isCaptchaOpen={isCaptchaOpen}
            setIsCaptchaOpen={setIsCaptchaOpen}
          />
        )}

        <div className='btnContainer'>
          {/* //This is fro the yellow */}
          <ul>
            <li>
              <img
                src={leftBtn}
                className=''
                onClick={() => setIsShowUserAuth(true)}
                alt='Left Button'
              />
            </li>
            <li>
              <img
                src={rightBtn}
                className=''
                onClick={() => {
                  if (isCaptchaEnabled) {
                    setIsCaptchaOpen(true);
                  } else {
                    getMyTourist();
                  }
                  // alertButtonTourist()
                }}
                alt='Right Button'
              />
            </li>
            <li>
              <img
                src={superRightBtn}
                className=''
                onClick={() => {
                  // lineSwitch();
                  alertButtonSwitch();
                }}
                alt='End Right Button'
              />
            </li>
          </ul>
        </div>
        {/* </div> */}
      </div>
    </motion.div>
  );
};

export default LoginModal;
