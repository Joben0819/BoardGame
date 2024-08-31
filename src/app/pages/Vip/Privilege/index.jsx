import { useEffect, useState } from 'react';
import styles from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAccountInfo, receiveVipGift, vipGiftInfo } from 'src/api/game/gamelist';
import AlertContainer from 'src/app/components/Modal/AlertContainer';
import UlbBox from 'src/app/components/VipPageComponents/ulbBox';
import { VipLevel } from 'src/app/data/Vip/VipData';
import { updateBalance } from 'src/reducers/userInfo';
import crown from './../../../assets/commons/icons/crown-icon.png';
import vipLogo from './../../../assets/commons/icons/vipLogo.png';
import dbCrown from './../../../assets/darkBlue/vip/crown.png';
import wgCrown from './../../../assets/whiteGold/vip/crown.png';

export default function Privilege() {
  // const [userData.vip, setuserData.vip] = useState(20);
  const { userData } = useSelector((state) => state.userInfo);
  const [data, setData] = useState([]);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [alertVipGPress, setAlertVipGPress] = useState(false);
  const [alertVipG, setAlertVipG] = useState(false);
  const [alertVipMess, setAlertVipMess] = useState();
  const [vipGiftInfos, setVipGiftInfo] = useState();
  const [currVipInfo, setCurrVipInfo] = useState();
  const expBar = (userData?.codeTotal / (userData?.codeTotal + data?.nextLevelIntegral)) * 100 || 0;
  const dispatch = useDispatch();

  useEffect(() => {
    getAccountInfo().then((res) => {
      setData(res.data.data);
    });
  }, []);

  useEffect(() => {
    getVipGiftInfo();
  }, [userData]);

  const getVipGiftInfo = () => {
    vipGiftInfo().then((res) => {
      if (res.data?.code === 200) {
        const vipSetList = res.data?.data?.vipSetList;
        const curr = vipSetList.find((vip) => vip.level === userData?.vip);
        setCurrVipInfo(curr);
        setVipGiftInfo(res.data?.data);
      }
    });
  };

  function clickHandleGift(num) {
    setAlertVipG(true);
    setAlertVipGPress(true);
    receiveVipGift(num)
      .then((res) => {
        setAlertVipMess(res.data.msg);
      })
      .finally(() => {
        dispatch(updateBalance());
        getVipGiftInfo();
      });
    setTimeout(() => {
      setAlertVipG(false);
      setAlertVipGPress(false);
    }, 1500);
  }

  const nextLevelIntegral = (data) => {
    if (data?.nextLevelIntegral % 1 !== 0) {
      // Check if the number has decimal places
      return data?.nextLevelIntegral?.toFixed(2);
    }
    return data?.nextLevelIntegral;
  };

  // console.log("hiyao", userData.codeTotal + data.nextLevelIntegral, expBar);
  return (
    <div className={styles.container} data-theme={currTheme}>
      <AlertContainer alertMe={alertVipG} notify={alertVipMess} top={2} left={3} />
      <div className={styles.wrapper}>
        <div className={styles.upper_bar}>
          <div className={styles.pUpperBar_wrapper}>
            <div className={styles.uPB_header}>
              <img
                src={
                  currTheme === 'darkBlue' ? dbCrown : currTheme === 'whiteGold' ? wgCrown : crown
                }
                alt='Thene color'
              />{' '}
              <span>当前会员等级</span>
            </div>
            <div style={{ display: 'flex', marginLeft: '0.45rem' }}>
              <div className={styles.mA_img}>
                <img src={vipLogo} alt='Vip Logo' />
              </div>
              <div className={styles.mA_barContainer}>
                <div style={{ marginBottom: '0.05rem' }} className={styles.mA_barContainer_1st}>
                  当前会员等级: VIP {userData ? userData?.vip : '1'}
                </div>
                <div className={styles.mA_barContainer_2nd}>
                  <div className={styles.mA_fromVip}>
                    <img
                      src={userData.vip ? VipLevel[userData.vip].src : VipLevel[1].src}
                      alt='Vip Level'
                    />
                  </div>
                  <div
                    className={styles.mA_inVip}
                    style={{ margin: '0 0.05rem' }}
                    data-theme={currTheme}
                  >
                    <div
                      className={styles.mA_inVipProgress}
                      style={{
                        width: userData ? expBar + '%' : '0%',
                      }}
                      // style={{ width: "0" }}
                    ></div>
                  </div>
                  <div className={styles.mA_toVip}>
                    {/* <img
                      src={
                        userData.vip
                          ? VipLevel[
                              userData.vip < 50 ? userData.vip + 1 : userData.vip
                            ].src
                          : vipLogoL1
                      }
                    /> */}
                    <img
                      src={
                        userData.vip ? VipLevel[userData.vip + 1].src : VipLevel[userData.vip].src
                      }
                      alt='Vip Level'
                    />
                  </div>
                </div>
                <div className={styles.mA_barContainer_3rd}>
                  还差
                  {data ? nextLevelIntegral(data) : 0}
                  打码量升级到VIP{userData ? userData?.vip + 1 : '1'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.lower_bar}>
          <div className={styles.uLB_container}>
            {/* lower heading  */}
            <div className={styles.uLB_header}>
              <div className={styles.uLB_vipLevel_wrapper}>
                <div className={styles.uLB_vipLevel} style={{}}>
                  <span>VIP{userData.vip ? userData.vip : '1'}</span>
                </div>
              </div>
              <div className={styles.uLB_header_title}>我享有的特权</div>
            </div>

            <div className={styles.uLB_boxContainer}>
              <div
                className={styles.ulbBox_container}
                style={
                  {
                    // paddingTop: "0.33rem",
                  }
                }
              >
                <UlbBox
                  handleGift={() => {
                    !alertVipGPress && clickHandleGift(1);
                  }}
                  imagesrc={require('../../../assets/commons/vipImages/advancement_jackpot.png')}
                  title='晋级彩金'
                  yencount={`¥${currVipInfo?.levelBonus.toFixed(2) ?? `0.00`}`}
                  info={vipGiftInfos?.levelBonusStatus === 1 ? '未领取' : '暂不可领取'}
                  color='pink'
                />
                <UlbBox
                  handleGift={() => {
                    !alertVipGPress && clickHandleGift(2);
                  }}
                  imagesrc={require('../../../assets/commons/vipImages/gift_icon.png')}
                  title='周礼金'
                  yencount={`¥${currVipInfo?.weekBonus ?? 0}`}
                  info={vipGiftInfos?.weekBonusStatus === 1 ? '未领取' : '已领取'}
                  color='blue'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
