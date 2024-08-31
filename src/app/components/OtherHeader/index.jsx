import classnames from 'classnames';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { escGame, getAccountInfo } from 'src/api/game/gamelist';
import CoinPurse from 'src/app/components/CoinPurse';
import { setShowQuitDialog } from 'src/reducers/gameSettings';
import { updateBalance } from 'src/reducers/userInfo';
import { popSound, setVolume } from 'src/utils/audio-player';
import { Folder_env } from 'src/utils/helpers';
import styles from './index.module.scss';

function OtherHeader(props) {
  const { currTheme, gameVolume } = useSelector((state) => state.gameSettings);
  const takeMe = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let gameEscDelay;
  let updateBalanceDelay;
  const [data, setdata] = useState(false);
  const isRechargePage = location?.pathname === '/Recharge' || location?.pathname === '/Recharge/';

  const isWebViewPage = location?.pathname === '/webView' || location?.pathname === '/webView/';

  const isPromotionPage =
    location?.pathname === '/PromotionAgent' || location?.pathname === '/PromotionAgent/';

  const is8803 = Folder_env('8803');

  if (location.pathname.includes('Games')) {
    setVolume(0);
  }

  function oh_btnHandler() {
    var num = sessionStorage.getItem('id');
    escGame(num);
    if (location.pathname.includes('Games')) {
      updateBalanceDelay = setTimeout(() => {
        dispatch(updateBalance());
      }, 800);
      gameEscDelay = setTimeout(() => {
        setVolume(Number.isInteger(gameVolume) ? Number(gameVolume) / 100 : 1);
        dispatch(setShowQuitDialog(false));
        takeMe('/');
        setdata(true);
      }, 900);
    } else {
      dispatch(setShowQuitDialog(false));
      takeMe('/');
    }
  }
  function web_btnHandler() {
    takeMe('/Recharge');
  }
  function GotoRecharge() {
    takeMe(0);

    takeMe('/', {
      state: {
        page: 'rechargeHistory',
        sideActive: 1,
        section: 'rechargeOnline',
        amount: props.amount,
      },
    });
  }

  useEffect(() => {
    dispatch(setShowQuitDialog(data));
  }, [data]);

  const [myAccInfo, setMyAccInfo] = useState([]);

  useEffect(() => {
    getAccountInfo().then((res) => {
      setMyAccInfo(res.data.data);
    });

    return () => {
      clearTimeout(gameEscDelay);
      clearTimeout(updateBalanceDelay);
    };
  }, []);

  const [start, setstart] = useState(0);

  function DragButton() {
    if (location.pathname.includes('Games')) {
      sessionStorage.setItem('set2', 'true');
      return true;
    } else if (location.pathname.includes('webView')) {
      sessionStorage.setItem('set2', 'true');
    } else {
      sessionStorage.setItem('set2', 'false');
      return false;
    }
  }

  const Drag = (e, el) => {
    if (start === true) {
      setdata(true);
    } else {
      setdata(false);
      setTimeout(function () {
        setstart(true);
      }, 1500);
    }
  };

  const Samp = (e) => {
    setTimeout(function () {
      setstart(false);
    }, 50);
  };
  var a = sessionStorage.getItem('dd');
  return (
    <>
      {DragButton() === true ? (
        <Draggable
          defaultPosition={{ x: 0, y: 10 }}
          onStop={Drag}
          bounds='body'
          onStart={() => {
            setstart(true);
          }}
          onDrag={Samp}
        >
          <div
            className={styles.exit}
            onClick={() => {
              popSound();
            }}
            id='23'
          >
            返回
          </div>
        </Draggable>
      ) : (
        <>
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className={classnames(styles.other_header, {
              [styles.webViewOverrides]: isWebViewPage,
            })}
            style={{
              position: props.absol,
              zIndex: props.zindex ? props.zindex : '',
              // height: a === "true" ? ".4rem" : "10%"
            }}
            data-theme={currTheme}
          >
            <div className='wd-10'>
              <div className='oh_backBtn_container'>
                <div
                  onClick={() => {
                    popSound();
                    if (location.pathname.includes('RechargeHistory')) {
                      takeMe('/Recharge', {
                        state: { from: 'RechargeHistory' },
                      });
                    } else if (props.webView) {
                      web_btnHandler();
                    } else if (location.pathname.includes('Share')) {
                      takeMe('/PromotionAgent');
                    } else {
                      takeMe('/');
                    }
                  }}
                >
                  <img
                    src={require(`../../assets/${currTheme}/header/backBtn.png`)}
                    alt='hi'
                    style={{ width: '0.3rem' }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                width: isWebViewPage ? '' : '5rem',
                flex: '1',
                marginLeft: '-0.1rem',
              }}
            >
              <div className={styles.Oh_title}>
                {' '}
                <div
                  className={classnames('d-flex al-items', {
                    [styles.titleOnlyOverride]: !isRechargePage && !isPromotionPage,
                  })}
                >
                  {' '}
                  <span>{props.title}</span>{' '}
                </div>
                {props.title === '充值' ? (
                  <>
                    <div
                      className={styles.historyRecordButton}
                      onClick={() => {
                        popSound();
                        if (location.pathname.includes('Recharge')) {
                          takeMe('/RechargeHistory');
                        } else {
                          GotoRecharge();
                        }
                      }}
                    >
                      <img
                        src={require(`../../assets/${currTheme}/header/hisRecord.png`)}
                        className={styles.hrImage}
                        alt='hi'
                      />
                      <span className={currTheme === 'yellowWhite' ? styles.prioRed : ''}>
                        充值记录 &gt;
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {props.share === true ? (
                  <>
                    <div
                      className={classnames(
                        'wd-40 historyRecordButton',
                        styles.historyRecordButton
                      )}
                      onClick={() => {
                        props.clickMe();
                        popSound();
                      }}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <img
                        src={require(`../../assets/${currTheme}/header/shareIcon.png`)}
                        className=''
                        alt='hi'
                        style={{
                          width: '0.15rem',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.15rem',
                          marginLeft: '0.08rem',
                        }}
                      >
                        推广攻略 &gt;
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <span
              style={{
                marginTop: '-0.01rem',
                marginLeft: '0.2rem',
                width: '2rem',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {!props.nopurse &&
                !is8803 &&
                !location.pathname.toLowerCase().includes('customer') &&
                !location.pathname.toLowerCase().includes('mailbox') && (
                  <CoinPurse left={'78%'} accountNow={myAccInfo ? myAccInfo?.accountNow : '0.00'} />
                )}
            </span>
          </motion.div>
          {/* {data === true ? (
            <div className="part">
              <div className="wd-85">
                <table
                  className="wd-100 txt-cent bg-white color-black font-23 hgp-126"
                  style={{ "border-radius": "4px" }}
                >
                  <tr>
                    <th
                      colspan="2"
                      className="br-bottom hgp-75 color-black"
                      style={{ "font-weight": "400", color: "#555555" }}
                    >
                      {" "}
                      确定是否退出
                    </th>
                  </tr>
                  <tr>
                    <td
                      className="br-right"
                      onClick={() => {
                        setdata(false);
                      }}
                    >
                      取消
                    </td>
                    <td onClick={oh_btnHandler} style={{ color: "red" }}>
                      {" "}
                      确定
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          ) : (
            ""
          )} */}
        </>
      )}
      {data === true ? (
        <div className='part'>
          <div
            className='wd-85 txt-cent bg-white color-black font-23 hgp-126 d-flex'
            style={{ flexDirection: 'column' }}
          >
            {/* <div
              className="wd-100 txt-cent bg-white color-black font-23 hgp-126"
              style={{ borderRadius: "4px" }}
            > */}
            {/* <div> */}
            <div
              className='br-bottom color-black hg-60 d-flex just-space-cent al-items '
              style={{ fontWeight: '400', color: '#555555' }}
            >
              {' '}
              确定是否退出
            </div>
            {/* </div> */}
            <div className='d-flex hg-40'>
              <div
                className='br-right wd-50 d-flex just-space-cent al-items '
                onClick={() => {
                  setdata(false);
                  setstart(false);
                }}
              >
                取消
              </div>
              <div
                onClick={oh_btnHandler}
                style={{ color: 'red' }}
                className='wd-50 d-flex just-space-cent al-items '
              >
                {' '}
                确定
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default OtherHeader;
