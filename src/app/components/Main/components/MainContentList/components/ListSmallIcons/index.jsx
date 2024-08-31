import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { JoinGame, SectionGames, getAccountInfo } from 'src/api/game/gamelist';
import fallbackIcon from 'src/app/assets/commons/ImgWithFallback/onErrorImg.png';
import loadingIcon from 'src/app/assets/commons/ImgWithFallback/square-load2.gif';
import Loading from 'src/app/components/Loader/index';
import NoData from 'src/app/components/NoData';
import IMG from 'src/commons/ImgWithFallback';
import { setgameHG } from 'src/reducers/gameData';
import { setShowLoginModal } from 'src/reducers/gameSettings';
import { updateBalance } from 'src/reducers/userInfo';
import { useAuth } from 'src/utils/context/LoginAuth';
import { isLoggedIn, logoutUser } from 'src/utils/helpers';
import useMobileDetect from 'use-mobile-detect-hook';
import styles from './index.module.scss';

const ListSmallIcons = ({
  activeSideBarItem,
  activePlatformId,
  platformData,
  searchFieldData,
  setSearchFieldData,
  uniqueKey,
}) => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [filteredDataEven, setFilteredDataEven] = useState();
  const [filteredDataOdd, setFilteredDataOdd] = useState();
  const { showSettings, showPleaseRotate, showLoginModal, showOtherModalComp } = useSelector(
    (state) => state.gameSettings
  );
  const startGame = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const isPortrait = window.orientation === 0;
  const detectMobile = useMobileDetect();
  const [iconWidth, setIconWidth] = useState();

  const isVivoBrowser = /VivoBrowser/i.test(navigator.userAgent);
  let initialTouchX = null;
  let initialTouchY = null;
  let isScrolling = false;
  const containerRef = useRef(null);

  const handleGameClick = (game) => {
    sessionStorage.setItem('id', game.id);
    sessionStorage.setItem('id_2', game.id);
    var data_Category = game.gameCategory === 'HG' ? true : false;
    dispatch(setgameHG(data_Category));
    setTimeout(() => {
      if (!isLoggedIn()) {
        dispatch(setShowLoginModal(true));
      } else {
        getAccountInfo().then((res) => {
          if (res.data.code === 401) {
            auth?.logout();
            logoutUser();
            dispatch(setShowLoginModal(true));
          } else {
            if (activeSideBarItem.id === 6) {
              startGame(`/Game/${game.lotteryId}`);
            } else {
              if (data_Category) {
                JoinGame(sessionStorage.getItem('id'))
                  .then((res) => {
                    dispatch(updateBalance());
                    const url = res?.data?.data;
                    window.open(url, '_blank');
                  })
                  .catch((e) => {});
              } else {
                startGame('/Games');
              }
            }
          }
        });
      }
    }, 500);
  };
  // console.log(gameHG, "gameHg");
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
    var item = document.getElementById('listSmallWrapper');
    const handleMouseWheel = (e) => {
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    };
    item.addEventListener('wheel', handleMouseWheel, { passive: true });
    return () => {
      setSearchFieldData && setSearchFieldData('');
      item.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  useEffect(() => {
    if (activeSideBarItem?.type === 4) {
      SectionGames(activeSideBarItem?.id, activePlatformId).then((res) => {
        try {
          setData(res.data.data);
        } catch (error) {
          alert(error);
        }
      });
    } else if (activeSideBarItem?.type === 3) {
      setData(platformData);
    } else {
      SectionGames(activeSideBarItem?.id).then((res) => {
        try {
          setData(res.data.data);
        } catch (error) {
          alert(error);
        }
      });
    }
  }, [activeSideBarItem, activePlatformId, platformData]);

  useEffect(() => {
    setFilteredDataOdd(
      filteredData?.filter((data, index) => {
        return index % 2 !== 0;
      })
    );
    setFilteredDataEven(
      filteredData?.filter((data, index) => {
        return index % 2 === 0;
      })
    );
  }, [filteredData]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window height to state
      setWindowHeight(window.innerHeight);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window height
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

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

  useEffect(() => {
    if (sessionStorage.getItem('id_2')) {
      setTimeout(() => {
        document.getElementById(sessionStorage.getItem('id_2'))?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'center',
        });
      }, 1500);
    }
  }, []);
  const load = filteredData === undefined;

  return (
    <div
      key={uniqueKey}
      id='listSmallWrapper'
      ref={containerRef}
      className={classnames(styles.listSmallWrapper, {
        [styles.type3Overlay]: activeSideBarItem?.type === 3,
        [styles.noDataOverlay]: filteredData?.length === 0,
      })}
      style={{
        overflow:
          showSettings || showPleaseRotate || showLoginModal || showOtherModalComp
            ? 'hidden'
            : 'auto',

        zIndex: 0,
      }}
    >
      {filteredData?.length === 0 ? (
        <NoData />
      ) : (
        <>
          {load && <Loading load={load} />}
          <div
            className={styles.rowsContainer}
            // style={{
            //   width:
            //     windowHeight <= 230
            //       ? `${filteredDataEven?.length * 0.65}rem`
            //       : windowHeight <= 320
            //       ? `${filteredDataEven?.length * 0.85}rem`
            //       : `${filteredDataEven?.length * 1.15}rem`,
            //   // width: `${filteredDataEven?.length * (isPortrait ? 2.5 : 1.15)}rem`
            // }}
          >
            <div className={styles.firstRow}>
              {filteredDataEven?.map((item, idx) => {
                return (
                  <motion.div
                    key={item.icon + idx}
                    animate={{ x: 0 }}
                    initial={{ x: '100vw' }}
                    transition={{ delay: 1 }}
                    className={classnames(styles.iconHolder, {
                      [styles.isMaintenance]: item.maintain,
                    })}
                    onClick={() => {
                      handleGameClick(item);
                    }}
                    style={{ width: iconWidth }}
                    id={item.id}
                  >
                    {item.maintain && (
                      <div className='isMaintain'>
                        <div>正在维修</div>
                      </div>
                    )}
                    <IMG
                      keyIcon={item.icon}
                      fallback={fallbackIcon}
                      loadingIcon={loadingIcon}
                      loading='lazy'
                      src={item.icon}
                      handleIconWidthChange={handleIconWidthChange}
                    />
                  </motion.div>
                );
              })}
            </div>
            <div className={styles.secondRow}>
              {filteredDataOdd?.map((item, idx) => {
                return (
                  <motion.div
                    key={item.icon + idx}
                    animate={{ x: 0 }}
                    initial={{ x: '100vw' }}
                    transition={{ delay: 1 }}
                    className={classnames(styles.iconHolder, {
                      [styles.isMaintenance]: item.maintain,
                    })}
                    onClick={() => {
                      handleGameClick(item);
                    }}
                    style={{ width: iconWidth }}
                    id={item.id}
                  >
                    {item.maintain && (
                      <div className='isMaintain'>
                        <div>正在维修</div>
                      </div>
                    )}
                    <IMG
                      keyIcon={item.icon}
                      fallback={fallbackIcon}
                      loadingIcon={loadingIcon}
                      loading='lazy'
                      src={item.icon}
                      handleIconWidthChange={handleIconWidthChange}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
        // <Swiper
        //   slidesPerView={'auto'}
        //   spaceBetween={30}
        //   freeMode={true}
        //   touchReleaseOnEdges={true}
        //   resistance={true}
        //   resistanceRatio={0.5}
        //   // pagination={{
        //   //   clickable: true,
        //   // }}
        //   modules={[FreeMode]}
        //   className="smallIconSwiper"
        // >
        //   {filteredDataEven?.map((item, idx) => {
        //     return (
        //       <SwiperSlide>
        //         <div className={styles.slidesWrapper}>
        //           <motion.div
        //             animate={{ x: 0 }}
        //             initial={{ x: 400 }}
        //             className={styles.iconHolder}
        //             onClick={() => handleGameClick(item)}
        //           >
        //             {item.maintain && (
        //               <div className="isMaintain">
        //                 <div>正在维修</div>
        //               </div>
        //             )}
        //             <IMG
        //               key={item.icon}
        //               fallback={fallbackIcon}
        //               loadingIcon={loadingIcon}
        //               loading="lazy"
        //               src={item.icon}
        //             />
        //           </motion.div>
        //           <motion.div
        //             animate={{ x: 0 }}
        //             initial={{ x: 400 }}
        //             className={styles.iconHolder}
        //             onClick={() => handleGameClick(filteredDataOdd[idx])}
        //           >
        //             {filteredDataOdd[idx]?.maintain && (
        //               <div className="isMaintain">
        //                 <div>正在维修</div>
        //               </div>
        //             )}
        //             <IMG
        //               key={filteredDataOdd[idx]?.icon}
        //               fallback={fallbackIcon}
        //               loadingIcon={loadingIcon}
        //               loading="lazy"
        //               src={filteredDataOdd[idx]?.icon}
        //             />
        //           </motion.div>
        //         </div>
        //       </SwiperSlide>
        //     );
        //   })}
        // </Swiper>

        // <div className={styles.noGames}>
        //   {" "}
        //   <img src={require("src/Assets/img/warning.png")} />{" "}
        //   <span>找不到游戏</span>{" "}
        // </div>
      )}
    </div>
  );
};

export default ListSmallIcons;
