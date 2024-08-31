import { useEffect, useState } from 'react';
//Section
import ButtonDesignOne from '../../components/Fragments/Buttons/ButtonDesignOne';
import ButtonDesignTwo from '../../components/Fragments/Buttons/ButtonDesignTwo';
import IconLabelContainer from '../../components/IconLabelContainer';
import InputTempOne from '../../components/InputTemp1';
import NoData from '../../components/NoData';
import OtherHeader from '../../components/OtherHeader';
//api
import { boxAccount, boxTransfer, getFundDetails } from 'src/api/game/gamelist';
//router
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataBalance, TransferBalance, updateBalance } from 'src/reducers/userInfo';
//table
import { isLoggedIn } from 'src/utils/helpers';
import { fundDetailsTableData } from '../../components/FundDetailsTableData';
import AlertContainer from '../../components/Modal/AlertContainer';
import { BasicTable } from '../../components/Tables/Basictable';
//Styles
import { Howl } from 'howler';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { popSound } from 'src/utils/audio-player';
import sbSoundFile from './../../data/audioData/vaultact.mp3';
import styles from './index.module.scss';

export default function SafeBox() {
  const takeMe = useNavigate();
  if (!isLoggedIn()) {
    takeMe('/');
  }
  const [vipActive, setvipActive] = useState(1);
  const [activeSection, setactiveSection] = useState('fundTransfer');
  // const [theFinalSafeAmount, setTheFinalSafeAmount] = useState(0);
  const [accountnow, setaccountnow] = useState([]);
  const [boxAccount1, setboxAccount] = useState([]);
  const [accountnow1, setaccountnow1] = useState([]);

  const [safeboxHistoryData, setSafeboxHistoryData] = useState([]);

  const [moneyout, setmoneyout] = useState('');

  const { Intransfer } = useSelector((state) => state.userInfo);
  const { userBalance } = useSelector((state) => state.userInfo);
  const { DataBal } = useSelector((state) => state.userInfo);
  const { currTheme } = useSelector((state) => state.gameSettings);

  const dispatch = useDispatch();

  useEffect(() => {
    boxAccount(sessionStorage.getItem('pass')).then((res) => {
      setaccountnow(res.data.data.accountNow);
      setboxAccount(res.data.data.boxAccount);
    });
  }, []);

  function doChange(sec, soc) {
    setvipActive(sec);
    setactiveSection(soc);
  }
  const [alertSafe, setAlertSafe] = useState(false);
  const [alertSafeMsg, setAlertSafeMsg] = useState('');
  function Money(money) {
    boxTransfer(money).then((res) => {
      setAlertSafe(true);
      setAlertSafeMsg(res.data.msg);
      dispatch(updateBalance());
      dispatch(TransferBalance());
      dispatch(DataBalance());
      setTimeout(() => {
        setAlertSafe(false);
      }, 3000);
    });
  }

  useEffect(() => {
    const sound = new Howl({
      src: [sbSoundFile],
      loop: false,
    });
    sound.play();
  }, []);

  function transferMoney(money) {
    if (activeSection === 'fundTransfer') {
      Money(money);
    } else {
      Money(-money);
    }
  }

  useEffect(() => {
    getFundDetails('SAFE_BOX', 'today').then((res) => {
      setSafeboxHistoryData(res.data.data);
    });
  }, []);
  const [maxAlert, setMaxAlert] = useState(false);
  const [maxMsg, setMaxMsg] = useState('');
  const [maxDisable, setMaxDisable] = useState(false);

  function clickMax() {
    setMaxAlert(true);
    setMaxMsg('成功运作');
    setMaxDisable(true);
    setTimeout(() => {
      setMaxAlert(false);
      setMaxMsg('成功运作');
      setMaxDisable(false);
    }, 2500);
  }

  const reloadData = async () => {
    getFundDetails('SAFE_BOX', 'today').then((res) => {
      setSafeboxHistoryData(res.data.data);
    });
  };

  useEffect(() => {}, [accountnow1]);

  function Value2() {
    boxAccount(sessionStorage.getItem('pass')).then((res) => {
      setaccountnow(res.data.data.accountNow);
      setboxAccount(res.data.data.boxAccount);
    });
    if (accountnow1 === accountnow) {
      // console.warn("hello")
      return accountnow1;
    } else if (accountnow1 === boxAccount1) {
      // console.warn("hi")
      return accountnow1;
    } else {
      return moneyout;
    }
  }
  return (
    isLoggedIn() && (
      <div className={styles.main}>
        <OtherHeader title='保险箱' />
        <div className={styles.Safebox} data-theme={currTheme}>
          <AlertContainer top={2.8} left={4.2} alertMe={alertSafe} notify={alertSafeMsg} centered />
          <AlertContainer top={2.8} left={4.4} alertMe={maxAlert} notify={maxMsg} centered />
          <div className={styles.pc_sidebar2}>
            <ul>
              <li
                className={vipActive === 1 ? styles.vipSelect_one : ''}
                onClick={() => {
                  doChange(1, 'fundTransfer');
                  popSound();
                }}
              >
                <span className={styles.vip_sectionTitle}>资金转入</span>
                <img
                  className='vipDivider wd-100'
                  src={require(`../../assets/${currTheme}/safeBox/divider.png`)}
                  alt='Divider'
                />
              </li>

              {/* 2nd Entry */}
              <li
                className={vipActive === 2 ? styles.vipSelect_one : ''}
                onClick={() => {
                  popSound();
                  doChange(2, 'fundWithdraw');
                }}
              >
                <span className='vip_sectionTitle fonder'>资金取出</span>
                <img
                  className='vipDivider wd-100'
                  src={require(`../../assets/${currTheme}/safeBox/divider.png`)}
                  alt='Vip Divider'
                />
              </li>

              {/* 3rd Entry */}
              <li
                className={vipActive === 3 ? styles.vipSelect_one : ''}
                onClick={() => {
                  popSound();
                  doChange(3, 'fundDetails');
                }}
              >
                <span className='vip_sectionTitle fonder'>互转明细</span>
                <img
                  className='vipDivider wd-100'
                  src={require(`../../assets/${currTheme}/safeBox/divider.png`)}
                  alt='Vip Divider'
                />
              </li>
            </ul>
          </div>
          <div className={styles.pc_mainContent}>
            {activeSection === 'fundTransfer' || activeSection === 'fundWithdraw' ? (
              <>
                <div className={styles.fundTransfer_wrapper}>
                  <div className={styles.ft_1stBox}>
                    <div className={styles.ft_1stlabelContainer}>
                      <IconLabelContainer
                        imgsrc={require(`../../assets/${currTheme}/safeBox/gameWalletIcon.png`)}
                        label='钱包余额(元)'
                        amount={userBalance}
                      />
                    </div>
                    <div className={styles.ft_2ndlabelContainer}>
                      <div className={styles.circleTransferContainer}>
                        <img
                          src={
                            activeSection === 'fundTransfer'
                              ? require(`../../assets/${currTheme}/safeBox/transferToIcon.png`)
                              : require(`../../assets/${currTheme}/safeBox/transferFromIcon.png`)
                          }
                          alt='Transfer Icon'
                        />
                      </div>
                    </div>
                    <div className={styles.ft_3rdlabelContainer}>
                      <IconLabelContainer
                        imgsrc={require(`../../assets/${currTheme}/safeBox/GreenSumthing.png`)}
                        label='保险箱余额(元)'
                        amount={!Intransfer || Intransfer === 0 ? boxAccount1 : Intransfer}
                      />
                    </div>
                  </div>
                  <div className={styles.ft_2ndBox}>
                    <div className={styles.add}>
                      <div className={styles.ft2_yellowtext}>转出金额</div>
                      <div className={styles.inputTempHolder}>
                        <div
                          className=' d-flex wd-70'
                          onClick={() => {
                            setmoneyout('');
                            setaccountnow1('');
                          }}
                        >
                          <InputTempOne
                            id='withdrawin'
                            label=''
                            placeholder='请输入转出金额'
                            width={4.2}
                            onChangeText={(e) => setmoneyout(e.target.value)}
                            value={Value2()}
                            typenum='number'
                          />
                        </div>
                        <div className='wd-14 hg-100 just-space-cent d-flex al-items'>
                          <ButtonDesignOne
                            buttonName='最大金额'
                            color='#ffffff'
                            white={true}
                            margin={0}
                            padding={'0 0 0.01rem 0'}
                            bgColor='linear-gradient(180deg, #11D38A 0%, #018B57 100%)'
                            bbottom='none'
                            height={0.3}
                            clickMe={() => {
                              if (activeSection === 'fundTransfer') {
                                if (!maxDisable) {
                                  clickMax();
                                  setaccountnow1(userBalance);
                                }
                              } else {
                                if (!maxDisable) {
                                  clickMax();
                                  setaccountnow1(Intransfer);
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.ft2_buttonOutside}>
                      <ButtonDesignTwo
                        buttonName={activeSection === 'fundTransfer' ? '转入' : '转出'}
                        textColor='white'
                        fwm={700}
                        width={1}
                        fs={0.18}
                        padding={0.03}
                        margin={0}
                        bgColor='#11D38A'
                        bbottom='none'
                        height={0.35}
                        clickMe={() => {
                          transferMoney(Value2());
                          setaccountnow1('');
                          setmoneyout('');
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : activeSection === 'fundDetails' ? (
              <div className={styles.fundDetails_wrapper}>
                <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
                  <div className={styles.fd_headerPart}></div>
                  {DataBal.length !== 0 ? (
                    <div className={styles.funDetailsHistoryTable} data-theme={currTheme}>
                      <BasicTable basicData={DataBal} headerData={fundDetailsTableData} />
                    </div>
                  ) : (
                    <div className={styles.funDetailsHistoryTable}>
                      <BasicTable basicData={[]} headerData={fundDetailsTableData} />
                      <div className={styles.noDataWrapper}>
                        <NoData />
                      </div>
                    </div>
                  )}{' '}
                </PullToRefresh>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
  );
}
