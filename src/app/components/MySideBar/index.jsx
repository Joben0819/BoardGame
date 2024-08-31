import { motion } from 'framer-motion';
import styles from './index.module.scss';

export default function SideBarWashCode({ washSideAct, ClickSide, washCodeSideTitles }) {
  // const washCodeSideTitles = ["自助洗码", "洗码记录", "洗码比例"];

  return (
    <>
      <motion.div
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.washCodeSideBar}
      >
        {washCodeSideTitles.map((title, index) => {
          return (
            <>
              <div
                onClick={() => {
                  ClickSide(index);
                }}
                className={`${styles.sidebarTitle} ${
                  washSideAct === index ? styles.sidebarTitleActive : ''
                } `}
              >
                <span>{title}</span>
              </div>
              <div className={styles.lineDivider}></div>
            </>
          );
        })}
      </motion.div>
    </>
  );
}
