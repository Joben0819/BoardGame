import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveQuestReward, ResetPassword } from 'src/api/game/gamelist';
import { setCurrTheme, setShowLoginModal, setShowVersionModal } from 'src/reducers/gameSettings';
import { resetUserInfoState } from 'src/reducers/userInfo';
import { useAuth } from 'src/utils/context/LoginAuth';
import { isLoggedIn, logoutUser } from 'src/utils/helpers';
import { VipLevel } from '../../Fragment/VipData';
import { themeColor } from '../themeColor';

import CopyToClipboard from 'react-copy-to-clipboard';
import ReactHtmlParser from 'react-html-parser';
import PullToRefresh from 'react-simple-pull-to-refresh';
import fallbackIcon from 'src/app/assets/commons/ImgWithFallback/onErrorImg.png';
import loadingIcon from 'src/app/assets/commons/ImgWithFallback/square-load2.gif';
import IMG from 'src/commons/ImgWithFallback';
import girlAvatar from '../../../../assets/blackGold/footer/defaultIcon.png';
import eyecon1 from '../../../../assets/blackGold/footer/eye-hide.png';
import eyecon2 from '../../../../assets/blackGold/footer/eye-show.png';
import AlertContainer from '../../../Modal/AlertContainer';
import NoData from '../../../NoData';
import CheckVersionModal from '../../CheckVersionModal/CheckVersionModal';
import ImageAccordionComp from '../../Fragment/ImageAccordion';
import SidetabAccordion from '../../SideTabAccordion/SidetabAccordion';
import Music from '../music';

import styles from './style.module.scss';

