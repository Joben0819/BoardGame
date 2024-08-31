import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setShowBindWithdrawModal, setShowOtherModalComp } from 'src/reducers/gameSettings';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import styles from './index.module.scss';

const BindWithdrawModal = () => {
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const goTo = useNavigate();

  const handleButtonClick = (destination) => {
    dispatch(setShowOtherModalComp(false));
    if (destination === 'withdraw') {
      dispatch(setShowBindWithdrawModal(false));
      goTo('/Withdraw');
    } else if (destination === 'phone') {
      dispatch(setShowBindWithdrawModal(false));
      goTo('/PersonalInfo', { state: { section: 'securityCenter' } });
    }
  };

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
        onClick={() => dispatch(setShowBindWithdrawModal(false))}
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
          <span className={styles.notice}>
            您当前账号为<span className={styles.touristText}>游客账号</span>
            ,请绑定手机,防止账户丢失。
          </span>
          <div className={styles.buttonsContainer}>
            <div className={styles.withdraw} onClick={() => handleButtonClick('withdraw')}>
              <span>继续提现</span>
            </div>
            <div className={styles.phone} onClick={() => handleButtonClick('phone')}>
              <span>前往绑定</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BindWithdrawModal;
