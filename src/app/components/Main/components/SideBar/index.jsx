import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { Gamelist } from 'src/api/game/gamelist';
import blackGoldTitle from 'src/app/assets/blackGold/main/sidebar_title.png';
import { setActiveSideBarItem, setSideBar } from 'src/reducers/gameData';
import { popSound } from 'src/utils/audio-player';
import styles from './index.module.scss';

const SideBar = () => {
  const { sideBar, activeSideBarItem } = useSelector((state) => state.gameData);
  const { currTheme, showSettings, showPleaseRotate, showLoginModal, showOtherModalComp } =
    useSelector((state) => state.gameSettings);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVivoBrowser = /VivoBrowser/i.test(navigator.userAgent);
  let initialTouchX = null;
  let initialTouchY = null;
  let isScrolling = false;
  const containerRef = useRef(null);
  const washCodePage = location?.state?.from === 'washCodePage';

  useEffect(() => {
    washCodePage && navigate(location.pathname, { replace: true });
  }, []);

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

      // Check if the swipe is predominantly horizontal
      if (Math.abs(diffX) > Math.abs(diffY)) {
        event.preventDefault(); // Prevent horizontal scrolling

        // Swipe left
        if (diffX > 0) {
          if (!isScrolling) {
            // Move the div up (scroll vertically upwards)
            smoothScroll(container, 'up', 100);
            isScrolling = true;
          }
        }
        // Swipe right
        else {
          if (!isScrolling) {
            // Move the div down (scroll vertically downwards)
            smoothScroll(container, 'down', 100);
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
        if (direction === 'up') {
          element.scrollTop -= scrollStep;
        } else {
          element.scrollTop += scrollStep;
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

  const handleRefresh = async () => {
    Gamelist().then((res) => {
      try {
        //hide the lottery games
        // dispatch(setSideBar(res?.data?.data?.rspGameTypes));
        dispatch(setSideBar(res?.data?.data?.rspGameTypes.filter((t) => t.id !== 6)));
        let currActiveSideBarItem = res?.data?.data?.rspGameTypes.find(
          (item) => activeSideBarItem.id === item.id
        );
        dispatch(setActiveSideBarItem(currActiveSideBarItem));
      } catch (error) {
        alert(res.msg);
      }
    });
  };

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.sidebarWrapper}
    >
      <div className={styles.title}>
        <img src={blackGoldTitle} alt='' />
      </div>
      <div className={styles.list}>
        <PullToRefresh onRefresh={handleRefresh} className={styles.pullToRefresh}>
          <div
            ref={containerRef}
            className={styles.sidebarSwiper}
            style={{
              overflow:
                showSettings || showPleaseRotate || showLoginModal || showOtherModalComp
                  ? 'hidden'
                  : 'auto',
            }}
          >
            {sideBar &&
              sideBar.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={styles.sideBarItemContainer}
                    onClick={() => {
                      popSound();
                      sessionStorage.setItem('id_sidebar', idx);
                      dispatch(setActiveSideBarItem(item));
                    }}
                  >
                    <img
                      className={styles.divider}
                      src={require(`../../../../assets/${currTheme}/main/divider.png`)}
                      alt='divider'
                    />
                    <div
                      className={classnames(styles.sideBarItem, {
                        [styles.sidebarItemActive]: item.id === activeSideBarItem.id,
                      })}
                    >
                      <img className={styles.icon} src={item.icon} alt='icon' />
                      <span>{item.name}</span>
                    </div>
                    {idx === sideBar.length - 1 && (
                      <img
                        className={styles.divider}
                        src={require(`../../../../assets/${currTheme}/main/divider.png`)}
                        alt='divider'
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </PullToRefresh>
        {/* <Swiper
          direction={"vertical"}
          slidesPerView={4}
          className={styles.sidebarSwiper}
          mousewheel={true}
          keyboard={true}
          cleanstyles="true"
          spaceBetween={0}
          freeMode={true}
          // style={{fontSize:"0.34rem"}}>
        >
          {sideBar &&
            sideBar.map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <div
                    className={styles.sideBarItemContainer}
                    onClick={() => {
                      dispatch(setActiveSideBarItem(item));
                      setActiveTab(idx);
                    }}
                  >
                    <img
                      src={require("../../../../Assets/img/Sidebar/divider.png")}
                    />
                    <div
                      className={classnames(styles.sideBarItem, {
                        [styles.sidebarItemActive]: idx === activeTab,
                      })}
                    >
                      <img className={styles.icon} src={item.icon} />
                      <span>{item.name}</span>
                    </div>
                    {idx === sideBar.length - 1 && (
                      <img
                        src={require("../../../../Assets/img/Sidebar/divider.png")}
                      />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper> */}
      </div>
    </motion.div>
  );
};

export default SideBar;
