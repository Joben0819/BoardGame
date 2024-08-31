import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Gamelist, escGame, requestUrls } from 'src/api/game/gamelist';
import { AuthProvider } from '../utils/context/LoginAuth';

//landscape routes
import LoadingScreen from './components/LoadingScreen';
import WebViewPage from './components/WebViewPage';
import CustomerService from './pages/CustomerService';
import Game from './pages/Game';
import GameStartPage from './pages/GameStartPage';
// import MyCalc from "./Pages/myCalc";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSideBarItem, setSideBar } from 'src/reducers/gameData';
import { setCurrTheme, setShowLoginModal, setShowPleaseRotate } from 'src/reducers/gameSettings';
import { pauseAudio, playAudio, resumeAudio, setVolume } from 'src/utils/audio-player';
import { Folder_env, isIOS, isLoggedIn, isMac, isWindows } from 'src/utils/helpers';
import useMobileDetect from 'use-mobile-detect-hook';
import PrivateRoute from './PrivateRoute';
import FAQ from './pages/FAQ';
import Homepage from './pages/Homepage';
import Mailbox from './pages/Mailbox';
import PromotionAgent from './pages/PromotionAgent';
import Recharge from './pages/Recharge';
import RechargeHistory from './pages/RechargeHistory';
import SafeBox from './pages/SafeBox';
import Share from './pages/ShareQR';
import VIPPages from './pages/Vip';
import WashCodePage from './pages/WashCodePage';
import Withdraw from './pages/Withdraw';

let isPlaying = false;

