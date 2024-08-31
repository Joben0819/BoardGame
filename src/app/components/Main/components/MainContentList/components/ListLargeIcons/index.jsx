import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SectionGames, getAccountInfo, getGameInfoGroup } from 'src/api/game/gamelist';
import fallbackIcon from 'src/app/assets/commons/ImgWithFallback/onErrorImg.png';
import loadingIcon from 'src/app/assets/commons/ImgWithFallback/rectangle-load2.gif';
import Loading from 'src/app/components/Loader/index';
import NoData from 'src/app/components/NoData';
import IMG from 'src/commons/ImgWithFallback';
import { setPlatForm, setPlatFormData, setshowPlatFormData } from 'src/reducers/gameData';
import { setShowLoginModal } from 'src/reducers/gameSettings';
import { useAuth } from 'src/utils/context/LoginAuth';
import { isLoggedIn, logoutUser } from 'src/utils/helpers';
import ListSmallIcons from '../ListSmallIcons';
import styles from './index.module.scss';

// import million from 'million/compiler';
const ListLargeIcons = ({ activeSideBarItem, searchFieldData, setSearchFieldData }) => {
  const { platForm, showPlatFormData } = useSelector((state) => state.gameData);
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [platformData, setPlatformData] = useState();
  const startGame = useNavigate();
  const [platform, setPlatform] = useState(platForm);

  const [showPlatformData, setShowPlatformData] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();
  const [iconWidth, setIconWidth] = useState();
  const { currTheme, showSettings, showPleaseRotate, showLoginModal, showOtherModalComp } =
    useSelector((state) => state.gameSettings);
  // const isPortrait = window.orientation === 0;
  const isVivoBrowser = /VivoBrowser/i.test(navigator.userAgent);
  let initialTouchX = null;
  let initialTouchY = null;
  let isScrolling = false;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleTouchStart = (event) => {
      initialTouchX = event.touches[0].clientX;
      initialTouchY = event.touches[0].clientY;
      isScrolling = false;
    };

    const handleTouchMove = (event) => {
      if (!initialTouchX || !initialTouchY) return;

      const currentTouchX = event.touches[0].clientX;
      const currentTouchY = event.touches[0].clientY;

      const diffX = initialTouchX - currentTouchX;
      const diffY = initialTouchY - currentTouchY;

      // Check if the swipe is predominantly vertical
      if (Math.abs(diffY) > Math.abs(diffX)) {
        event.preventDefault(); // Prevent vertical scrolling

        // Swipe up
        if (diffY > 0) {
          if (!isScrolling) {
            // Move the div to the left (scroll horizontally to the right)
            smoothScroll(container, 'left', 100);
            isScrolling = true;
          }
        }
        // Swipe down
        else {
          if (!isScrolling) {
            // Move the div to the right (scroll horizontally to the left)
            smoothScroll(container, 'right', 100);
            isScrolling = true;
          }
        }
      }

      initialTouchX = currentTouchX;
      initialTouchY = currentTouchY;
    };

    const smoothScroll = (element, direction, distance) => {
      let scrollAmount = 0;
      const scrollStep = 10;
      const speed = 5; // Adjust scrolling speed if needed

      const slideTimer = setInterval(() => {
        if (direction === 'left') {
          element.scrollLeft += scrollStep;
        } else {
          element.scrollLeft -= scrollStep;
        }

        scrollAmount += scrollStep;

        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
          isScrolling = false;
        }
      }, speed);
    };

    isVivoBrowser && container.addEventListener('touchstart', handleTouchStart);
    isVivoBrowser && container.addEventListener('touchmove', handleTouchMove);

    return () => {
      isVivoBrowser && container.removeEventListener('touchstart', handleTouchStart);
      isVivoBrowser && container.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleGameClick = (gameId) => {
    if (!isLoggedIn()) {
      dispatch(setShowLoginModal(true));
    } else {
      getAccountInfo().then((res) => {
        if (res.data.code === 401) {
          auth?.logout();
          logoutUser();
          dispatch(setShowLoginModal(true));
        } else {
          sessionStorage.setItem('id', gameId);
          startGame('/Games');
        }
      });
    }
  };

  const handleIconWidthChange = (value) => {
    setIconWidth(value);
  };

  useEffect(() => {
    if (!searchFieldData) {
      setFilteredData(data);
    }
    if (searchFieldData && data) {
      setFilteredData(
        data.filter((item) => {
          return item?.name.toLowerCase().includes(searchFieldData.toLowerCase());
        })
      );
    }
  }, [searchFieldData, data]);

  useEffect(() => {
    let item;
    const scrollFn = (e) => {
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    };
    if (!showPlatformData) {
      item = document.getElementById('listLargeWrapper');
      item.addEventListener('wheel', scrollFn, { passive: true });
    }
    return () => {
      setSearchFieldData('');
      item && item.removeEventListener('wheel', scrollFn);
    };
  }, [showPlatformData]);

  useEffect(() => {
    if (activeSideBarItem.type === 2) {
      SectionGames(activeSideBarItem.id).then((res) => {
        try {
          setData(res.data.data);
          sessionStorage.removeItem('id_2');
          sessionStorage.removeItem('data2');
          dispatch(setshowPlatFormData(false));
        } catch (error) {
          alert(error);
        }
      });
    } else if (activeSideBarItem.type === 3) {
      getGameInfoGroup(activeSideBarItem.id).then((res) => {
        try {
          setData(res.data.data);
        } catch (error) {
          alert(error);
        }
      });
    }
  }, [activeSideBarItem]);

  useEffect(() => {
    sessionStorage.setItem('platform', platForm);
    if (activeSideBarItem.type === 3) {
      SectionGames(activeSideBarItem.id, platform?.id).then((res) => {
        try {
          setPlatformData(res.data.data);
          dispatch(setPlatFormData(res.data.data));
        } catch (error) {
          alert(error);
        }
      });
    }
  }, [platform?.id]);

  const PlatFormListHeader = () => {
    return (
      <div className={styles.listHeader} data-theme={currTheme}>
        <div className={styles.leftContent}>
          <img src={platform?.icon} alt='Icon' />
          <span>{platform?.name}</span> <span>总共{platformData?.length}款小游戏</span>
        </div>
        <div className={styles.rightContent}>
          <img
            src={require(`../../../../../../assets/${currTheme}/main/cardgameback.png`)}
            onClick={() => {
              sessionStorage.removeItem('id_2');
              sessionStorage.removeItem('data2');
              dispatch(setshowPlatFormData(false));
            }}
            alt='Card Game Back'
          />
        </div>
      </div>
    );
  };
  useEffect(() => {
    if (showPlatFormData === true) {
      setShowPlatformData(true);
    } else {
      setShowPlatformData(false);
    }
  }, [filteredData, showPlatFormData]);

  const load = filteredData === undefined;

  return (
    <>
      {!showPlatformData && filteredData?.length === 0 && (
        <div className={styles.noGamesContainer}>
          <NoData />
          {/* <div className={styles.noGames}>
            {" "}
            <img src={require("src/Assets/img/warning.png")} />{" "}
            <span>找不到游戏</span>{" "}
          </div> */}
        </div>
      )}
      {!showPlatformData && filteredData?.length !== 0 && (
        <div
          id='listLargeWrapper'
          ref={containerRef}
          className={classnames(styles.listLargeWrapper, {
            [styles.listLargeType2Overlay]: activeSideBarItem.type === 2,
          })}
          style={{
            overflow:
              showSettings || showPleaseRotate || showLoginModal || showOtherModalComp
                ? 'hidden'
                : 'auto',

            zIndex: 0,
          }}
        >
          <div
            style={{
              // width: `${filteredData?.length * 1.65}rem`,
              width: '100%',
              // width: `${filteredData?.length * (isPortrait ? 3.5 : 1.65)}rem`,
              margin: '0 0.15rem',
            }}
          >
            <div className={styles.firstRow}>
              {load && <Loading load={load} />}
              {filteredData?.map((item, idx) => {
                return (
                  <motion.div
                    key={idx}
                    animate={{ x: 0 }}
                    initial={{ x: 400 }}
                    className={classnames(styles.iconHolder, {
                      [styles.isMaintenance]: item.maintain,
                    })}
                    onClick={() => {
                      activeSideBarItem.type === 2 && handleGameClick(item?.id);

                      if (activeSideBarItem.type === 2) {
                        handleGameClick(item?.id);
                      } else {
                        dispatch(setPlatForm(item));
                        dispatch(setshowPlatFormData(true));
                        sessionStorage.setItem('data2', true);
                        setPlatform(item);
                        setSearchFieldData('');
                      }
                    }}
                    style={{ width: iconWidth }}
                  >
                    {item.maintain && (
                      <div className='isMaintainLargeIcon'>
                        <div>正在维修</div>
                      </div>
                    )}
                    <IMG
                      // largeWidth={detectMobile.isMobile() ? ".89rem" : ""}
                      keyIcon={activeSideBarItem.type === 3 ? item.cardIcon : item.icon}
                      fallback={fallbackIcon}
                      loadingIcon={loadingIcon}
                      loading='lazy'
                      src={activeSideBarItem.type === 3 ? item.cardIcon : item.icon}
                      handleIconWidthChange={handleIconWidthChange}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* <Swiper
            freeMode={true}
            grabCursor={true}
            className={styles.mySwiper}
            slidesPerView={4}
            // spaceBetween={activeSideBarItem.type === 2 ? 10 : 20}
            cleanstyles="true"
            keyboard={{ enabled: true, onlyInViewport: true }}
            mousewheel={true}
          >
            {filteredData?.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: 400 }}
                    className={styles.iconHolder}
                    onClick={() => {
                      setShowPlatformData(true);
                      setPlatform(item);
                      setSearchFieldData("");
                      activeSideBarItem.type === 2 && handleGameClick(item?.id);
                    }}
                  >
                    <IMG
                      key={activeSideBarItem.type === 3 ? item.cardIcon : item.icon}
                      fallback={fallbackIcon}
                      loadingIcon={loadingIcon}
                      loading="lazy"
                      src={
                        activeSideBarItem.type === 3 ? item.cardIcon : item.icon
                      }
                    />
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper> */}
        </div>
      )}
      {showPlatformData && (
        <>
          {PlatFormListHeader()}
          {data ? (
            <>
              {data.map((item, idx) => {
                return (
                  item.id === platform?.id && (
                    <ListSmallIcons
                      uniqueKey={item.id + idx}
                      activeSideBarItem={activeSideBarItem}
                      activePlatformId={platform?.id}
                      // platformData={PlatFormData}
                      // activePlatformId={platform?.id}
                      platformData={platformData}
                      searchFieldData={searchFieldData}
                      setSearchFieldData={setSearchFieldData}
                    />
                  )
                );
              })}
            </>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default ListLargeIcons;
