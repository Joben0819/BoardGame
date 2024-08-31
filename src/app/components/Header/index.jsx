import defaultIcon from '../../assets/blackGold/header/defaultIcon.png';
import Popup from '../../assets/blackGold/header/game-popup.gif';
import Popup_8803 from '../../assets/blackGold/header/game-popup_8803.png';
import calendar from '../../assets/blackGold/header/h5_icon.png';
import HeaderLogo from '../../assets/blackGold/header/header_logo.png';
import HeaderLogo8801 from '../../assets/blackGold/header/header_logo_8801.png';
import HeaderLogo8802 from '../../assets/blackGold/header/header_logo_8802.png';
import promote from '../../assets/blackGold/header/promote.png';
import task from '../../assets/blackGold/header/task.png';
import X from '../../assets/blackGold/main/search-clear.png';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BrowseInit, getAccountInfo } from 'src/api/game/gamelist';
import Loading from 'src/app/components/Loader/index';
import { setDomainName } from 'src/reducers/gameData';
import {
  setShowLoginModal,
  setShowOtherModalComp,
  setShowSettings,
  setSwitch,
} from 'src/reducers/gameSettings';
import { resetUserInfoState, updateBalance } from 'src/reducers/userInfo';
import { popSound } from 'src/utils/audio-player';
import {
  Folder_env,
  isLoggedIn,
  logoutUser,
  MODAL_BG_ANIMATION,
  MODAL_CONTENT_ANIMATION,
} from 'src/utils/helpers';
import useMobileDetect from 'use-mobile-detect-hook';
import register_btn from '../../assets/blackGold/header/btn3.png';
import login_btn from '../../assets/blackGold/header/btn3_2.png';
import button from '../../assets/blackGold/header/button2.png';
import CoinPurse from '../CoinPurse/index';
import DailyBonus from '../DailyBonus/DailyBonus';
import AlertContainer from '../Modal/AlertContainer/index';
import { useAuth } from '../Modal/LoginAuth/index';
import { default as GiftBoxModal, default as SettingsModal } from '../OtherModalComponent';
import pASoundFile from './../../data/audioData/promotion.mp3';
import vipSoundFile from './../../data/audioData/vip.mp3';
import styles from './index.module.scss';
const { APP_NAME } = require('src/server/' + process.env.REACT_APP_SITE);