function App() {
  const [loading, setLoading] = useState({
    initialDatasLoading: true,
    urlDomainLoading: true,
  });
  const dispatch = useDispatch();
  const [showMainPage, setShowMainPage] = useState(false);
  const detectMobile = useMobileDetect();
  const isMobile = detectMobile.isMobile();
  // const [showPleaseRotate, setShowPleaseRotate] = useState(window.orientation === 0 ? true : false);
  const { currTheme, gameVolume, showPleaseRotate } = useSelector((state) => state.gameSettings);
  const { gameHG } = useSelector((state) => state.gameData);
  const [isPortrait, setIsPortrait] = useState(window.orientation === 0 ? true : false);
  const [versions, set_versions] = useState(false);
  let loadingTimer;
  let showMainDelayTimer;
  let appSizeTimer;
  let pleaseRotateTimer;

  const requestInitialDatas = () => {
    Gamelist()
      .then((res) => {
        //hide the lottery games
        // dispatch(setSideBar(res?.data?.data?.rspGameTypes));
        dispatch(setSideBar(res?.data?.data?.rspGameTypes.filter((t) => t.id !== 6)));
        dispatch(
          setActiveSideBarItem(
            res?.data?.data?.rspGameTypes[
              !Number(sessionStorage.getItem('id_sidebar'))
                ? 0
                : Number(sessionStorage.getItem('id_sidebar'))
            ]
          )
        );
        loadingTimer = setTimeout(() => {
          setLoading((prevState) => {
            return { ...prevState, initialDatasLoading: false };
          });
        }, 1000);
        showMainDelayTimer = setTimeout(() => {
          setShowMainPage(true);
        }, 1500);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    let requestInitialDataDelay = setInterval(() => {
      if (localStorage.getItem('domain') === 'hasDomain') {
        setLoading((prevState) => {
          return { ...prevState, urlDomainLoading: false };
        });
        requestInitialDatas();
        clearInterval(requestInitialDataDelay);
      } else {
        //perform fallback reload if didnt fetch on 5 urls
        requestUrls();
      }
    }, 2000);

    document.addEventListener('click', (event) => {
      !isPlaying && playAudio();
      var a = sessionStorage.getItem('Vol');
      !window.location.href.includes('Games') && setVolume(!a ? 1 : a / 100);
      // !window.location.href.includes("Games") && setVolume( !Number.isInteger(gameVolume) ? Number(gameVolume) / 100 : 1)
      isPlaying = true;
    });
    document.addEventListener('visibilitychange', (event) => {
      setAppSize();
      if (document.visibilityState === 'visible') {
        !isPlaying ? playAudio() : resumeAudio();
        isPlaying = true;
      } else {
        pauseAudio();
      }
    });
    if (!isLoggedIn()) {
      if (!Folder_env('8803')) {
        dispatch(setShowLoginModal(true));
      } else {
        dispatch(setShowLoginModal(false));
      }
    }

    dispatch(setShowPleaseRotate(window.orientation === 0 ? true : false));
    window.addEventListener('orientationchange', () => {
      if (window.orientation === 0) {
        setIsPortrait(true);
        // setShowPleaseRotate(true);
        dispatch(setShowPleaseRotate(true));
        pleaseRotateTimer = setTimeout(() => {
          // setShowPleaseRotate(false);
          dispatch(setShowPleaseRotate(false));
        }, 2500);
      } else {
        setIsPortrait(false);
        // setShowPleaseRotate(false);
        dispatch(setShowPleaseRotate(false));
      }
      appSizeTimer = setTimeout(() => {
        setAppSize();
      }, 500);
    });

    if (!currTheme) {
      dispatch(setCurrTheme('blackGold'));
    }

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(showMainDelayTimer);
      clearTimeout(requestInitialDataDelay);
      clearTimeout(appSizeTimer);
    };
  }, []);

  useEffect(() => {
    document.getElementById('root').setAttribute('data-theme', currTheme);
  }, [currTheme]);

  useEffect(() => {
    let appSizeTimer;
    if (!isWindows() && !isMac() && isIOS()) {
      document.addEventListener(
        'touchmove',
        function (event) {
          if (event.scale !== 1) {
            event.preventDefault();
          }
        },
        { passive: false }
      );
    }
    appSizeTimer = setTimeout(() => {
      setAppSize();
    }, 500);

    return () => {
      clearTimeout(appSizeTimer);
    };
  }, []);

  useEffect(() => {
    let orientation = window.orientation;

    if (orientation === 0) {
      setIsPortrait(true);
      // setShowPleaseRotate(true);
      dispatch(setShowPleaseRotate(true));
      pleaseRotateTimer = setTimeout(() => {
        // setShowPleaseRotate(false);
        dispatch(setShowPleaseRotate(false));
      }, 2500);
    } else {
      setIsPortrait(false);
      // setShowPleaseRotate(false);
      dispatch(setShowPleaseRotate(false));
    }

    return () => {
      clearTimeout(pleaseRotateTimer);
    };
  }, [window.orientation]);

  useEffect(() => {
    setAppSize();
    if (isPortrait === true) {
      sessionStorage.setItem('dd', true);
    } else {
      sessionStorage.setItem('dd', false);
    }
  }, [isPortrait]);

  const handleResize = useCallback(() => {
    setAppSize();
  }, []);

  const setAppSize = () => {
    if (!window.location.href.includes('Games') && !window.location.href.includes('webView')) {
      if (isMobile) {
        document.getElementById('root').style.height =
          (window.orientation === 0 ? window.innerWidth : window.innerHeight) + 'px';
        document.getElementById('root').style.width =
          (window.orientation === 0 ? window.innerHeight : window.innerWidth) + 'px';
        document.getElementById('root').style.transform =
          window.orientation === 0 ? 'rotate(90deg)' : 'rotate(0deg)';
      }
    }
  };

  useEffect(() => {
    let debounceId;

    function handleDebouncedResize() {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(() => {
        handleResize();
      }, 500);
    }

    window.addEventListener('resize', handleDebouncedResize);
    window.addEventListener('pageshow', handleDebouncedResize);

    return () => {
      window.removeEventListener('resize', handleDebouncedResize);
      window.removeEventListener('pageshow', handleDebouncedResize);
    };
  }, [handleResize]);

  sessionStorage.setItem('Vol', gameVolume);
  // console.warn(Number.isInteger(gameVolume))
  function Version() {
    if (navigator?.userAgent.match(/iPad|iPhone|iPod/i)) {
      return true;
    } else {
      // return 78
      if (
        navigator?.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/)[1] > 80
      ) {
        return true;
      } else if (versions === true) {
        return true;
      } else {
        return false;
      }
    }
  }
  useEffect(() => {
    if (gameHG) {
      escGame(sessionStorage.getItem('id')).then((res) => {});
    }
  }, []);

  useEffect(() => {
    if (showMainPage && !isPlaying) {
      playAudio();
      var a = sessionStorage.getItem('Vol');
      setVolume(!a ? 1 : a / 100);
      isPlaying = true;
    }
  }, [showMainPage]);

  var a = window.navigator?.userAgentData?.brands[2]?.brand;
  return (
    <>
      {/* {showPleaseRotate && (
        <div className={styles.pleaseRotate}>
          <div className={styles.phone}></div>
          <div className={styles.message}>
            <div>PLEASE ROTATE YOUR DEVICE LANDSCAPE</div>
            <div>FOR BETTER USER EXPERIENCE</div>
          </div>
        </div>
      )} */}
      {Version() === true ? (
        <></>
      ) : (
        <div
          className='version'
          onClick={() => {
            set_versions(true);
          }}
        >
          <span>Please Update {!a ? 'your Device' : a}</span>
        </div>
      )}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path=''
              element={!showMainPage ? <LoadingScreen loading={loading} /> : <Homepage />}
            />
            <Route path='/Customer' element={<CustomerService />} />

            <Route element={<PrivateRoute />}>
              <Route path='/PersonalInfo' element={<VIPPages />} />
              <Route path='/Recharge' element={<Recharge />} />
              <Route path='/Withdraw' element={<Withdraw />} />
              <Route path='/RechargeHistory' element={<RechargeHistory />} />
              <Route path='/Safebox' element={<SafeBox />} />
              <Route path='/Game/:lotteryId' element={<GameStartPage />} />
              <Route path='/Games' element={<Game />} />
              <Route path='/FAQ' element={<FAQ />} />
              <Route path='/PromotionAgent' element={<PromotionAgent />} />
              {/* <Route path="/InternalClearPage" element={<InternalClearPage />} /> */}
              {/* <Route path="/Customer" element={<CustomerService />} /> */}
              <Route path='/Share' element={<Share />} />
              <Route path='/Games' element={<Game />} />
              <Route path='/FAQ' element={<FAQ />} />
              <Route path='/webView' element={<WebViewPage />} />
              <Route path='/Mailbox' element={<Mailbox />} />
              <Route path='/CodeWashing' element={<WashCodePage />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
