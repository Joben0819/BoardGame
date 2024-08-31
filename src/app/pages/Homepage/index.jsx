import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { deviceDetect } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { browseVisit } from 'src/api/game/gamelist';
import { setShowAnnouncementModal } from 'src/reducers/gameSettings';
import { useAuth } from 'src/utils/context/LoginAuth';
import { Folder_env, isLoggedIn } from 'src/utils/helpers';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import Main from '../../components/Main';
import BindWithdrawModal from '../../components/Modal/BindWithdrawModal';
import FeedBackModal from '../../components/Modal/FeedBackModal';
import LoginModal from '../../components/Modal/LoginTypesModal';
import UserAuthModal from '../../components/Modal/UserAuthModal';
import VersionModal from '../../components/Modal/VersionModal';

function Homepage() {
  const dispatch = useDispatch();
  const [isShowUserAuth, setIsShowUserAuth] = useState(false);
  const { showLoginModal, showFeedbackModal, currTheme, showBindWithdrawModal, showVersionModal } =
    useSelector((state) => state.gameSettings);
  const auth = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { isMobile, os, osVersion, model, osName } = deviceDetect();

  useEffect(() => {
    const isVisited = localStorage.getItem('isVisited');
    const invitationCode = localStorage.getItem('channelCode');
    const ip = localStorage.getItem('externalIP');

    if (!isVisited && invitationCode) {
      const browserDetails = {
        device: osName === 'Windows' ? 'android' : 'ios',
        deviceType: osName === 'Windows' ? 'android' : 'iPhone',
        invitationCode: invitationCode,
        ip: ip,
        osVersion: osVersion,
      };

      const mobileDetails = {
        device: os,
        deviceType: model,
        invitationCode: invitationCode,
        ip: ip,
        osVersion: osVersion,
      };

      browseVisit(isMobile ? mobileDetails : browserDetails).then((res) => {
        console.log('@@@res');
      });
      localStorage.setItem('isVisited', true);
    }

    if (!isLoggedIn()) {
      const channelCode = searchParams.get('channelCode');
      if (channelCode) {
        localStorage.setItem('channelCode', channelCode);
      }
      Folder_env('8803')
        ? dispatch(setShowAnnouncementModal(true))
        : dispatch(setShowAnnouncementModal(false));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('loginNow')) {
      auth?.login(JSON.parse(localStorage.getItem('loginNow')));
    }
    localStorage.setItem('credPaymentSuccess', false);
  }, []);
  sessionStorage.setItem('set2', 'false');
  return (
    <>
      {isLoggedIn() ? (
        <AnimatePresence>
          {showFeedbackModal && <FeedBackModal />}
          {showBindWithdrawModal && <BindWithdrawModal />}
          {showVersionModal && <VersionModal />}
        </AnimatePresence>
      ) : (
        <>
          {Folder_env('8803') ? (
            <UserAuthModal open={showLoginModal} />
          ) : (
            <>
              <UserAuthModal
                open={isShowUserAuth}
                setIsShowUserAuth={setIsShowUserAuth}
                server={process.env.REACT_APP_SITE}
              />
              {showLoginModal && <LoginModal setIsShowUserAuth={setIsShowUserAuth} />}
            </>
          )}
        </>
      )}

      <div className={'main-color'} data-theme={currTheme}>
        <Header />
        <Main />
        <Footer />
        {/* <Footerv2></Footerv2> */}
      </div>
    </>
  );
}

export default Homepage;
