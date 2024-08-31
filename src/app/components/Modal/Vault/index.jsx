import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { boxAccount, boxPassSet, withdrawBank, withdrawPassSet } from 'src/api/game/gamelist';
import { setShowWithdrawSuccessModal } from 'src/reducers/gameSettings';
import {
  DataBalance,
  TransferBalance,
  setBoxPassIsSet,
  setWithdrawPassIsSet,
  updateBalance,
} from 'src/reducers/userInfo';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import styles from './index.module.scss';

const btnValues = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  ['删除', 9, 0, '确认'],
];
// const toLocaleString = (num) =>
//   String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g,"$1");

const removeSpaces = (num) => num.toString().replace(/\s/g, '');
export default function SafeBoxModal({
  withdraw1,
  withdraw2,
  safeBoxOpen,
  safeBoxClose,
  setAlertNotif,
  setAlertMessage,
}) {
  let [calc, setCalc] = useState({
    num: '',
  });
  const takeTo = useNavigate();
  const location = useLocation();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { boxPassIsSet, withdrawPassIsSet } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [passwordAlreadySet, setPasswordAlreadySet] = useState(false);
  // const [alertNotif, setAlertNotif] = useState(false);
  // const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (location.pathname.includes('Withdraw')) {
      setPasswordAlreadySet(withdrawPassIsSet);
    } else {
      setPasswordAlreadySet(boxPassIsSet);
    }
  }, [boxPassIsSet, withdrawPassIsSet]);

  useEffect(() => {
    if (safeBoxOpen) {
      clearAllClickHandler();
    }
  }, [safeBoxOpen]);

  function NumClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 4) {
      setCalc({
        num: removeSpaces(calc.num + value),
      });
    }
    setAlertNotif(false);
    setAlertMessage('');
  }
  const resetClickHandler = () => {
    const newNum = calc.num.slice(0, -1);
    setCalc({ ...calc, num: newNum });

    document.getElementById('first').value = newNum[0] || '';
    document.getElementById('second').value = newNum[1] || '';
    document.getElementById('third').value = newNum[2] || '';
    document.getElementById('fourth').value = newNum[3] || '';

    setAlertNotif(false);
    setAlertMessage('');
  };

  const clearAllClickHandler = () => {
    setCalc({ num: '' });

    document.getElementById('first').value = '';
    document.getElementById('second').value = '';
    document.getElementById('third').value = '';
    document.getElementById('fourth').value = '';
  };
  var car = calc.num;
  const myArr = Array.from(car);

  const withdrawOperations = () => {
    if (calc?.num?.length !== 4) {
      setAlertNotif(true);
      setAlertMessage('请输入密码');
      return;
    }
    if (!withdrawPassIsSet) {
      withdrawPassSet(calc?.num).then((res) => {
        if (res.data.code !== 200) {
          setAlertNotif(true);
          setAlertMessage(res.data.msg);
        } else {
          dispatch(setWithdrawPassIsSet(true));
        }
      });
    } else {
      withdrawBank(withdraw1, withdraw2, calc?.num).then((res) => {
        if (res.data.code !== 200) {
          setAlertNotif(true);
          setAlertMessage(res.data.msg);
        } else {
          dispatch(setShowWithdrawSuccessModal(true));
          dispatch(updateBalance());
        }
      });
      safeBoxClose();
    }
  };

  const vaultPageOperations = () => {
    if (!boxPassIsSet) {
      boxPassSet(calc?.num).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
        } else {
          sessionStorage.setItem('pass', calc?.num);
          dispatch(setBoxPassIsSet(true));
        }
      });
    } else {
      boxAccount(calc?.num).then((res) => {
        if (res.data.code !== 200) {
          alert(res.data.msg);
        } else {
          sessionStorage.setItem('pass', calc?.num);
          dispatch(DataBalance());
          dispatch(updateBalance());
          dispatch(TransferBalance());
          takeTo('/Safebox');
          safeBoxClose();
        }
      });
    }
  };

  const confirmClickHandler = () => {
    if (location.pathname.includes('Withdraw')) {
      withdrawOperations();
    } else {
      if (calc.num.length !== 4) {
        setAlertNotif(true);
        setAlertMessage('请输入密码');
        return;
      }
      vaultPageOperations();
    }
    clearAllClickHandler();
  };

  return (
    <AnimatePresence>
      {safeBoxOpen && (
        <motion.div
          variants={MODAL_BG_ANIMATION}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='overlay'
          onClick={() => {
            safeBoxClose();
          }}
        >
          <motion.div
            variants={MODAL_CONTENT_ANIMATION}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={styles.modalSafeBox_wrapper}
            onClick={(e) => e.stopPropagation()}
            data-theme={currTheme}
          >
            <div className={styles.mdsContainerHeader}>
              <span className={styles.mdsHeaderTitle}>提现密码</span>

              <img
                src={require(`./../../../assets/${currTheme}/footer/othermodal_xbtn.png`)}
                onClick={() => safeBoxClose()}
                alt='close'
                className='sb_xbtn'
              ></img>
            </div>
            <div className={styles.modalSafeBoxContainer}>
              <div
                className={styles.font}
                style={{
                  fontSize: '0.15rem',
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {withdrawPassIsSet ? '提现密码' : '请设置提现密码'}
              </div>

              <div className={styles.safeBox_input}>
                <div id='otp' className='flex justify-center'>
                  <input type='password' disabled={true} id='first' value={myArr[0]} />
                  <input type='password' disabled={true} id='second' value={myArr[1]} />
                  <input type='password' disabled={true} id='third' value={myArr[2]} />
                  <input type='password' disabled={true} id='fourth' value={myArr[3]} />
                </div>
              </div>
              <div className={styles.buttonBox}>
                {btnValues.flat().map((btn, i) => {
                  return (
                    <button
                      key={btn}
                      style={{
                        fontWeight: typeof btn !== 'number' && 700,
                        fontSize: typeof btn !== 'number' && '.12rem',
                        paddingBottom: typeof btn !== 'number' && '.02rem',
                      }}
                      onClick={
                        btn === '删除'
                          ? resetClickHandler
                          : btn === '确认'
                          ? confirmClickHandler
                          : NumClickHandler
                      }
                      className={
                        btn === '确认'
                          ? calc?.num?.length < 4
                            ? styles.safeEnterDisabled
                            : styles.safeEnter
                          : btn === '删除'
                          ? styles.safeReset
                          : ''
                      }
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
