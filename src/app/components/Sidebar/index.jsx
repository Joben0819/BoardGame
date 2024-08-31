import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { popSound } from 'src/utils/audio-player';
import styles from './index.module.scss';

const SidebarV2 = ({ list, activeItem, setActiveItem }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const location = useLocation();
  const isRechargePage = location?.pathname === '/Recharge' || location?.pathname === '/Recharge/';

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.sidebarWrapper}
    >
      {isRechargePage &&
        list?.map((item, index) => {
          return (
            <div
              key={index}
              className={classnames(styles.sidebarItems, {
                [styles.activeItem]: index === activeItem,
              })}
              onClick={() => {
                setActiveItem(index);
                popSound();
              }}
            >
              <div className={styles.imgHolder}>
                <img src={item.iconUrl} alt='Icon Url' />
              </div>
              <div className={styles.txt}>
                <span>{item.name}</span>
              </div>
              {item?.recommend && (
                <div className={styles.recommend}>
                  <span
                    style={{
                      background: 'white',
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    热
                  </span>
                </div>
              )}
            </div>
          );
        })}
      {!isRechargePage &&
        list?.map((item, index) => {
          return (
            <div
              key={index}
              className={classnames(styles.sidebarItems, {
                [styles.activeItem]: index === activeItem,
                [styles.noIconOveray]: true,
              })}
              bet-data={item === '' ? 'none' : undefined}
              onClick={() => {
                setActiveItem(index);
                popSound();
              }}
            >
              <span>{item}</span>
            </div>
          );
        })}
    </motion.div>
  );
};

export default SidebarV2;
