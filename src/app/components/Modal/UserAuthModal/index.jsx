import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//login
import {
  AccountInfo,
  BrowseInit,
  Login,
  Login_username,
  Register,
  Register_username,
  SMS,
} from 'src/api/game/gamelist';

import { useDispatch, useSelector } from 'react-redux';
import Loading from 'src/app/components/Loader/index';
import NECaptchaComponent from 'src/commons/Captcha/NECaptchaComponent';
import {
  setShowAnnouncementModal,
  setShowLoginModal,
  setShowOtherModalComp,
  setSwitch,
} from 'src/reducers/gameSettings';
import { setUserBalance, setUserData } from 'src/reducers/userInfo';
import {
  Folder_env,
  MODAL_BG_ANIMATION,
  MODAL_CONTENT_ANIMATION,
  getDeviceModel,
} from 'src/utils/helpers';
import AlertContainer from '../AlertContainer';
import styles from './index.module.scss';
let cooldownInterval;

export default function UserAuthModal({ open, setIsShowUserAuth, server }) {
  const env8803 = Folder_env('8803');
  const { Switch, currTheme } = useSelector((state) => state.gameSettings);
  // State variables
  const [stateSwitch, setStateSwitch] = useState(Switch);
  // These are the useState variables
  const [data, setData] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [pass, registerpass] = useState('');
  const [mobile, registermobile] = useState('');
  const [confirm, setconfirm] = useState('');
  const [Alert, setAlert] = useState('');
  const [load, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [authBtn, setAuthBtn] = useState(Switch ? 1 : 2);
  const nav = useNavigate();
  const dispatch = useDispatch();

  // const [prod, setProd] = useState();
  const [captchaId, setCaptchaId] = useState();
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState(false);
  const [registerErr] = useState(false);

  const [show, setShow] = useState(1);
  const [canSendCode, setCanSendCode] = useState(true);
  const [count, setCount] = useState(60);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  useEffect(() => {
    BrowseInit().then((res) => {
      // setProd(res.data.data?.productId);
      setCaptchaId(res.data.data?.captchaId);
      setIsCaptchaEnabled(res.data.data?.actionSwitch === '1' ? true : false);
    });
  }, []);

  useEffect(() => {
    if (count === 0) {
      setCanSendCode(true);
      clearInterval(cooldownInterval);
      setCount(60);
    }
  }, [count]);

  useEffect(() => {
    return () => {
      clearInterval(cooldownInterval);
    };
  }, []);

  useEffect(() => {
    if (server === 8803) {
      setAuthBtn(open && Switch ? 1 : 2);
      setStateSwitch(open && Switch);
      return;
    }
    setAuthBtn(open && Switch ? 2 : 1);
    setStateSwitch(open);
  }, [open]);

  function showUnshow(index) {
    if (index === 1) {
      return 'password';
    } else return 'text';
  }

  async function handleLogin(captchaData) {
    const machineId = localStorage.getItem('MachineId');
    const ip = localStorage.getItem('externalIP');
    const validate = isCaptchaEnabled ? captchaData : null;

    // if (user?.length < 3 || pwd?.length < 3) {
    //   setSuccess(false);
    //   console.log(user, pass, "user pass");
    //   setTimeout(() => {
    //     setSuccess(true);
    //   }, 1500);
    //   return;
    // }
    const username = user.length === 0 ? mobile : user;
    const password = pwd.length === 0 ? pass : pwd;
    let result = await (!env8803
      ? Login({ username, password, machineId, ip, validate })
      : Login_username({ username, password, machineId, ip, validate }));
    var tres = result.data.data;
    if (result?.data.code === 500) {
      showAlert(result.data.msg);
      !env8803 && alert(result.data.msg);
      env8803 && setLoader(false);
    } else {
      const withdraw = localStorage.getItem('withdrawModal');
      if (withdraw !== null) {
        dispatch(setShowOtherModalComp(true));
      }
      localStorage.setItem('loginNow', JSON.stringify(tres));
      !env8803 && setIsShowUserAuth(false);
      dispatch(setShowLoginModal(false));
      dispatch(setUserBalance(tres?.accountNow));
      dispatch(setShowAnnouncementModal(true));
      dispatch(setShowOtherModalComp(true));
      AccountInfo().then((res) => {
        sessionStorage.setItem('Data', JSON.stringify(res.data.data));
        dispatch(setUserData(res.data.data));
      });
      nav('/');
      localStorage.removeItem('withdrawModal');
    }

    env8803 &&
      setTimeout(() => {
        setError(false);
      }, 1500);
    return data;
  }

  const showAlert = (message, duration = 1500) => {
    setAlert(message);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, duration);
  };

  function handleSms() {
    if (!mobile) {
      showAlert('请输入手机号码');
      return;
    }

    if (canSendCode) {
      SMS(mobile).then((res) => {
        const msg = res?.data?.msg;
        if (res?.data?.code === 200) {
          showAlert(msg);
          setCanSendCode(false);
          cooldownInterval = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
          }, 1000);
        }
        if (res?.data?.code === 500) {
          showAlert(msg);
          return;
        }
      });
    }
  }

  function changeState(stateAuth, switchMe) {
    setStateSwitch(switchMe);
    setTimeout(() => {
      setAuthBtn(stateAuth);
    }, 1);
  }

  const handleRegistered = () => {
    const inviterCode = localStorage.getItem('channelCode');
    const machineId = localStorage.getItem('MachineId');
    const ip = localStorage.getItem('externalIP');
    const deviceModel = getDeviceModel();

    if (mobile && pass !== '') {
      const length_8803 = env8803 ? mobile.length > 5 && mobile.length < 26 : true;
      if (length_8803) {
        if (env8803 && confirm.length < 6) {
          showAlert('由6-16位数字加字母组成');
          return;
        }

        if (confirm !== pass) {
          showAlert('密码和密码确认不匹配');
          return;
        }

        if (env8803 && pass.length < 6) {
          showAlert('由6-16位数字加字母组成');
          return;
        }
        env8803 && setLoader(true);
        const register_name = env8803 ? Register_username : Register;
        register_name({
          mobile,
          pass,
          confirm,
          data,
          inviterCode,
          deviceModel,
          ip,
          machineId,
        }).then((res) => {
          if (res?.data.code !== 200) {
            showAlert(res?.data?.msg);
            return;
          }

          env8803 && setLoader(false);
          nav('/');
          var tres = res.data.data;
          localStorage.setItem('loginNow', JSON.stringify(tres));
          !env8803 && setIsShowUserAuth(false);
          dispatch(setShowLoginModal(false));
          dispatch(setUserBalance(tres?.accountNow));
          dispatch(setShowAnnouncementModal(true));
          dispatch(setShowOtherModalComp(true));
          AccountInfo().then((res) => {
            if (res.data.code) {
              sessionStorage.setItem('Data', JSON.stringify(res.data.data));
              dispatch(setUserData(res.data.data));
            }
          });
        });
      } else {
        showAlert('账号由6-25位数字加字母组成');
      }
    }
  };

  const handleCaptchaSuccess = (data) => {
    handleLogin(data);
  };

  const handleCaptchaFailure = (err) => {
    // console.error("NECaptcha verification failed:", err);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {load && <Loading load={load} />}
          {<AlertContainer alertMe={error} notify={Alert} centered />}
          <motion.div
            variants={MODAL_BG_ANIMATION}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={styles.overlay}
            data-theme={currTheme}
            onClick={() => {
              if (env8803) {
                dispatch(setShowLoginModal(false));
                dispatch(setSwitch(true));
              } else {
                setIsShowUserAuth(false);
              }
            }}
          >
            <motion.div
              variants={MODAL_CONTENT_ANIMATION}
              initial='hidden'
              animate='visible'
              exit='exit'
              className={styles.reg_login_input_box}
              onClick={(e) => e.stopPropagation()}
            >
              {isCaptchaOpen && isCaptchaEnabled && (
                <NECaptchaComponent
                  onSuccess={handleCaptchaSuccess}
                  onFailure={handleCaptchaFailure}
                  captchaId={captchaId}
                  isCaptchaOpen={isCaptchaOpen}
                  setIsCaptchaOpen={setIsCaptchaOpen}
                />
              )}
              {/* Authentication header part */}
              <div className={styles.header_Auth}>
                <div
                  className={styles.authButtons}
                  style={{ paddingBottom: '0.12rem', paddingTop: '0.09rem' }}
                >
                  <motion.div
                    animate={{
                      x: authBtn === (env8803 ? 2 : 1) ? '-100%' : '0',
                    }}
                    className={`${styles.authBtnActive} ${styles.activeBtn}`}
                  />

                  <div onClick={() => changeState(env8803 ? 2 : 1, !env8803)}>
                    <span>{env8803 ? '注册' : '手机号注册'}</span>
                  </div>
                  <div onClick={() => changeState(env8803 ? 1 : 2, env8803)}>
                    <span>{env8803 ? '登录' : '手机号登录'}</span>
                  </div>
                </div>

                {/* This is the inputFields */}

                <div className={styles.authContent}>
                  <AnimatePresence>
                    {
                      <motion.div
                        key={'login'}
                        initial={{ x: 0, opacity: 0, display: 'none' }}
                        animate={{
                          x: !stateSwitch ? '-20%' : '0%',
                          opacity: !stateSwitch ? 0 : 1,
                          display: !stateSwitch ? 'none' : 'block',
                        }}
                        exit={{ x: 0, opacity: 0, display: 'none' }}
                        transition={{ duration: 0.5 }}
                      >
                        <div
                          className={styles.inputFields}
                          style={{
                            justifyContent: env8803 ? 'flex-end' : 'flex-start',
                          }}
                        >
                          {/* <form onSubmit={handleSubmit}> */}
                          {!env8803 && error === true ? (
                            <h1 className='fail'>
                              {pwd?.length < 6 || user?.length < 6
                                ? '最小字符数为 6'
                                : '手机号不存在/密码错误'}
                            </h1>
                          ) : (
                            <p></p>
                          )}
                          {/* This is the username input field */}
                          {/* This is the username */}
                          <div className={styles.authBorder}>
                            {env8803 && <span className={styles.label}>账号:</span>}
                            <input
                              className={styles.authLoginData}
                              type='text'
                              name='username'
                              id='username'
                              maxLength={15}
                              onChange={(e) => {
                                // console.log(e.target.value);
                                setUser(e.target.value);
                              }}
                              placeholder={!env8803 ? `请输入6-15位数字或字母` : '请输入您的账号'}
                            />
                          </div>
                          <div className={styles.authBorder}>
                            {/* This is the password */}
                            {env8803 && <span className={styles.label}>密码:</span>}
                            <div>
                              <input
                                className={styles.authLoginData}
                                type={showUnshow(show)}
                                name='password'
                                id='password'
                                maxLength={16}
                                onChange={(e) => {
                                  // console.log(e.target.value);
                                  setPwd(e.target.value);
                                }}
                                placeholder={
                                  !env8803 ? `请输入6-16位数字、字母的密码 ` : '请输入您的密码'
                                }
                              />

                              <section className={styles.eyeCons}>
                                {show === 1 && (
                                  <img
                                    src={require(`../../../assets/${currTheme}/login_register/eye-hide.png`)}
                                    className={styles.eyeCon1}
                                    alt='hi1'
                                    onClick={() => setShow(2)}
                                  />
                                )}
                                {show === 2 && (
                                  <img
                                    src={require(`../../../assets/${currTheme}/login_register/eye-show.png`)}
                                    className={styles.eyeCon2}
                                    alt='hi2'
                                    onClick={() => setShow(1)}
                                  />
                                )}
                              </section>
                            </div>
                          </div>
                          {/* These are the buttons that will appear with the enough function */}
                          <center>
                            {/* this is the submit Button */}
                            <button
                              className={`${
                                !env8803 ? styles.submitButton : styles.submitButton_v2
                              }`}
                              onClick={() => {
                                if (isCaptchaEnabled) {
                                  setIsCaptchaOpen(true);
                                } else {
                                  handleLogin();
                                }
                              }}
                            >
                              {env8803 ? '立即注册' : '确认登录'}
                            </button>
                          </center>
                          {/* </form> */}
                          {/* Navigate to Register */}
                          {!env8803 && (
                            <>
                              <center>
                                <button
                                  className={styles.registerButton}
                                  onClick={() => {
                                    changeState(2, false);
                                    setAuthBtn(2);
                                  }}
                                >
                                  注册
                                </button>
                              </center>
                            </>
                          )}{' '}
                          <div
                            className={styles.loginOverlay}
                            style={{
                              flex: !env8803 ? '1 1' : '.6 1',
                            }}
                          >
                            {/* Support Information */}
                            <Link to='/Customer'>
                              <div className={styles.mInfo}>
                                <p>
                                  {!env8803 && (
                                    <>
                                      <img
                                        src={require(`../../../assets/${currTheme}/login_register/supps-icon.png`)}
                                        alt='hi'
                                      />
                                      {' 有问题？找在线客服'}
                                    </>
                                  )}
                                </p>
                              </div>
                            </Link>

                            {/* Version Information */}
                            <div className={styles.aVersionLog}>
                              当前版本{' '}
                              <span className={styles.version1} style={{ fontWeight: 500 }}>
                                {process.env.REACT_APP_VERSION}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>

                  <>
                    <motion.div
                      key={'register'}
                      initial={{
                        x: '1000%',
                        opacity: 0,
                        display: !stateSwitch ? 'block' : 'none',
                      }}
                      animate={{
                        x: !stateSwitch ? '0%' : '20%',
                        opacity: !stateSwitch ? 1 : 0,
                        display: !stateSwitch ? 'block' : 'none',
                      }}
                      exit={{ x: 300, opacity: 0, display: 'none' }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={styles.inputFields}
                        style={{
                          justifyContent: env8803 ? 'flex-end' : 'flex-start',
                        }}
                      >
                        {!env8803 && registerErr && <h1 className='fail'>{Alert}</h1>}
                        <div
                          className={`${styles.authBorder} ${env8803 && styles.additional_auth}`}
                        >
                          {env8803 && <span className={styles.label}>账号:</span>}
                          <input
                            className={styles.authLoginData}
                            placeholder={
                              env8803 ? '账号由6-16位数字加字母组成' : '请输入您的手机号'
                            }
                            onChange={(e) => {
                              registermobile(e.target.value);
                            }}
                            maxLength={15}
                            required={true}
                          />
                        </div>
                        <div
                          className={`${styles.authBorder} ${env8803 && styles.additional_auth}`}
                        >
                          {env8803 && <span className={styles.label}>密码:</span>}
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={styles.authLoginData}
                            placeholder={env8803 ? '由6-16位数字加字母组成' : '请输入密码'}
                            onChange={(e) => {
                              setconfirm(e.target.value);
                            }}
                            maxLength={16}
                            required
                          />
                          <div className={styles.eyeContainer}>
                            <img
                              onClick={() => setShowPassword(!showPassword)}
                              src={
                                showPassword
                                  ? require(`src/app/assets/${currTheme}/login_register/eye-show.png`)
                                  : require(`src/app/assets/${currTheme}/login_register/eye-hide.png`)
                              }
                              alt='Eye Icon'
                              className={styles.eye}
                            />
                          </div>
                        </div>
                        <div
                          className={`${styles.authBorder} ${env8803 && styles.additional_auth}`}
                        >
                          {env8803 && (
                            <span className={styles.label} style={{ left: '-.75rem' }}>
                              确认密码:
                            </span>
                          )}
                          <input
                            type={showRePassword ? 'text' : 'password'}
                            className={styles.authLoginData}
                            placeholder={env8803 ? '由6-16位数字加字母组成' : '请再次输入密码'}
                            onChange={(e) => {
                              registerpass(e.target.value);
                            }}
                            maxLength={16}
                            required
                          />
                          <div className={styles.eyeContainer}>
                            <img
                              onClick={() => setShowRePassword(!showRePassword)}
                              src={
                                showRePassword
                                  ? require(`src/app/assets/${currTheme}/login_register/eye-show.png`)
                                  : require(`src/app/assets/${currTheme}/login_register/eye-hide.png`)
                              }
                              alt='Eye Icon'
                              className={styles.eye}
                            />
                          </div>
                        </div>
                        {!env8803 && (
                          <div className={styles.authBorder}>
                            {/* Verification Input */}
                            <div className={styles.verificationCode}>
                              <input
                                className={styles.authLoginData}
                                onChange={(e) => {
                                  setData(e.target.value);
                                }}
                                id='usern4'
                                type=''
                                name='username'
                                placeholder='请输入验证码'
                                required={true}
                              />
                              {/* Verification Button */}
                              <section>
                                <button className={styles.verifyButton} onClick={handleSms}>
                                  {canSendCode ? '获取验证码' : `${count}s`}
                                </button>
                              </section>
                            </div>
                          </div>
                        )}

                        {/* Submit Button */}
                        <center>
                          <button
                            type=''
                            className={`${!env8803 ? styles.submitButton : styles.submitButton_v2}`}
                            onClick={() => {
                              const mobileError = '账号：账号由6-15位数字加字母组成';
                              const passError = '由8-16位数字加字母组成';
                              const codeError = '请输入短信验证码';

                              if (!mobile) {
                                showAlert(mobileError);
                                return;
                              }

                              if (!confirm || !pass) {
                                showAlert(passError);
                                return;
                              }

                              if (!data) {
                                showAlert(codeError);
                                return;
                              }

                              handleRegistered();
                            }}
                          >
                            {env8803 ? '确认注册' : '确认注册'}
                          </button>
                          <br />
                        </center>

                        {/* Version Information */}
                        <div
                          className={styles.aVersionLog2}
                          style={{
                            flex: !env8803 ? '1 1' : '.6 1',
                            alignItems: !env8803 ? 'center' : 'flex-end',
                          }}
                        >
                          已有账号, &nbsp;{' '}
                          <span
                            className={styles.version2}
                            // style={{ color: "#F5C701" }}
                            onClick={() => {
                              changeState(1, true);
                              setAuthBtn(1);
                            }}
                          >
                            前往登陆&gt;{' '}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
