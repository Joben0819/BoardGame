import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch, useSelector } from 'react-redux';
import { bet } from 'src/api/game/gamelist';
import CoinPurse from 'src/app/components/CoinPurse';
import ButtonDesignOne from 'src/app/components/Fragments/Buttons/ButtonDesignOne';
import PaymentRoundedContent from 'src/app/components/Fragments/PaymentRoundedContent';
import AlertContainer from 'src/app/components/Modal/AlertContainer';
import { updateBalance } from 'src/reducers/userInfo';
import { useAuth } from 'src/utils/context/LoginAuth';
import styles from './index.module.scss';

export default function GameRightModal({
  currIssue,
  activeHeader,
  handleRemove,
  betOdds,
  openInfo,
  closeInfo,
  prepChips,
  prepAmount,
  prepLotteryId,
  prepMethodId,
  myTime,
  timeRepeater,
}) {
  const dispatch = useDispatch();
  let updateBalanceDelay;

  //toggling the section of the header
  const auth = useAuth();
  const [betIds, setBetIds] = useState([]);
  const [BetMsg, setBetMsg] = useState('');
  const [betData, setBetData] = useState([]);
  const [theBets, setTheBets] = useState(prepChips);
  const [amountDeduct, setAmountDeduct] = useState(0);
  const [showBetAlert, setShowBetAlert] = useState(false);
  const [finalBetAmount, setTheFinalBetAmount] = useState(0);
  const [finalAmountToWin, setFinalAmountToWin] = useState(0.0);
  const [selectedBetRecord, setSelectedBetRecord] = useState(1);
  const [selectedMultiplier, setSelectedMultiplier] = useState(1);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [InitialAcc, setInitialAcc] = useState(auth?.user?.accountNow);

  useEffect(() => {
    setTheFinalBetAmount(prepChips.length * prepAmount);
    setFinalAmountToWin(finalBetAmount * parseFloat(betOdds).toFixed(2) * selectedMultiplier);
    setAmountDeduct(finalBetAmount * selectedMultiplier);
  }, [prepAmount, betOdds, selectedMultiplier, prepChips, finalBetAmount]);

  useEffect(() => {}, [prepChips, prepAmount, prepLotteryId, prepMethodId, selectedMultiplier]);

  useEffect(() => {
    prepChips
      .sort((a, b) => {
        return a.id - b.id;
      })
      .sort((a, b) => {
        return parseInt(a.info) - parseInt(b.info);
      });
  }, [prepChips]);

  useEffect(() => {}, [prepChips]);

  function hitBet() {
    updateBalanceDelay = setTimeout(() => {
      dispatch(updateBalance());
    }, 1500);
    const infos = prepChips.map(function (chips) {
      return chips.id + '&';
    });
    bet(prepLotteryId, prepMethodId, amountDeduct, infos.join().replaceAll(',', '')).then((res) => {
      setBetData(res.data);
      setShowBetAlert(true);
      setInitialAcc(res.data.data.money);
      setBetMsg(res.data.msg);
    });

    prepChips.map((bet) => {
      handleRemove(bet);
    });

    setTimeout(function () {
      setShowBetAlert(false);
    }, 2500);
  }

  const renderTime = ({ remainingTime }) => {
    const seconds = remainingTime - 10;
    const extraSeconds = remainingTime;
    // if (remainingTime === 0) {
    //   return (
    //     <div className="timer">
    //       <span>停止下注</span>
    //     </div>
    //   );
    // }
    return (
      <div className='timer'>
        <div className='value'>{`00:${
          remainingTime >= 11 && String(seconds).length === 1 ? 0 : ''
        }${remainingTime <= 10 && String(remainingTime).length === 1 ? 0 : ''}${
          remainingTime >= 11 ? seconds : extraSeconds
        }`}</div>
      </div>
    );
  };

  useEffect(() => {
    if (myTime === 0) {
      prepChips.map((bet) => {
        handleRemove(bet);
      });
    }

    return () => {
      clearTimeout(updateBalanceDelay);
    };
  }, [myTime]);

  return (
    <>
      <div
        className={styles.overlay}
        onClick={closeInfo}
        data-theme={currTheme}
        style={{ visibility: !openInfo && 'hidden', top: 0 }}
      >
        <AlertContainer
          alertMe={showBetAlert}
          top={3}
          left={3.1}
          notify={BetMsg ? BetMsg : '投注信息有误!'}
        />
        <div className={styles.gameRightModalContainer} onClick={(e) => e.stopPropagation()}>
          <div className={styles.gameDetailHeader}>
            <div
              className={styles.gameDetailTitle}
              style={{ marginLeft: '0.2rem', marginTop: '-0.2rem' }}
            >
              确认投注
            </div>
            <div className={styles.gameDetailSub}>
              <span style={{ marginRight: '1rem' }}>
                距离:{currIssue ? currIssue : '2002-2202'}{' '}
              </span>

              <span>
                <span>本期截止:</span>
                <span style={{ color: '#11D38A', marginLeft: '0.3rem' }}>
                  {myTime && (
                    <CountdownCircleTimer
                      key={timeRepeater}
                      isPlaying={true}
                      duration={60}
                      initialRemainingTime={myTime}
                      colors={'#11D38A !important'}
                      onComplete={() => [false, 1000]}
                      size={0}
                    >
                      {renderTime}
                    </CountdownCircleTimer>
                  )}
                </span>
              </span>
            </div>
          </div>
          <div className={styles.gameDetailBody}>
            <div className={styles.gameDetailsBetHistory}>
              {prepChips.length === 0
                ? ''
                : prepChips.map((bet, index) => (
                    <div
                      className={`${styles.gameDetailBetRecord}  ${
                        index % 2 === 0 ? styles.bet2 : styles.bet1
                      } `}
                      onClick={() => {
                        setSelectedBetRecord(1);
                      }}
                      // style={{ background: index % 2 === 0 ? "#222222" : "" }}
                    >
                      <div className={styles.betRecordName} style={{ marginTop: '0.015rem' }}>
                        {bet.info}
                      </div>
                      <div
                        className={styles.betRecordAmount}
                        style={{ color: '#11D38A', marginTop: '0.01rem' }}
                      >
                        {parseFloat(prepAmount).toFixed(2)}
                      </div>
                      <div className={styles.betRecordDelete}>
                        <img
                          onClick={() => handleRemove(bet)}
                          src={require(`../../../assets/${currTheme}/main/trashBinLogo.png`)}
                          style={{ width: '.18rem', marginTop: '0.03rem' }}
                          alt='g'
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className={styles.gameDetailFooter}>
            <div className={styles.gameDetailFooterInformation}>
              <div
                className={styles.gameDetailYellowText}
                style={{
                  color: '#F0CB5A',
                  fontSize: '0.12rem',
                }}
              >
                已选 {prepChips.length} 注,共计 {finalBetAmount} 元,预期可获{' '}
                {parseFloat(finalAmountToWin).toFixed(2)}
              </div>
              <div className={styles.gameDetailMultiplierContainer} data-theme={currTheme}>
                {/* These are multipliers */}
                <ul>
                  <li onClick={() => setSelectedMultiplier(1)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 1 ? 1 : 4}
                      content={'1倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                  <li onClick={() => setSelectedMultiplier(2)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 2 ? 1 : 4}
                      content={'2倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                  <li onClick={() => setSelectedMultiplier(5)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 5 ? 1 : 4}
                      content={'5倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                  <li onClick={() => setSelectedMultiplier(10)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 10 ? 1 : 4}
                      content={'10倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                  <li onClick={() => setSelectedMultiplier(20)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 20 ? 1 : 4}
                      content={'20倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                  <li onClick={() => setSelectedMultiplier(100)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 100 ? 1 : 4}
                      content={'100倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                  <li onClick={() => setSelectedMultiplier(200)}>
                    <PaymentRoundedContent
                      bg={selectedMultiplier === 200 ? 1 : 4}
                      content={'200倍'}
                      width={0.35}
                      padding={'0.05rem 0'}
                      height={'0.25rem'}
                      // betData={"dblue"}
                    />
                  </li>
                </ul>
              </div>
              <div className={styles.madeMyHorizontalDivider} style={{ width: '3.5rem' }}></div>
              <div className={styles.gameDetailEndMostContainer}>
                <div className={styles.coinPurseHolder}>
                  <CoinPurse
                    // betlog={true}
                    Icolor={'#FEE587'}
                    noShuffle={true}
                    inputBg={'#00000070'}
                    accountNow={InitialAcc}
                  />
                </div>
                <div className={styles.gameDetailsButtonHolder}>
                  <ButtonDesignOne
                    margin={0}
                    padding={0.5}
                    width={0.6}
                    height={0.2}
                    bgColor={'linear-gradient(to top, #E38C00, #FFE800)'}
                    butcolor='brown'
                    buttonName={'投注'}
                    clickMe={hitBet}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
