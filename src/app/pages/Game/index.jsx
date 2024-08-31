import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { JoinGame } from 'src/api/game/gamelist';
import { updateBalance } from 'src/reducers/userInfo';
import { setVolume } from 'src/utils/audio-player';
import { isIOS, isLoggedIn, isMac, isWindows } from 'src/utils/helpers';
import useMobileDetect from 'use-mobile-detect-hook';
import { useAuth } from '../../components/Modal/LoginAuth';
import OtherHeader from '../../components/OtherHeader';

function Game() {
  const [data, setdata] = useState();
  const [isDraggableTouched, setIsDraggableTouched] = useState(false);
  const auth = useAuth();
  const dispatch = useDispatch();
  const takeMe = useNavigate();
  const location = useLocation();
  const detectMobile = useMobileDetect();
  const isDesktop = detectMobile.isDesktop();
  const isMobile = detectMobile.isMobile();
  const { showQuitDialog } = useSelector((state) => state.gameSettings);
  const inThirdPartyGamePage = location.pathname.includes('Games');

  if (!isLoggedIn()) {
    takeMe('/');
  }
  setVolume(0);

  let lowZIndexTimer;

  const draggableTouched = () => {
    setIsDraggableTouched(true);
  };

  const draggableUntouched = () => {
    lowZIndexTimer = setTimeout(() => {
      setIsDraggableTouched(false);
      clearTimeout(lowZIndexTimer);
    }, 2000);
  };
  useEffect(() => {
    thirdGameAppSize();
    window.addEventListener('orientationchange', () => {
      thirdGameAppSize();
    });

    return () => {
      if (isMobile) {
        setAppSize();
        document.getElementById('root').style.transform =
          window.orientation === 0 ? 'rotate(90deg)' : 'rotate(0deg)';
        window.removeEventListener('orientationchange', thirdGameAppSize);
        clearTimeout(lowZIndexTimer);
      }
    };
  }, []);

  const thirdGameAppSize = () => {
    document.getElementById('root').style.height = 100 + '%';
    document.getElementById('root').style.width = 100 + '%';
    document.getElementById('root').style.transform = 'rotate(0deg)';
  };

  const setAppSize = () => {
    document.getElementById('root').style.height =
      (window.orientation === 0 ? window.innerWidth : window.innerHeight) + 'px';
    document.getElementById('root').style.width =
      (window.orientation === 0 ? window.innerHeight : window.innerWidth) + 'px';
  };

  useEffect(() => {
    JoinGame()
      .then((res) => {
        sessionStorage.setItem('url', res.data.data);
        setdata(res.data.data);
        dispatch(updateBalance());
      })
      .catch((e) => {});
  }, []);
  return (
    <div
      className='thirdPartGameIframeContainer'
      style={{
        color: 'white',
        // width: "100%",
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* <div style={{"background-color" : "red"}} className> */}
      <OtherHeader
        accountNow={auth?.user?.accountNow}
        draggableTouched={draggableTouched}
        draggableUntouched={draggableUntouched}
      />
      {/* </div> */}
      <iframe
        className='thirdPartGameIframe'
        title='Game'
        src={data}
        style={{
          // width: "100%",
          // height: "calc(100% - 0rem)",
          position: 'absolute',
          zIndex: inThirdPartyGamePage
            ? isDraggableTouched
              ? '-10'
              : '1'
            : showQuitDialog && !isMac() && !isWindows() && isIOS()
            ? '-1'
            : '1',
        }}
      />
    </div>
  );
}

export default Game;
