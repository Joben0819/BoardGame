import { useEffect, useState } from 'react';

// images
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import eyeCon from '../../assets/blackGold/footer/eye-hide.png';
import eyeCon1 from '../../assets/blackGold/footer/eye-show.png';
import suppIcon from '../../assets/blackGold/footer/supps-icon.png';

import { useDispatch } from 'react-redux';
import { AccountInfo, Login, Register, SMS } from 'src/api/game/gamelist';
import { setShowLoginModal } from '../../../reducers/gameSettings';
import { setUserBalance, setUserData } from '../../../reducers/userInfo';

let cooldownInterval;

export default function UserAuthModal({ setIsShowUserAuth, open, onLog }) {
  // State variables
  // const [thismodal, setthisModal] = useState(true);
  const [stateSwitch, setStateSwitch] = useState(true);

  // These are the useState variables
  const [data, setData] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [pass, registerpass] = useState('A');
  const [mobile, registermobile] = useState('');
  const [confirm, setconfirm] = useState('A');

  //   const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState('');

  const [authBtn, setAuthBtn] = useState(1);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(1);
  const [canSendCode, setCanSendCode] = useState(true);
  const [count, setCount] = useState(60);

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

  if (!open) {
    return null;
  }

  function showUnshow(index) {
    if (index === 1) {
      return 'password';
    } else return 'text';
  }

  async function handleLogin() {
    let result = await Login(user, pwd);
    var tres = result.data.data;
    if (tres === null) {
      var data = setSuccess(false);
    } else {
      localStorage.setItem('loginNow', JSON.stringify(tres));
      setIsShowUserAuth(false);
      dispatch(setShowLoginModal(false));
      dispatch(setUserBalance(tres?.accountNow));
      dispatch(setUserData(tres));
      AccountInfo().then((res) => {
        sessionStorage.setItem('Data', JSON.stringify(res.data.data));
      });
      nav('/');
    }
    return data;
  }

  function Sms() {
    if (pass === 'A' || confirm === 'A' || pass === '' || confirm === '') {
    } else {
      if (canSendCode) {
        setCanSendCode(false);
        cooldownInterval = setInterval(() => {
          setCount((prevCount) => prevCount - 1);
        }, 1000);
        SMS(mobile).then((res) => {
          // alert(res.data.msg)
        });
      }
    }
  }

  function changeState(stateAuth, switchMe) {
    setStateSwitch(switchMe);
    setTimeout(() => {
      setAuthBtn(stateAuth);
    }, 1);
  }

  function Registered() {
    Register(mobile, pass, data).then((res) => {
      alert(res.data.msg);
      if (res.data.code === 200) {
        handleLogin();
      }
    });
    // auth.login(user);
    nav('/');
    // setthisModal(false);
    // onLog(thismodal);
  }

  return (
    <div
      className='overlay'
      style={{ background: '', position: 'absolute' }}
      onClick={() => setIsShowUserAuth(false)}
    >
      <div className='reg_login_input_box' onClick={(e) => e.stopPropagation()}>
        {/* Authentication header part */}
        <div className='header_Auth'>
          <div className='authButtons'>
            <div
              className={authBtn === 1 ? 'authBtnActive' : ''}
              onClick={() => changeState(1, true)}
            >
              <span>手机号登录</span>
            </div>
            <div
              className={authBtn === 2 ? 'authBtnActive' : ''}
              onClick={() => changeState(2, false)}
            >
              <span>手机号注册</span>
            </div>
          </div>

          {/* This is the inputFields */}

          <div className='authContent'>
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
                  <div className='inputFields'>
                    {/* <form onSubmit={handleSubmit}> */}
                    {success === false ? <h1 className='fail'>Failed</h1> : <p></p>}
                    {/* This is the username input field */}
                    {/* This is the username */}

                    <div className='authBorder'>
                      <input
                        className='authLoginData'
                        type='text'
                        name='username'
                        id='username'
                        maxLength={11}
                        onChange={(e) => {
                          // console.log(e.target.value);
                          setUser(e.target.value);
                        }}
                        placeholder='请输入6-15位数字或字母'
                      />
                    </div>

                    <div className='authBorder'>
                      {/* This is the password */}
                      <div>
                        <input
                          className='authLoginData'
                          type={showUnshow(show)}
                          name='password'
                          id='password'
                          onChange={(e) => {
                            // console.log(e.target.value);
                            setPwd(e.target.value);
                          }}
                          placeholder='请输入6-16位数字、字母的密码 '
                        />

                        <section className='eyeCons'>
                          {show === 1 && (
                            <img
                              src={eyeCon}
                              className='eyeCon1'
                              alt='hi1'
                              onClick={() => setShow(2)}
                            />
                          )}
                          {show === 2 && (
                            <img
                              src={eyeCon1}
                              className='eyeCon2'
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
                      <button className='submitButton' onClick={handleLogin}>
                        确认登录
                      </button>
                    </center>
                    {/* </form> */}

                    <center>
                      {/* Navigate to Register */}
                      <button
                        className='registerButton'
                        onClick={() => {
                          changeState(2, false);
                          setAuthBtn(2);
                        }}
                      >
                        注册
                      </button>
                    </center>

                    <div className='loginOverlay'>
                      {/* Support Information */}
                      <Link to='/Customer'>
                        <div className='mInfo'>
                          <p>
                            <img src={suppIcon} alt='hi' /> 有问题？找在线客服
                          </p>
                        </div>
                      </Link>

                      {/* Version Information */}
                      <div className='aVersionLog'>
                        当前版本{' '}
                        <span style={{ color: '#F9C423', fontWeight: 500 }}>
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
                  x: !stateSwitch ? '-1.5%' : '20%',
                  opacity: !stateSwitch ? 1 : 0,
                  display: !stateSwitch ? 'block' : 'none',
                }}
                exit={{ x: 300, opacity: 0, display: 'none' }}
                transition={{ duration: 0.5 }}
              >
                <div className='inputFields'>
                  <div className='authBorder'>
                    <input
                      className='authLoginData'
                      placeholder='请输入您的手机号'
                      onChange={(e) => {
                        registermobile(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className='authBorder'>
                    <input
                      className='authLoginData'
                      placeholder='请输入密码'
                      onChange={(e) => {
                        setconfirm(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className='authBorder'>
                    <input
                      className='authLoginData'
                      placeholder='请再次输入密码'
                      onChange={(e) => {
                        registerpass(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className='authBorder'>
                    {/* Verification Input */}
                    <div className='verificationCode'>
                      <input
                        className='authLoginData'
                        onChange={(e) => {
                          setData(e.target.value);
                        }}
                        id='usern4'
                        type=''
                        name='username'
                        placeholder='请输入验证码'
                      />
                      {/* Verification Button */}
                      <section>
                        <button className='verifyButton' onClick={Sms}>
                          {canSendCode ? '获取验证码' : `${count}s`}
                        </button>
                      </section>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <center>
                    <button type='submit' className='submitButton' onClick={Registered}>
                      确认注册
                    </button>
                    <br />
                  </center>

                  {/* Version Information */}
                  <div className='aVersionLog2'>
                    已有账号, &nbsp;{' '}
                    <span
                      style={{ color: '#F5C701' }}
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
      </div>
    </div>
  );
}
