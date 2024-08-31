import { useSelector } from 'react-redux';
import BoxHeader from 'src/app/components/BoxHeader/BoxHeader';
import BindPhone from '../BindPhone';
import BlueDevice from './../../../assets/commons/vipPages/blueDevice.png';
import styles from './index.module.scss';

export default function SecurityCenter() {
  const { userData } = useSelector((state) => state.userInfo);
  const { currTheme } = useSelector((state) => state.gameSettings);
  return (
    <div className={styles.container} data-theme={currTheme}>
      <div className={styles.securityCenter_wrapper}>
        <div className={styles.securityCenter_inputBox}>
          <BoxHeader title='绑定手机号' />

          <div className={styles.securityCenterBody}>
            {!userData.phone ? (
              <BindPhone />
            ) : (
              <div className={styles.securityCenterWrapper}>
                {/* This shows when the step taken is on the second one na */}
                <div
                  className={styles.securityCenter_phoneCheckContainer}
                  // style={{ marginLeft: '0.8rem', paddingTop: '.7rem' }}
                >
                  <div className={styles.sc_phoneCheckLabel}>
                    <div className={styles.sc_pcimageHolder}>
                      <img
                        style={{
                          filter:
                            currTheme === 'brownGold'
                              ? 'brightness(0) invert(1)'
                              : currTheme === 'skyBlue'
                              ? 'brightness(0) invert(1)'
                              : '',
                        }}
                        src={BlueDevice}
                        alt='Blue Device'
                      />
                    </div>
                    <span>手机号</span>
                  </div>

                  <div className={styles.sc_phoneCheckInputHolder}>
                    <input
                      type='text'
                      style={{
                        outline: 'none',
                        fontSize: '0.15rem',
                      }}
                      placeholder='綁定手機號碼'
                      value={userData?.phone}
                      disabled={true}
                    ></input>
                  </div>
                </div>
                <div className={styles.sc_yellowText}>
                  温馨提示:实名认证手机号码可用手机号登入,账户安全更有保障。
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
