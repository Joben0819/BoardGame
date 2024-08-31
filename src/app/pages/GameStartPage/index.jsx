import { useEffect, useState } from 'react';
import ButtonDesignOne from 'src/app/components/Fragments/Buttons/ButtonDesignOne';
import StyleLabeled1 from 'src/app/components/Fragments/Labels/StyleLabeledOne';
import OtherHeader from 'src/app/components/OtherHeader';
import { useAuth } from 'src/utils/context/LoginAuth';

//Dices
import DiceFive from 'src/app/assets/commons/DiceImages/DiceFive.png';
import DiceFour from 'src/app/assets/commons/DiceImages/DiceFour.png';
import DiceOne from 'src/app/assets/commons/DiceImages/DiceOne.png';
import DiceSix from 'src/app/assets/commons/DiceImages/DiceSix.png';
import DiceThree from 'src/app/assets/commons/DiceImages/DiceThree.png';
import DiceTwo from 'src/app/assets/commons/DiceImages/DiceTwo.png';
import LotteryDice from 'src/app/components/Fragments/GameAssets/LotteryDice';
import PaymentRoundedContent from 'src/app/components/Fragments/PaymentRoundedContent';

//baccarat Cards
import { useNavigate, useParams } from 'react-router-dom';
import { lotteryInit } from 'src/api/game/gamelist';
import musicCon from 'src/app/assets/commons/baccarat/musicCon.png';
import noSound from 'src/app/assets/commons/baccarat/noSound.png';
import Baccarat from 'src/app/components/Game/Baccarat';
import GameLeftModal from 'src/app/components/Game/GameLeftModal';
import GameRightModal from 'src/app/components/Game/GameRightModal';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Howl } from 'howler';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch, useSelector } from 'react-redux';
import { cardsData } from 'src/app/components/Game/Baccarat/components/CardsSection/data';
import {
  resetContainers,
  setCardsResult,
  setHasBet,
  setRevealCards,
  storeOthersChips,
} from 'src/reducers/baccarat';
import { setBaccaratChipSound } from 'src/reducers/gameSettings';
import { popSound } from 'src/utils/audio-player';
import { isIOS, isLoggedIn, isMac, isWindows } from 'src/utils/helpers';
import useGameWebSocket from 'src/utils/hooks/useGameWebSocket';
import { chips } from '../../components/Game/Baccarat/components/ChipSection/data';
import baccaratResultsAudio from '../../data/audioData/bjl_end_bet.mp3';
import baccaratStartBetAudio from '../../data/audioData/bjl_start_bet.mp3';
import coinsAudio from '../../data/audioData/kaijiang.mp3';
import soundFile from './../../data/audioData/lottery.mp3';
import styles from './index.module.scss';