const ContentSetting = (props) => {
  const {
    sidetabActive,
    activityTypes,
    omSideActive,
    activityInfoContent,
    activityTypesLists,
    selectedActiTypeId,
    activeQuestSectionInfo,
    activeHomeNoticesId,
    onClose,
    reloadData,
    reloadDataone,
  } = props;
  const auth = useAuth();
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { userData } = useSelector((state) => state.userInfo);
  const { domainName, homeNotices } = useSelector((state) => state.gameData);
  const [copyThisText, setCopyThisText] = useState(false);

  const [questAlert, setQuestAlert] = useState(false);
  const [questAlertMsg, setQuestAlertMsg] = useState();

  const [inputTypeOld, setInputTypeOld] = useState(false);
  const [inputTypeConfirm, setInputTypeConfirm] = useState(false);
  const [inputTypeNewPass, setInputTypeNewPass] = useState(false);

  const [switchedTab, setSwitchedTab] = useState(false);
  const [clicker, setClicker] = useState(0);

  const [oldpass, setoldpass] = useState('');
  const [newpass, setnewpass] = useState('');
  const [confirm, setconfirm] = useState('');

  const [alertMe, setAlertMe] = useState(false);
  const [alertCustom, setAlertCustom] = useState(false);

  const [switchLineAlert, setSwitchLineAlert] = useState(false);
  const [cmvOpen, setCmvOpen] = useState(false);

  const lineSwitch = () => {
    setSwitchLineAlert(true);
    setTimeout(() => setSwitchLineAlert(false), 2500);
  };

  const alertAppear = (whataler) => {
    whataler === 1 ? setAlertMe(true) : setAlertCustom(true);
    setTimeout(() => {
      setAlertMe(false);
      setAlertCustom(false);
    }, 2000);
  };

  useEffect(() => {}, [clicker]);

  const handleSwitched = () => {
    setSwitchedTab(false);
    setClicker(1);
  };

  const getReward = (item) => {
    receiveQuestReward(item)
      .then((res) => {
        setQuestAlert(true);
        setQuestAlertMsg(res.data.msg);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setQuestAlert(false);
      });
  };

  const newSet = () => {
    if (confirm === newpass) {
      if (
        confirm.length >= 8 &&
        newpass.length >= 8 &&
        confirm.length <= 15 &&
        newpass.length <= 15
      ) {
        ResetPassword(oldpass, newpass).then((res) => {
          // console.warn(res.data.msg)
          alert(res.data.msg);
        });
      } else {
        alert('由8-16位数字加字母组成');
      }
    } else {
      alert('新密码与确认密码不匹配');
    }

    document.getElementById('oldpass').value = '';
    document.getElementById('newpass').value = '';
    document.getElementById('newpass2').value = '';
  };

  const handleColorClick = (color) => {
    dispatch(setCurrTheme(color));
    document.getElementById('root').setAttribute('data-theme', color);
  };

  const handleLogoutButton = () => {
    auth?.logout();
    logoutUser();
    onClose();
    dispatch(resetUserInfoState());
    // dispatch(setUserData({}));
    // dispatch(setMails([]));
    dispatch(setShowLoginModal(true));
    localStorage.removeItem('loginNow');
    sessionStorage.removeItem('pass');
    // persistor.pause();
    // persistor.flush().then(() => {
    //   return persistor.purge();
    // });
  };

  const handleReloadOne = async () => {
    setSwitchedTab(true);
    await reloadDataone();
  };

  return (
    <>
      <div className={styles.contentContainer} data-theme={currTheme}>
        {sidetabActive === 1 ? (
          <PullToRefresh onRefresh={handleReloadOne} className={styles.pullToRefresh}>
            <div className={styles.s2photo_container}>
              {activityInfoContent?.length === 0 && (
                <div className={styles.noData}>
                  <NoData />
                </div>
              )}
              <>
                {activityTypes?.map((activityType, index) => {
                  let listToDisplay = activityTypesLists?.find(
                    (list) => list?.id === activityType?.id
                  );
                  return (
                    selectedActiTypeId === activityType?.id && (
                      <ul key={index} style={{ marginTop: '0.045rem' }}>
                        {listToDisplay?.list?.map((activityItem, idx) => {
                          return activityItem?.id === 3 && activityItem?.url ? (
                            <li key={idx} style={{ marginBottom: '0.1rem' }}>
                              <iframe src={activityItem?.url} title='Activity' />
                            </li>
                          ) : (
                            <li key={idx} style={{ marginBottom: '0.1rem' }}>
                              <ImageAccordionComp
                                Switched={switchedTab}
                                handleSwitched={handleSwitched}
                                icon={activityItem.icon}
                                content={activityItem.content}
                                url={activityItem.url}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )
                  );
                })}
              </>
            </div>
          </PullToRefresh>
        ) : sidetabActive === 2 ? (
          <PullToRefresh onRefresh={reloadDataone} className={styles.pullToRefresh}>
            <div className={styles.accordionWrapper}>
              <AlertContainer top={1.8} left={-0.8} alertMe={questAlert} notify={questAlertMsg} />
              {activeQuestSectionInfo?.length > 0 ? (
                activeQuestSectionInfo?.map((activityItem, idx) => (
                  <div
                    key={activityItem?.id + activityItem.title + idx}
                    style={{
                      marginBottom: '0.05rem',
                      width: '100%',
                      marginTop: idx === 0 ? '.12rem' : '',
                    }}
                  >
                    <SidetabAccordion
                      clicker={clicker}
                      Switched={switchedTab}
                      getReward={getReward}
                      handleSwitch={handleSwitched}
                      taskId={activityItem.id}
                      icon={activityItem.icon}
                      title={activityItem.title}
                      myStatus={activityItem.curNum}
                      myTarget={activityItem.target}
                      claim={activityItem.status}
                      reward={activityItem.reward}
                      content={activityItem.content}
                    />
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </PullToRefresh>
        ) : sidetabActive === 3 ? (
          <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
            {homeNotices?.map((homeNotice, idx) => {
              let homeNoticeContentSrc = ReactHtmlParser(homeNotice.content)[0]?.props?.children[0]
                ?.props?.src;
              return (
                activeHomeNoticesId === homeNotice.id && (
                  <div key={idx} className={styles.st_announce}>
                    <div className={styles.homeNoticeContent_Wrapper}>
                      {
                        <div className={styles.homeContent_item}>
                          {homeNoticeContentSrc ? (
                            <IMG
                              fallback={fallbackIcon}
                              loadingIcon={loadingIcon}
                              loading='lazy'
                              src={homeNoticeContentSrc}
                              alt={'fallbackIcon'}
                            />
                          ) : (
                            <>
                              {homeNotice.content === '<p><br></p>' ? (
                                <div
                                  style={{
                                    height: '76%',
                                    marginTop: '0.3rem',
                                  }}
                                >
                                  <NoData />
                                </div>
                              ) : (
                                <span className={styles.contentWithoutImg}>
                                  {ReactHtmlParser(homeNotice.content)}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      }
                    </div>
                  </div>
                )
              );
            })}
          </PullToRefresh>
        ) : sidetabActive === 4 ? (
          <div className={styles.settingModal}>
            {omSideActive === 0 ? (
              <div className={styles.personalInfo} data-theme={currTheme}>
                <div className={styles.basicInfo}>
                  <span className={styles.infoTitle}>基础信息</span>
                </div>
                <AlertContainer
                  alertMe={switchLineAlert}
                  top={2}
                  left={0.9}
                  notify={'没有发现其他域名'}
                  centered
                />
                <div className={styles.basicDetails}>
                  <div className={styles.profilePic}>
                    <img src={isLoggedIn() ? userData?.headImg : girlAvatar} alt='girlAvatar' />
                  </div>
                  <div className={styles.pLabel_container}>
                    <div className={styles.pUserName}>
                      <div
                        className={
                          window.innerWidth <= 1024
                            ? 'wd-15 d-flex al-items'
                            : 'wd-15 d-flex al-items pdt-6'
                        }
                      >
                        <img
                          style={{ width: '0.15rem' }}
                          src={require(`../../../../assets/${currTheme}/footer/setting_user.png`)}
                          alt='setting_user'
                        />
                      </div>
                      <div className='wd-85'>
                        <span>账号:</span>
                        <span className={styles.pLabel_value}>
                          {!userData?.nickName ? '用戶名' : userData.nickName}
                        </span>
                      </div>
                    </div>

                    {process.env.REACT_APP_SITE === '8803' && (
                      <div className={styles.idContainer}>
                        <div className='wd-15'></div>
                        <div className='wd-85'>
                          <span>ID:</span>
                          <span className={styles.pLabel_value}>
                            {!userData?.id ? '用戶名' : userData.id}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className={styles.pVipLvl}>
                      <div className='wd-15'></div>
                      <div className='wd-85'>
                        <span> 等级: </span>
                        <span className={styles.pLabel_value}>
                          <img
                            src={VipLevel[userData?.vip ? userData.vip : 1]?.src}
                            alt='vip level'
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <div className={styles.pButtonContain}>
                    <div className={styles.logoutBtn} onClick={() => handleLogoutButton()}>
                      账号切换
                    </div>
                  </div>
                  <div className={styles.pButtonContain}>
                    <div className={styles.logoutBtn} onClick={() => lineSwitch()}>
                      切换线路
                    </div>
                  </div>
                </div>
              </div>
            ) : omSideActive === 1 ? (
              <div className={styles.sMusicSwitch} data-theme={currTheme}>
                <div className={styles.pBasicInfo}>
                  <span className={styles.infoTitle}>音乐切换</span>
                </div>
                <div className={styles.musicInfo}>
                  <div className={styles.sMusciIcon}>
                    <img
                      src={require(`../../../../assets/${currTheme}/footer/musiCon.png`)}
                      alt='Music Icon'
                    />
                    <span>音乐</span>
                  </div>
                  <div className={styles.sMusicLabel} data-theme={currTheme}>
                    <Music />
                  </div>
                </div>
              </div>
            ) : omSideActive === 2 ? (
              <div className={styles.sChangePass}>
                <div className={styles.changePass_container}>
                  <div className={styles.cpOldPassword}>
                    <span>旧密码:</span>
                    <input
                      type={inputTypeOld ? 'text' : 'password'}
                      name='cpOldpass'
                      id='oldpass'
                      placeholder='请输入旧密码'
                      onChange={(e) => {
                        setoldpass(e.target.value);
                      }}
                      maxLength={16}
                      style={{ marginLeft: '.3rem ' }}
                    />
                    {oldpass && (
                      <img
                        onClick={() => setInputTypeOld(!inputTypeOld)}
                        src={inputTypeOld ? eyecon2 : eyecon1}
                        style={{ marginLeft: '-.25rem' }}
                        alt='Eye Icon'
                      />
                    )}
                  </div>
                  <div className={styles.cpNewPassword}>
                    <span>新密码:</span>
                    <input
                      type={inputTypeConfirm ? 'text' : 'password'}
                      name='cpOldpass'
                      id='newpass'
                      placeholder='请输入新密码'
                      onChange={(e) => {
                        setconfirm(e.target.value);
                      }}
                      maxLength={16}
                      style={{ marginLeft: '.3rem' }}
                    />
                    {confirm && (
                      <img
                        onClick={() => setInputTypeConfirm(!inputTypeConfirm)}
                        src={inputTypeConfirm ? eyecon2 : eyecon1}
                        style={{ marginLeft: '-.25rem' }}
                        alt='Eye Icon'
                      />
                    )}
                  </div>
                  <div className={styles.cpConfirmPassword}>
                    <span>确认密码:</span>
                    <input
                      type={inputTypeNewPass ? 'text' : 'password'}
                      name='cpOldpass'
                      id='newpass2'
                      placeholder='确认新密码'
                      onChange={(e) => {
                        setnewpass(e.target.value);
                      }}
                      maxLength={16}
                    />
                    {newpass && (
                      <img
                        onClick={() => setInputTypeNewPass(!inputTypeNewPass)}
                        src={inputTypeNewPass ? eyecon2 : eyecon1}
                        style={{ marginLeft: '-.25rem' }}
                        alt='Eye Icon'
                      />
                    )}
                  </div>
                  <div className={styles.changePass_buttonContainer}>
                    <div className={styles.cpButton} onClick={newSet}>
                      确认修改
                    </div>
                  </div>
                </div>
              </div>
            ) : omSideActive === 3 ? (
              <>
                <CheckVersionModal cvmOpen={cmvOpen} cmvClose={() => setCmvOpen(false)} />
                <div className={styles.sWebDetails}>
                  <AlertContainer
                    alertMe={alertMe}
                    top={1.6}
                    left={0.75}
                    whatText={domainName}
                    centered
                  />
                  <AlertContainer
                    alertMe={alertCustom}
                    top={1.6}
                    left={0.5}
                    whatText={'https://yb3f68.com/chat...'}
                    centered
                  />
                  <div className={styles.webWrapper}>
                    {/* Switch line: */}
                    <div className={styles.switchContainer}>
                      <div className={styles.switchLabel}>官方网址:</div>
                      <div id='ofValue' className={styles.switchValue}>
                        {domainName}
                      </div>
                      <CopyToClipboard
                        text={domainName}
                        onCopy={() => {
                          setCopyThisText(true);
                          alertAppear(1);
                        }}
                      >
                        <div className={styles.wbButton}>
                          <span>复制</span>
                        </div>
                      </CopyToClipboard>
                    </div>

                    {/* Customer Service Line: */}
                    <div className={styles.customerSLine}>
                      <div className={styles.csl_label}>客服线:</div>
                      <div
                        className={styles.csl_value}
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        https://yb3f68.com/chat/text/chat_1UdkUk.html
                      </div>
                      <CopyToClipboard
                        text={'https://yb3f68.com/chat/text/chat_1UdkUk.html'}
                        onCopy={() => {
                          setCopyThisText(true);
                          alertAppear(0);
                        }}
                      >
                        <div className={styles.wbButton}>
                          <span>复制</span>
                        </div>
                      </CopyToClipboard>
                    </div>

                    {/* Current Version Number: */}
                    <div className={styles.currentVnumber}>
                      <div className={styles.cv_label}>当前版本号:</div>
                      <div className={styles.cv_value}>
                        <span>V {process.env.REACT_APP_VERSION}</span>
                      </div>
                      <div
                        className={styles.wbButton}
                        onClick={() => {
                          dispatch(setShowVersionModal(true));
                        }}
                      >
                        <span>获取版本</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : omSideActive === 4 ? (
              <div className={styles.colorContainer}>
                <div className={styles.colorHeader} data-theme={currTheme}>选择主题</div>
                <div className={styles.colorBody}>
                  {themeColor.map((btn, i) => {
                    return (
                      <div
                        key={i}
                        className={styles.colorOptions}
                        onClick={() => handleColorClick(`${btn.nColor}`)}
                        style={{ background: `${btn.color}` }}
                      >
                        {currTheme === `${btn.nColor}` && <img src={btn.pic} alt='color' />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ContentSetting;
