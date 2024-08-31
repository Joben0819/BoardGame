import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setShowVersionModal } from 'src/reducers/gameSettings';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import styles from './index.module.scss';

const VersionModal = () => {
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { domainName } = useSelector((state) => state.gameData);

  return (
    <motion.div
      variants={MODAL_BG_ANIMATION}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={styles.overlay}
    >
      <div
        className={styles.overlayClick}
        onClick={() => dispatch(setShowVersionModal(false))}
      />
      <motion.div
        variants={MODAL_CONTENT_ANIMATION}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={styles.modalContainer}
        data-theme={currTheme}
      >
        <div className={styles.modalBody}>
          <span className={styles.notice}>有新版本，是否前往更新</span>
          <div className={styles.buttonsContainer}>
            <div
              className={styles.close}
              onClick={() => dispatch(setShowVersionModal(false))}
            >
              <span>取消</span>
            </div>
            <div
              className={styles.redirect}
              onClick={() => window.open('http://' + domainName, '_blank')}
            >
              <span>确定</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VersionModal;
