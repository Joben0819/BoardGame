import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getGameInfoGroup } from 'src/api/game/gamelist';
import styles from './index.module.scss';

const CategoryListBar = ({ activeSideBarItem, setActivePlatformId, setPlatformsList }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [data, setData] = useState();
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    getGameInfoGroup(activeSideBarItem.id).then((res) => {
      try {
        setData(res.data.data);
      } catch (error) {
        alert(error);
      }
    });

    return () => {
      setActivePlatformId(-1);
    };
  }, []);

  useEffect(() => {
    setPlatformsList(data);
  }, [data]);

  useEffect(() => {
    var item = document.getElementById('cateListWrapper');
    const handleMouseWheel = (e) => {
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    };
    item.addEventListener('wheel', handleMouseWheel, { passive: true });
    return () => {
      item.removeEventListener('wheel', handleMouseWheel);
    };
  }, []);

  return (
    <div id='cateListWrapper' className={styles.cateListWrapper}>
      <div className={styles.lists}>
        {data?.map((item, idx) => {
          return (
            <motion.div
              key={idx}
              animate={{ y: 0 }}
              initial={{ y: '100%' }}
              className={classnames(styles.iconHolder, {
                [styles.iconHolderActive]: activeTab === idx,
              })}
              onClick={() => {
                setActiveTab(idx);
                setActivePlatformId(item.id);
              }}
              data-theme={currTheme}
            >
              <img loading='lazy' src={item.icon} alt='Icon' />
              <span>{item.name} </span>
            </motion.div>
          );
        })}
      </div>
      {/* <Swiper
        freeMode={true}
        grabCursor={true}
        className={styles.mySwiper}
        slidesPerView={4}
        // spaceBetween={20}
        cleanstyles="true"
        keyboard={{ enabled: true, onlyInViewport: true }}
        mousewheel={true}
      >
        {data?.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <motion.div
                animate={{ y: 0 }}
                initial={{ y: "100%" }}
                className={classnames(styles.iconHolder, {
                  [styles.iconHolderActive]: activeTab === idx,
                })}
                onClick={() => {
                  setActiveTab(idx);
                  setActivePlatformId(item.id);
                }}
              >
                <img loading="lazy" src={item.icon} />
                <span>{item.name} </span>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </div>
  );
};

export default CategoryListBar;
