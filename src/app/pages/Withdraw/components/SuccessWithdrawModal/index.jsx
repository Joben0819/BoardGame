import { useDispatch, useSelector } from 'react-redux';
import { setShowWithdrawSuccessModal } from 'src/reducers/gameSettings';
import styles from './index.module.scss';

const SuccessWithdrawModal = () => {
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer} data-theme={currTheme}>
        <div className={styles.modalHeader}>
          <span>意见反馈箱</span>
          <img
            src={require(`../../../../assets/${currTheme}/other_modal/othermodal_xbtn.png`)}
            onClick={() => dispatch(setShowWithdrawSuccessModal(false))}
            alt='close'
          />
        </div>
        <div className={styles.modalBody}>
          <img
            src={require(`../../../../assets/${currTheme}/other_modal/withdraw_success.png`)}
            alt='Withdraw Success'
          />
          <span className={styles.notice}>提现申请请求成功，请耐心等待</span>
          <span className={styles.instructions}>
            成功付款后,将自动到账请注意查看。如长时间没有反应,请联系在线客服确认。
          </span>
          <div
            className={styles.button}
            onClick={() => dispatch(setShowWithdrawSuccessModal(false))}
          >
            <span>确认</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessWithdrawModal;
