import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const SuccessRechargeModal = ({ setShowSuccessModal }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  return (
    <div className={styles.modalOverlay} data-theme={currTheme}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <span>充值提示</span>
        </div>
        <div className={styles.modalBody}>
          <img src={require('../../../../assets/commons/recharge.png')} alt='recharge' />
          <span>
            入款中 <br />
            "成功付款后，将自动到账请注意查看。如长时间没有反应，请联系 在线客服 确认。"
          </span>
          <div className={styles.button} onClick={() => setShowSuccessModal(false)}>
            <span>我知道了</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessRechargeModal;
