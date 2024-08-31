import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getWashCodeRateList } from 'src/api/game/gamelist';
import { Swiper, SwiperSlide } from 'swiper/react';
import { WashCodeTable } from '../Fragments/WashCodeTable';
import { CodeWashRatioHeader } from '../Fragments/tableData/CodeWashRatio';
import styles from './index.module.scss';

export default function CodeWashingRatio() {
  const swiperRef = useRef(null);
  const [backOne, setBackOne] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { currTheme } = useSelector((state) => state.gameSettings);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWashCodeRateList();
      if (res.data.code === 200) {
        setBackOne(res.data?.data);
      } else {
        alert(res.msg);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (swiperRef) {
      swiperRef.current.swiper.slideTo(activeTab);
    }
  }, [activeTab]);

  const reloadData = async () => {
    getWashCodeRateList().then((res) => {
      setBackOne(res.data.data);
    });
  };

  const handleSlideChange = (e) => {
    setActiveTab(e.activeIndex);
  };

  return (
    <>
      <div className={styles.container} data-theme={currTheme}>
        <div className={styles.headerCont}>
          <div className={styles.headerTab}>
            <ul>
              {backOne.length > 0 && (
                <motion.div
                  className={`${styles.activeNav} ${styles.activeTab}`}
                  style={{
                    width: `${100 / backOne.length}%`,
                  }}
                  animate={{
                    left: `${(100 / backOne.length) * activeTab}%`,
                  }}
                />
              )}
              {backOne.map((tab, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveTab(index);
                    }}
                    className={`${activeTab === index ? styles.activeText : ''}`}
                  >
                    {tab.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.tableCont}>
          <Swiper
            ref={swiperRef}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            touchStartPreventDefault={false}
          >
            <motion.div className={styles.tableOneWrapper}>
              {backOne.map((data, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={styles.tableContainer}>
                      <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
                        <WashCodeTable
                          pbot={'0.02rem'}
                          headerData={CodeWashRatioHeader}
                          tableData={data.washCodeDescList}
                        />
                      </PullToRefresh>
                    </div>
                  </SwiperSlide>
                );
              })}
            </motion.div>
          </Swiper>
        </div>
      </div>
    </>
  );
}