function Header() {
  const auth = useAuth();
  const { userData } = useSelector((state) => state.userInfo);
  const { currTheme, showSettings } = useSelector((state) => state.gameSettings);
  const [openDailyBonus, setOpenDailyBonus] = useState(false);
  const [gTaskOpen, setGTaskOpen] = useState(false);
  // const [settingsOpen, setSettingsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const navigateVip = useNavigate();
  const [expBar, setExpBar] = useState();
  const [copyUserNick, setCopyUserNick] = useState(false);
  const [alertMe, setAlertMe] = useState(false);
  const [imgs, setimgs] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { domainName } = useSelector((state) => state.gameData);
  useEffect(() => {
    getAccountInfo().then((res) => {
      dispatch(updateBalance());
      setData(res.data.data);
    });
    BrowseInit().then((res) => {
      // setname(res.data.data.webUrl);
      dispatch(setDomainName(res.data.data.webUrl));
    });
  }, []);
  useEffect(() => {
    setExpBar((userData?.codeTotal / (userData?.codeTotal + data?.nextLevelIntegral)) * 100 || 0);
  }, [expBar, userData, data]);

  function gotoVip() {
    navigateVip('/PersonalInfo');
  }

  function gotoPromotion() {
    navigateVip('/PromotionAgent');
  }
  function gotoRecharge() {
    navigateVip('/Recharge');
  }

  function AlertDelay() {
    setAlertMe(true);
    setTimeout(function () {
      setAlertMe(false);
    }, 1500);
  }
  const detectMobile = useMobileDetect();
  const handleClick = ({ fn, params }) => {
    if (!isLoggedIn()) {
      dispatch(setShowLoginModal(true));
    } else {
      getAccountInfo().then((res) => {
        if (res.data.code === 401) {
          auth?.logout();
          logoutUser();
          dispatch(resetUserInfoState());
          dispatch(setShowLoginModal(true));
        } else {
          fn(params ? params : null);
        }
      });
    }
  };

  const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  const vipAudioFile = new Audio(vipSoundFile);
  const start = () => {
    if (isIOS) {
      vipAudioFile.play();
    }
  };
  const paAudioFile = new Audio(pASoundFile);
  const start2 = () => {
    if (isIOS) {
      paAudioFile.play();
    }
  };

  return (
    <>
      {/* Here are the calling for the modal, they hidden until a button is clicked */}
      {/* // <LoginModal open={open} onClose={()=> setOpen(!open)} openLogin={openLoginModal}/> */}
      {load && <Loading load={load} />}

      <GiftBoxModal
        notLogin={() => setOpen(true)}
        open={gTaskOpen}
        onClose={() => setGTaskOpen(false)}
        activesideTab={2}
        activeSection={'one'}
        isSettings={isSettings}
      />

      <DailyBonus openMe={openDailyBonus} closeOpenMe={() => setOpenDailyBonus(false)} />

      <AlertContainer
        alertMe={alertMe}
        top={3.25}
        whatText={userData?.id ? userData?.id : 'user'}
        centered
      />

      <SettingsModal
        open={showSettings}
        onClose={() => {
          dispatch(setShowSettings(false));
          setIsSettings(false);
        }}
        activesideTab={4}
        activeSection={'personalInfo'}
      />

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.15 }}
        className={`${styles.header} wd-100`}
      >
        <div className={styles.vippart}>
          <div className={styles.avatarContainer}>
            <img
              src={!isLoggedIn() ? defaultIcon : userData?.headImg}
              onClick={() => {
                handleClick({ fn: gotoVip });
                start();
              }}
              alt='defaultIcon'
              className={styles.avatarPhoto}
            />
          </div>
          <div className={styles.userDetailsContainer}>
            <div className={styles.userDetails}>
              <div className={styles.userInfo}>
                <span>{userData?.id ? userData?.id : '未登录'}</span>
                {isLoggedIn() && (
                  <span className={styles.vip}>VIP{userData?.vip ? userData?.vip : ''}</span>
                )}
              </div>
              {isLoggedIn() && (
                <CopyToClipboard
                  text={userData?.id ? userData?.id : '未登录'}
                  onCopy={() => {
                    // setCopyUserNick(true);
                    AlertDelay();
                    popSound();
                  }}
                >
                  <div className={styles.copyIcon}>
                    <img
                      src={require(`../../assets/${currTheme}/header/copyIcon.png`)}
                      alt='copy'
                    />
                  </div>
                </CopyToClipboard>
              )}
            </div>
            {isLoggedIn() && (
              <div className={styles.vipBar}>
                <div className={styles.vipBarBorder}>
                  <div
                    className={styles.vipBarExp}
                    style={{
                      width: expBar ? `${expBar}%` : '0%',
                    }}
                  />
                </div>
              </div>
            )}
            {!isLoggedIn() && (
              <>
                {!Folder_env('8803') && (
                  <div className={styles.btn_wrapper}>
                    <button style={{ width: '80%' }} className={styles.loginButton}>
                      <img
                        onClick={() => {
                          popSound();
                          dispatch(setShowLoginModal(true));
                        }}
                        style={{ width: '100%' }}
                        src={button}
                        alt='gold-button'
                      />
                    </button>
                  </div>
                )}
                {Folder_env('8803') && (
                  <div className={styles.btn_wrapper}>
                    <button className={styles.loginButton}>
                      <img
                        onClick={() => {
                          popSound();
                          dispatch(setShowLoginModal(true));
                          dispatch(setSwitch(false));
                        }}
                        src={register_btn}
                        alt='gold-button-register'
                      />
                    </button>
                    <button className={styles.loginButton}>
                      <img
                        onClick={() => {
                          popSound();
                          dispatch(setShowLoginModal(true));
                          dispatch(setSwitch(true));
                        }}
                        src={login_btn}
                        alt='gold-button- login'
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className=' header_details just-space-bet wd-76 hg-76'>
          <div className=' wd-34' style={{ display: 'flex' }}>
            <div
              className='coinpurseCompoContainer'
              style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                width: '100%',
                // "margin-left": "0.15rem",
              }}
            >
              <CoinPurse
                posi='relative'
                accountNow={userData?.accountNow ? userData?.accountNow : '0.00'}
                top={0}
                left={detectMobile.isMobile() && '0.15rem'}
              />
            </div>
          </div>

          <div className='d-flex al-items wd-31' style={{ justifyContent: 'center' }}>
            {/* <img
              src={LogoPng}
              style={{ width: '1rem' }}
            /> */}
            {Folder_env('8803') && <img src={HeaderLogo} alt='logo' style={{ width: '1rem' }} />}
            {Folder_env('8802') && (
              <img src={HeaderLogo8802} alt='logo' style={{ width: '1rem' }} />
            )}
            {Folder_env('8801') && (
              <img src={HeaderLogo8801} alt='logo' style={{ width: '1rem' }} />
            )}
            {/* <span className="name">
              {APP_NAME}
              {Folder_env("8803") && window.screen.width < 376 && <br/>}
              {domainName}
            </span> */}
          </div>

          <div className='d-flex  wd-35 just-space-cent' style={{ gap: '0.23rem' }}>
            <div
              className='d-flex al-items '
              onClick={() => {
                handleClick({ fn: setimgs, params: true });
                popSound();
              }}
            >
              <img src={calendar} alt='calendar' style={{ width: '0.3rem', height: '0.3rem' }} />
            </div>

            <img
              src={promote}
              alt='promote'
              onClick={() => {
                handleClick({ fn: gotoPromotion });
                start2();
              }}
              style={{ width: '0.4rem', height: '0.4rem' }}
            />
            <img
              onClick={() => {
                popSound();
                dispatch(setShowOtherModalComp(true));
                setIsSettings(false);
                handleClick({ fn: setGTaskOpen, params: true });
              }}
              src={task}
              alt='task'
              style={{ width: '0.4rem', height: '0.4rem' }}
            />
            <div
              className={styles.settingContainer}
              onClick={() => {
                popSound();
                if (!isLoggedIn()) {
                  dispatch(setShowLoginModal(true));
                } else {
                  setLoad(true);
                  getAccountInfo().then((res) => {
                    setLoad(false);
                    if (res.data.code === 401) {
                      auth?.logout();
                      logoutUser();
                      dispatch(resetUserInfoState());
                      dispatch(setShowLoginModal(true));
                    } else {
                      setIsSettings(true);
                      dispatch(setShowSettings(true));
                    }
                  });
                }
                // handleClick({ fn: setSettingsOpen, params: true });
              }}
            >
              <img src={require(`../../assets/${currTheme}/header/setting.png`)} alt='setting' />
              <span className={styles.settingText}>设置</span>
              {/* <img src={txt} alt="txt" style={{ width: "30%" }} /> */}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {imgs === true && (
            <motion.div
              variants={MODAL_BG_ANIMATION}
              initial='hidden'
              animate='visible'
              exit='exit'
              style={{ zIndex: '99999' }}
              className='post-abso wd-100 hg-100 d-flex just-space-cent al-items back-color-modal'
            >
              <motion.div
                variants={MODAL_CONTENT_ANIMATION}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='wd-100 post-rel'
                style={{
                  height: '80%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  className='X'
                  onClick={() => {
                    popSound();
                    setimgs(false);
                  }}
                >
                  <img src={X} alt='exit' className='wd-100' />
                </div>
                <img
                  src={Folder_env('8803') ? Popup_8803 : Popup}
                  alt='pop-up'
                  className='wd-100'
                  style={{ objectFit: 'contain', height: '100%', width: 'auto' }}
                />
                <button
                  className='direct'
                  onClick={() => {
                    popSound();
                    gotoRecharge();
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Header;