function GameStartPage() {
  const auth = useAuth();
  const takeMe = useNavigate();
  if (!isLoggedIn()) {
    takeMe('/');
  }
  // const lottery = useLocation();
  // const { lotteryId } = lottery.state;
  let { lotteryId } = useParams();
  lotteryId = Number(lotteryId);
  const [activeFooterSelect, setActiveFooterSelect] = useState(1);
  const [gameStatus, setGameStatus] = useState();
  const dispatch = useDispatch();
  const [timeRepeater, setTimeRepeater] = useState(0);
  const { baccaratChipSound, showQuitDialog } = useSelector((state) => state.gameSettings);
  const { othersChipsPerContainers } = useSelector((state) => state.baccarat);
  const { userData } = useSelector((state) => state.userInfo);
  const baccaratStartBet = new Howl({ src: [baccaratStartBetAudio] });
  const baccaratResults = new Howl({ src: [baccaratResultsAudio] });
  const coinsFx = new Howl({ src: [coinsAudio] });

  let delayCoinFx;

  const handleWebSocketMessage = (data) => {
    const rollSpaceEl = document.getElementById('rollSpace');

    //baccarat logics
    if (lotteryId === 2001) {
      if (data.act === 1) {
        baccaratStartBet && baccaratStartBet.play();
        setTimeRepeater((prevState) => prevState + 1);
        dispatch(setHasBet(false));
        dispatch(resetContainers());
        dispatch(setRevealCards(false));
      }
      if (data.act === 2) {
        let isOtherPlayers = data.data?.userId !== userData?.id;
        if (isOtherPlayers) {
          let randomX = `${
            (Math.ceil(Math.random() * rollSpaceEl?.offsetWidth - 100) / 260) *
            (Math.round(Math.random()) ? 1 : -1)
          }rem`;
          let randomY = `${
            (Math.ceil(Math.random() * rollSpaceEl?.offsetHeight - 100) / 270) *
            (Math.round(Math.random()) ? 1 : -1)
          }rem`;
          const chipsDetails = chips.find((item) => item.value === data.data?.betInfo?.per_price);
          const bet_select = data.data?.betInfo?.bet_select;
          const chip = { ...chipsDetails, x: randomX, y: randomY };
          dispatch(storeOthersChips({ bet_select, chip }));
        }
      }
      if (data.act === 4) {
        delayCoinFx = setTimeout(() => {
          coinsFx && coinsFx.play();
        }, 1800);
        baccaratResults && baccaratResults.play();
        dispatch(setCardsResult(data.data));
        dispatch(setRevealCards(true));
        setCodeJustSplit(data?.data?.analyse.split(','));
      }
    } else {
      if (data.act === 1) {
        setTimeRepeater((prevState) => prevState + 1);
      }
      if (data.act === 4) {
        setCodeJustSplit(data?.data?.code.split(' '));
      }
    }
  };

  const [isConnected, disconnect] = useGameWebSocket(lotteryId, (message) => {
    handleWebSocketMessage(message);
  });

  useEffect(() => {
    return () => {
      clearTimeout(delayCoinFx);
    };
  }, []);

  //for opening the game information
  const [openGameInfo, setOpenGameInfo] = useState(false);
  const [openGameDetail, setOpenGameDetail] = useState(false);

  //ActiveDice Header in Content Area
  const [activeDiceHeader, setActiveDiceHeader] = useState(0);

  //Active Dice Content circle
  const [activeDiceContentCircle, setActiveDiceContentCircle] = useState(1);

  // variables for the lottery init api
  const [lotteryBaseData, setLotteryBaseData] = useState([]);
  const [lotteryIssueVO, setLotteryIssueVO] = useState([]);
  const [lotteryMethodData, setLotteryMethodData] = useState([]);

  const [codeJustSplit, setCodeJustSplit] = useState([]);
  const [getTheOdds, setTheOdds] = useState();
  const [myTime, setMyTime] = useState();

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    if (lotteryId !== 2001) {
      const sound = new Howl({
        src: [soundFile],
        loop: false,
      });
      sound.play();
    }
  }, []);

  function gotoRecharge() {
    // takeMe("/InternalSidebarPage", {
    //   state: { page: "recharge", sideActive: 1 },
    // });
    takeMe('/Recharge');
  }

  useEffect(() => {
    if (lotteryId === 2001) {
      setGameStatus('baccarat');
    } else {
      setGameStatus('lotteryDice');
    }
  }, [lotteryId]);

  //calling the lottery init api to start the lottery game
  useEffect(() => {
    lotteryInit(lotteryId).then((res) => {
      setLotteryMethodData(res.data.data?.methods);
      setLotteryIssueVO(res.data.data?.issuevo);
      setMyTime(res.data.data?.issuevo.countdown);
      setLotteryBaseData(res.data.data?.base);
      setLotteryMethodGame(res.data.data?.methods[0].games);
      if (lotteryId === 2001) {
        setCodeJustSplit(res.data.data?.issuevo.codeJust.split(','));
      } else setCodeJustSplit(res.data.data?.issuevo.codeJust.split(' '));
    });
  }, [lotteryId]);

  const [lotteryMethodGame, setLotteryMethodGame] = useState([]);

  //betting Game
  const [prepLotteryId, setPrepLotteryId] = useState(lotteryId);
  const [prepMethodId, setPrepMethodId] = useState();
  const [prepChipsLeft, setPrepChipsLeft] = useState([]);
  const [prepChipsMiddle, setPrepChipsMiddle] = useState([]);
  const [prepChipsRight, setPrepChipsRight] = useState([]);

  const [prepBetAmount, setPrepBetAmount] = useState(2);

  // useEffect(() => {
  //   console.log(
  //     "this are needed",
  //     prepLotteryId,
  //     prepMethodId,
  //     prepChipsLeft,
  //     prepChipsMiddle,
  //     prepChipsRight,
  //     prepBetAmount
  //   );
  // }, [
  //   prepLotteryId,
  //   prepMethodId,
  //   prepChipsLeft,
  //   prepChipsMiddle,
  //   prepChipsRight,
  //   prepBetAmount,
  // ]);

  function handleGlow(item) {
    if (activeDiceHeader === 0) {
      setPrepChipsLeft((prevState) => {
        let duplicate = prevState.find((x) => x.id === item.id);
        if (!duplicate)
          return [
            ...prevState,
            {
              id: item.id,
              info: item.info,
              odd: item.odds,
            },
          ];
        else {
          return prevState.filter((x) => x.id !== item.id);
        }
      });
    }
    if (activeDiceHeader === 1) {
      setPrepChipsMiddle((prevState) => {
        let duplicate = prevState.find((x) => x.id === item.id);
        if (!duplicate)
          return [
            ...prevState,
            {
              id: item.id,
              info: item.info,
              odd: item.odds,
            },
          ];
        else {
          return prevState.filter((x) => x.id !== item.id);
        }
      });
    }
    if (activeDiceHeader === 2) {
      setPrepChipsRight((prevState) => {
        let duplicate = prevState.find((x) => x.id === item.id);
        if (!duplicate)
          return [
            ...prevState,
            {
              id: item.id,
              info: item.info,
              odd: item.odds,
            },
          ];
        else {
          return prevState.filter((x) => x.id !== item.id);
        }
      });
    }
  }

  const [currIssue, setCurrIssue] = useState();
  useEffect(() => {
    lotteryInit(lotteryId).then((res) => {
      setMyTime(res.data.data.issuevo.countdown);
      setCurrIssue(res.data.data.issuevo.issue);
      setPrepMethodId(res.data?.data?.methods[0]?.id);
    });
  }, []);

  useEffect(() => {
    let requestLotteryInitTimer;
    let requestLotteryInitInterval;

    if (myTime === 60) {
      requestLotteryInitInterval = setInterval(() => {
        lotteryInit(lotteryId).then((res) => {
          setMyTime(res.data.data?.issuevo.countdown);
        });
      }, 30000);
    } else {
      requestLotteryInitTimer = setTimeout(() => {
        lotteryInit(lotteryId).then((res) => {
          setMyTime(res.data.data?.issuevo.countdown);
        });
      }, myTime * 1000);
    }

    return () => {
      clearTimeout(requestLotteryInitTimer);
      clearInterval(requestLotteryInitInterval);
    };
  }, [myTime]);

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime - 10;
    const extraSeconds = remainingTime;
    if (remainingTime === 0) {
      return (
        <div className='timer' style={{ fontSize: '0.1rem' }}>
          <span>停止下注</span>
        </div>
      );
    }
    return (
      <div className='timer'>
        <div className='value'>{`00:${
          remainingTime >= 11 && String(seconds)?.length === 1 ? 0 : ''
        }${remainingTime <= 10 && String(remainingTime)?.length === 1 ? 0 : ''}${
          remainingTime >= 11 ? seconds : extraSeconds
        }`}</div>
      </div>
    );
  };

  useEffect(() => {
    if (myTime === 0) {
      prepChipsLeft.map((bet) => {
        return handleGlow(bet);
      });
      prepChipsMiddle.map((bet) => {
        return handleGlow(bet);
      });
      prepChipsRight.map((bet) => {
        return handleGlow(bet);
      });
    }
  }, [myTime]);

  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    lotteryId && (
      <>
        <GameLeftModal
          codeJustSplit={codeJustSplit}
          lotteryId={lotteryId}
          openInfo={openGameInfo}
          closeInfo={() => setOpenGameInfo(false)}
          timeRepeater={timeRepeater}
        />
        <GameRightModal
          currIssue={currIssue}
          myTime={myTime}
          timeRepeater={timeRepeater}
          activeHeader={activeDiceHeader}
          handleRemove={handleGlow}
          betOdds={getTheOdds}
          prepChips={
            activeDiceHeader === 0
              ? prepChipsLeft
              : activeDiceHeader === 1
              ? prepChipsMiddle
              : prepChipsRight
          }
          prepAmount={prepBetAmount}
          prepLotteryId={lotteryId}
          prepBetAmount={prepBetAmount}
          openInfo={openGameDetail}
          closeInfo={() => setOpenGameDetail(false)}
          prepMethodId={prepMethodId}
        />
        <div className={styles.gameStart_mainWrapper} data-theme={currTheme}>
          {/* This is the header part */}
          <div className={styles.gsp_headerContainer}>
            <OtherHeader
              accountNow={auth?.user?.accountNow}
              title={lotteryBaseData.name}
              absol='absolute'
            />
          </div>
          <div
            className={styles.gameStart_mainContentWrapper}
            style={{
              zIndex: showQuitDialog && !isMac() && !isWindows() && isIOS() ? '-1' : '1',
            }}
          >
            {/* This is the content on the left side of the screen */}
            <div className={styles.gameStart_leftMainContent}>
              <div className={styles.endoPeriod_container}>
                <div className={styles.endoPeriodLabelCont}>
                  <StyleLabeled1
                    style1={true}
                    labelName='本期截止'
                    fw={700}
                    fs={0.15}
                    align='right'
                  />
                </div>
                <div className='endoPeriod_countdownContainer'>
                  <div className={styles.countdownCircleCont}>
                    {myTime && (
                      <CountdownCircleTimer
                        key={timeRepeater}
                        isPlaying={true}
                        duration={60}
                        initialRemainingTime={myTime}
                        colors={'#FFBA01'}
                        rotation='counterclockwise'
                        onComplete={() => [false, 1000]}
                        strokeWidth={10}
                        trailColor={currTheme === 'darkBlue' ? '#000' : '#fff'}
                      >
                        {renderTime}
                      </CountdownCircleTimer>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.currentPeriod_section} style={{ marginTop: '0.1rem' }}>
                <div className={styles.currentPeriod_labelContainer}>
                  <StyleLabeled1 labelName='本期期数' fw={700} fs={0.15} align='center' />
                </div>
                <div className={styles.currentPeriod_dateContainer}>
                  <div className={styles.cp_dateRectangle}>
                    <div className={styles.cp_dateValue}>
                      {lotteryIssueVO ? lotteryIssueVO.issue : '20230301-1289'}
                    </div>
                  </div>
                  {/* <div className="madeMyHorizontalDivider"></div> */}
                </div>
              </div>
              <div className={styles.previousResultContainer} style={{ marginTop: '0.1rem' }}>
                <div className={styles.previousResultLabelContainer}>
                  <StyleLabeled1 labelName='上期结果' fw={700} fs={0.15} align='center' />
                </div>

                <div className={styles.previousResultDiceContaineer}>
                  <div className={styles.previousDiceContainer}>
                    {lotteryId === 1002 ? (
                      codeJustSplit.map((DiceNum, idx) => {
                        return (
                          <img
                            key={DiceNum + idx}
                            alt='dice'
                            src={
                              parseInt(DiceNum) === 1
                                ? DiceOne
                                : parseInt(DiceNum) === 2
                                ? DiceTwo
                                : parseInt(DiceNum) === 3
                                ? DiceThree
                                : parseInt(DiceNum) === 4
                                ? DiceFour
                                : parseInt(DiceNum) === 5
                                ? DiceFive
                                : parseInt(DiceNum) === 6
                                ? DiceSix
                                : ''
                            }
                            style={{
                              width: '.4rem',
                              height: '.4rem',
                              margin: '0.1rem .05rem',
                            }}
                          />
                        );
                      })
                    ) : lotteryId === 1003 ? (
                      <Swiper slidesPerView={4} spaceBetween={1}>
                        {codeJustSplit.map((Num, idx) => {
                          return (
                            <SwiperSlide key={Num + idx}>
                              <div
                                style={{
                                  width: '.3rem',
                                  fontSize: '.15rem',
                                  fontWeight: '700',
                                  margin: '0.15rem 0.02rem  ',
                                  padding: '0.05rem',
                                  letterSpacing: '-0.01rem',
                                  height: '.3rem',
                                  color: 'white',
                                  background:
                                    parseInt(Num) === 1
                                      ? '#FBC000'
                                      : parseInt(Num) === 2
                                      ? '#048DFF'
                                      : parseInt(Num) === 3
                                      ? '#4D4D4D'
                                      : parseInt(Num) === 4
                                      ? '#FD790D'
                                      : parseInt(Num) === 5
                                      ? '#01DAED'
                                      : parseInt(Num) === 6
                                      ? '#4E02FB'
                                      : parseInt(Num) === 7
                                      ? '#ABABAB'
                                      : parseInt(Num) === 8
                                      ? '#E10602'
                                      : parseInt(Num) === 9
                                      ? '#7B080B'
                                      : parseInt(Num) === 10
                                      ? '#2EC504'
                                      : '',
                                  textAlign: 'center',
                                  display: 'inline-block',
                                  marginLeft: '0.02rem',
                                }}
                              >
                                <span className={styles.importWhite}>{Num} </span>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    ) : lotteryId === 1005 || lotteryId === 1001 ? (
                      codeJustSplit.map((num, idx) => {
                        return (
                          <div key={num + idx} style={{ width: '3rem', display: 'flex' }}>
                            <div className={styles.lotteryChipsImage}>{num}</div>
                          </div>
                        );
                      })
                    ) : lotteryId === 1004 ? (
                      <Swiper slidesPerView={4} spaceBetween={1}>
                        {codeJustSplit.map((num, index, arr) => {
                          if (arr?.length - 1 === index) {
                            return (
                              <div key={num + index}>
                                <SwiperSlide>
                                  <span
                                    style={{
                                      fontSize: '.4rem',
                                      color: '#FFFFFF60',
                                      marginLeft: '-0.05rem',
                                      paddingTop: '0.1rem',
                                    }}
                                  >
                                    +
                                  </span>
                                </SwiperSlide>
                                <SwiperSlide>
                                  <div
                                    style={{
                                      display: 'inline-block',
                                      marginTop: '0.05rem',
                                      marginLeft: '-0.12rem',
                                    }}
                                  >
                                    <div className={styles.lotteryChipsImage}>{num}</div>
                                  </div>
                                </SwiperSlide>
                              </div>
                            );
                          } else {
                            return (
                              <>
                                <SwiperSlide>
                                  <div
                                    style={{
                                      display: 'inline-block',
                                      marginTop: '0.05rem',
                                    }}
                                  >
                                    <div className={styles.lotteryChipsImage}>{num}</div>
                                  </div>
                                </SwiperSlide>
                              </>
                            );
                          }
                        })}
                      </Swiper>
                    ) : lotteryId === 2001 ? (
                      <>
                        {codeJustSplit.map((code, index) => {
                          return (
                            <div key={code + index}>
                              <img
                                src={cardsData[codeJustSplit[index]].src}
                                alt=''
                                style={{
                                  width: '0.35rem',
                                  margin:
                                    codeJustSplit?.length === 3
                                      ? '0.05rem 0.07rem'
                                      : '0.05rem 0.2rem',
                                }}
                              ></img>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: '0.1rem' }} className='d-flex'>
                  {gameStatus === 'baccarat' ? (
                    <div style={{ display: 'inline-block', width: '.2rem' }}>
                      <img
                        src={baccaratChipSound ? musicCon : noSound}
                        alt='music'
                        style={{ width: '0.2rem' }}
                        onClick={() => dispatch(setBaccaratChipSound(!baccaratChipSound))}
                      ></img>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className={styles.opf_historyButton}
                    onClick={() => setOpenGameInfo(true)}
                    style={{
                      display: gameStatus === 'baccarat' ? 'inline-block' : '',
                      width: gameStatus === 'baccarat' ? '.5rem' : '1.6rem',
                      marginLeft: gameStatus === 'baccarat' ? '0.5rem' : '-0.01rem',
                    }}
                  >
                    <StyleLabeled1
                      labelName='更多&gt;&gt;'
                      fw={700}
                      fs={0.13}
                      align='left'
                      letters='-.02rem'
                    />
                  </div>
                </div>
                {/* <div className="madeMyHorizontalDivider"></div> */}
              </div>
              <div className={styles.onePointFast_historyContainer}>
                <div
                  onClick={gotoRecharge}
                  className={styles.opf_rechargeButton}
                  style={
                    {
                      //   marginTop: gameStatus === "baccarat" ? "0.38rem" : "",
                    }
                  }
                >
                  <ButtonDesignOne
                    width={1}
                    margin={0.1}
                    padding={0.03}
                    buttonName='充值'
                    height={0.25}
                    bgColor={'linear-gradient(180deg, #ffe800, #e38c00)'}
                  />
                </div>
              </div>
            </div>

            {gameStatus === 'lotteryDice' ? (
              <>
                {/* This is the Content on the right of the screen */}
                <div className={styles.gameStart_rightMainContent}>
                  <div className={styles.lotteryDice_mainWrapper}>
                    <div className={styles.lotteryDiceSelectHeader}>
                      <ul>
                        {lotteryMethodData.map((method, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                popSound();
                                setLotteryMethodGame(method.games);
                                setActiveDiceHeader(index);
                                setPrepMethodId(method.id);
                              }}
                              className={activeDiceHeader === index ? styles.activeDicelottery : ''}
                            >
                              {method.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className={styles.lotteryDiceSelectContent}>
                      <ul
                        style={window.innerHeight > 1200 ? { height: 'auto' } : { height: '100%' }}
                      >
                        {/* <li><div className="lotteryChipsImage">1</div></li> */}
                        {(lotteryMethodGame &&
                          lotteryMethodGame.map((game, index) => {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  setActiveDiceContentCircle(index);
                                  handleGlow(game);
                                  setTheOdds(game.odds);
                                }}
                              >
                                <center>
                                  <LotteryDice
                                    content={game.info}
                                    label={game.odds}
                                    bg={
                                      prepChipsLeft.find((item) => item.id === game.id) ||
                                      prepChipsMiddle.find((item) => item.id === game.id) ||
                                      prepChipsRight.find((item) => item.id === game.id)
                                        ? 1
                                        : 2
                                    }
                                  />
                                </center>
                              </li>
                            );
                          })) || <div>hi</div>}
                      </ul>
                    </div>

                    <div className={styles.lotteryDiceFooterSection}>
                      <div className={styles.lotteryDiceFooterSelection}>
                        <ul>
                          <li
                            onClick={() => {
                              setActiveFooterSelect(1);
                              setPrepBetAmount(2);
                            }}
                          >
                            <PaymentRoundedContent
                              content='2¥'
                              width={0.52}
                              bg={activeFooterSelect === 1 ? 1 : 3}
                              fs='.15rem'
                              padding='0.05rem 0.05rem'
                              height='.25rem'
                            />
                          </li>
                          <li
                            onClick={() => {
                              setActiveFooterSelect(2);
                              setPrepBetAmount(5);
                            }}
                          >
                            <PaymentRoundedContent
                              content='5¥'
                              width={0.52}
                              bg={activeFooterSelect === 2 ? 1 : 3}
                              fs='.15rem'
                              padding='0.05rem 0.05rem'
                              height='.25rem'
                            />
                          </li>
                          <li
                            onClick={() => {
                              setActiveFooterSelect(3);
                              setPrepBetAmount(10);
                            }}
                          >
                            <PaymentRoundedContent
                              content='10¥'
                              width={0.5}
                              bg={activeFooterSelect === 3 ? 1 : 3}
                              fs='.15rem'
                              padding='0.05rem 0.05rem'
                              height='.25rem'
                            />
                          </li>
                          <li
                            onClick={() => {
                              setActiveFooterSelect(4);
                              setPrepBetAmount(50);
                            }}
                          >
                            <PaymentRoundedContent
                              content='50¥'
                              width={0.5}
                              bg={activeFooterSelect === 4 ? 1 : 3}
                              fs='.15rem'
                              padding='0.05rem 0.05rem'
                              height='.25rem'
                            />
                          </li>
                          <li
                            onClick={() => {
                              setActiveFooterSelect(5);
                              setPrepBetAmount(100);
                            }}
                          >
                            <PaymentRoundedContent
                              content='100¥'
                              width={0.5}
                              bg={activeFooterSelect === 5 ? 1 : 3}
                              fs='.15rem'
                              padding='0.05rem 0.05rem'
                              height='.25rem'
                            />
                          </li>
                          <li
                            onClick={() => {
                              setActiveFooterSelect(6);
                              setPrepBetAmount(500);
                            }}
                          >
                            <PaymentRoundedContent
                              content='500¥'
                              width={0.5}
                              bg={activeFooterSelect === 6 ? 1 : 3}
                              fs='.15rem'
                              padding='0.05rem 0.05rem'
                              height='.25rem'
                            />
                          </li>
                          <li>
                            <div
                              className={styles.madeMyVerticalDivider}
                              style={{ height: '0.25rem' }}
                            ></div>
                          </li>
                          <li>
                            <input
                              type='text'
                              placeholder={0}
                              className={styles.inputUrBet}
                              style={{
                                background: '#00000050',
                                border: 'none',
                                textAlign: 'center',
                                width: '0.7rem',
                                height: '0.25rem',
                                borderRadius: '0.2rem',
                                outline: 'none',
                                color: 'white',
                                fontSize: '.15rem',
                              }}
                              defaultValue={prepBetAmount}
                            ></input>
                            {/* <ButtonDesignOne buttonName="2" textColor="white" bbottom="none" bgColor="#00000080" width={.7}padding={0.06} margin={0.02}/> */}
                          </li>
                          <li
                            onClick={() => {
                              setOpenGameDetail(true);
                              popSound();
                            }}
                          >
                            <ButtonDesignOne
                              bbottom='none'
                              fw={700}
                              bgColor={'linear-gradient(180deg, #ffe800, #e38c00)'}
                              buttonName='投注'
                              width={0.7}
                              padding={0.03}
                              margin={0.02}
                              height={0.25}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : // This is the baccarat Game Area
            gameStatus === 'baccarat' ? (
              <Baccarat />
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    )
  );
}

export default GameStartPage;
