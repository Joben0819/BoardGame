import { useEffect, useState } from 'react';
import { getRecommendDesc, receiveRecommendReward } from 'src/api/game/gamelist';
import DetailInputBox from 'src/app/components/DetailsInputBox';
import AlertContainer from 'src/app/components/Modal/AlertContainer';

import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PromoteModal from 'src/app/components/PromoteModal';
import MyPromotionLowerBoxes from 'src/app/components/PromotionLowerBoxes';
import { popSound } from 'src/utils/audio-player';
import Fouricon from './../../../assets/commons/icons/promotionIcons/FourIcon.png';
import Oneicon from './../../../assets/commons/icons/promotionIcons/OneIcon.png';
import Threeicon from './../../../assets/commons/icons/promotionIcons/ThreeIcon.png';
import Twoicon from './../../../assets/commons/icons/promotionIcons/TwoIcon.png';
import styles from './index.module.scss';

export default function MyPromotion({ recommendDetailData, updateRecommendDetail }) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [promoAlert, setPromoAlert] = useState(false);
  const [receiveComm, setRecieveComm] = useState(false);
  const [notifyMes, setNotifyMessage] = useState('');
  const [commissionAlert, setCommissionAlert] = useState(false);
  const [openCommissionBox, setOpenCommissionBox] = useState(false);
  const [CommissionTableData, setCommissionTableData] = useState([]);
  const takeMe = useNavigate();
  let updateDetailDelay = null;

  const gotoShareBackground = (image, shareId) => {
    takeMe('/Share', {
      state: { page: 'sharePage', imageBackground: image, shareId: shareId },
    });
  };

  useEffect(() => {
    getRecommendDesc().then((res) => {
      setCommissionTableData(res.data.data);
    });

    return () => {
      updateDetailDelay && clearTimeout(updateDetailDelay);
    };
  }, []);

  const handleSuccessReward = () => {
    setNotifyMessage('操作成功');
    updateDetailDelay.setTimeout(updateRecommendDetail, 1200);
  };

  function AlertDelay(a) {
    if (a === 1) {
      setCommissionAlert(true);
      setTimeout(function () {
        setCommissionAlert(false);
      }, 1500);
    } else {
      setPromoAlert(true);
      setTimeout(function () {
        setPromoAlert(false);
        setCommissionAlert(false);
      }, 1500);
    }
  }

  const getInviterCode = () => {
    const channelCode = localStorage.getItem('channelCode');
    if (channelCode) {
      return channelCode;
    }
    return '1001';
  };

  return (
    <>
      <div className={styles.container} data-theme={currTheme}>
        {' '}
        <PromoteModal
          promoteOpen={openCommissionBox}
          basicData={CommissionTableData}
          backDrop={() => setOpenCommissionBox(false)}
        />
        {/* <div className="myPromotion_wrapper"> */}
        <AlertContainer
          alertMe={promoAlert}
          heigth={0.2}
          link={true}
          top={0.5}
          left={2}
          notify={receiveComm ? notifyMes : false}
          whatText={recommendDetailData ? recommendDetailData.url : 'example.com'}
        />
        <AlertContainer
          top={1.3}
          left={2.8}
          alertMe={commissionAlert}
          heigth={0.2}
          notify={notifyMes}
        />
        {/* <div className={styles.myPromotion}> */}
        {/* This is the Upper Section of the Promotion */}
        <div className={styles.myPromotion_inputUpperBox}>
          <div className={styles.myPromotion_header}>
            <div className={styles.myPromotion_titleHolder}>我的佣金</div>
            <div
              onClick={() => {
                popSound();
                setOpenCommissionBox(true);
              }}
              className={styles.myPromotion_goNext}
            >
              <span style={{ marginRight: '0rem', marginTop: '0rem' }}>返佣金额对照表</span>
              <div
                style={{ display: 'flex', marginRight: '.1rem', alignItems: 'center' }}
                className='great'
              >
                &gt;&gt;
              </div>
            </div>
          </div>

          <div className={styles.myPromotionBody}>
            <div className={styles.myPromotion_detailsInputContainer}>
              {/* The first column container */}
              <div className={styles.detailsInputContainer_first}>
                <ul>
                  <li>
                    <DetailInputBox //Today's Commission
                      icon={Oneicon}
                      label='今日佣金'
                      wClass='detailInput'
                      placeholder={parseFloat(
                        recommendDetailData.todaySion ? recommendDetailData.todaySion : '0.00'
                      ).toFixed(2)}
                      disable={true}
                    />
                  </li>
                  <li>
                    <DetailInputBox
                      icon={Twoicon} // Historical Comission
                      label='历史总佣金'
                      wClass='detailInput'
                      placeholder={parseFloat(
                        recommendDetailData.historySion ? recommendDetailData.historySion : '0.00'
                      ).toFixed(2)}
                      disable={true}
                    />
                  </li>
                </ul>
              </div>
              {/* the Second column Container */}
              <div className={styles.detailsInputContainer_second}>
                <ul>
                  <li>
                    <DetailInputBox //yesterday
                      icon={Threeicon}
                      label='昨日佣金 '
                      wClass='detailInput'
                      placeholder={parseFloat(
                        recommendDetailData.yesterdaySion
                          ? recommendDetailData.yesterdaySion
                          : '0.00'
                      ).toFixed(2)}
                      disable={true}
                    />
                  </li>
                  <li>
                    <DetailInputBox //can withdraw
                      icon={Fouricon}
                      label='可提取佣金'
                      wClass='detailInput'
                      placeholder={parseFloat(
                        recommendDetailData.canSion ? recommendDetailData.canSion : '0.00'
                      ).toFixed(2)}
                      disable={true}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={styles.myPromotion_lowerAdditionals}
              style={{
                // marginLeft: "40%" ,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => {
                  popSound();
                  setRecieveComm(true);
                  // setCommissionAlert(!commissionAlert);
                  AlertDelay(1);
                  if (recommendDetailData?.canSion !== 0) {
                    receiveRecommendReward()
                      .then((res) => {
                        if (res.code === 200) {
                          handleSuccessReward();
                        } else {
                          alert(res.msg);
                        }
                      })
                      .catch((err) => alert(err.msg));
                  } else {
                    setNotifyMessage('暂无可领取的佣金');
                  }
                }}
              >
                领取佣金
              </button>
            </div>
          </div>
        </div>
        {/* This is the lower Section of the Promotion */}
        <div className={styles.myPromotion_inputLowerBox}>
          <div className={styles.myPromotion_lowerDetails}>
            <ul>
              <li style={{ width: '44%' }}>
                <MyPromotionLowerBoxes
                  yellow={recommendDetailData ? recommendDetailData.memberCode : '0'}
                  white='我的ID'
                />
              </li>
              <li style={{ width: '44%' }}>
                <MyPromotionLowerBoxes
                  yellow={
                    recommendDetailData?.inviterCode
                      ? recommendDetailData.inviterCode
                      : getInviterCode()
                  }
                  white='推荐ID'
                />
              </li>
            </ul>
          </div>

          <div
            className={styles.myPromotion_lowerAdditionals}
            style={{
              marginTop: '0.2rem',
              // marginLeft: "0.45rem"
            }}
          >
            <button
              onClick={() => {
                gotoShareBackground(
                  recommendDetailData.shareBackground,
                  recommendDetailData.memberCode
                );
                popSound();
              }}
            >
              分享二维码
            </button>

            <div className={styles.lowerAdditionals_urlHolder}>
              专属分享连接:
              <span>{recommendDetailData ? recommendDetailData.url : 'www.example.com'}</span>
            </div>

            <div className={styles.lowerAdditionals_linkHolder}>
              <CopyToClipboard
                text={recommendDetailData ? recommendDetailData.url : 'Copied'}
                onCopy={() => {
                  popSound();
                  // setPromoAlert(!promoAlert);
                  AlertDelay();
                }}
              >
                <div className={styles.linkHolder_linkbox}>
                  <div className={styles.linkbox_link}>复制</div>
                </div>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
}
