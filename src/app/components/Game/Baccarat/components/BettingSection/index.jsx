import classnames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bet, lotteryInit } from 'src/api/game/gamelist';
import coins from 'src/app/assets/commons/baccarat/coins.png';
import { setHasBet, storeChips } from 'src/reducers/baccarat';
import { setUserBalance } from 'src/reducers/userInfo';
import { BaccaratContext } from '../..';
import styles from './index.module.scss';

const BettingSection = ({ lotteryData, stopBetting }) => {
  const { chosenChip } = React.useContext(BaccaratContext);
  const { chipsPerContainers, othersChipsPerContainers, bettingAreas, cardsResult, revealCards } =
    useSelector((state) => state.baccarat);
  const { userBalance } = useSelector((state) => state.userInfo);
  const { baccaratChipSound } = useSelector((state) => state.gameSettings);
  const [playerWins, setPlayerWins] = useState(undefined);
  const [delayReveal, setDelayReveal] = useState(false);
  // const [keys, setKeys] = useState(undefined);
  // const [chipsLengths, setChipsLengths] = useState(undefined);
  const dispatch = useDispatch();
  const ref = useRef(null);
  let baccaratChipAudio = new Audio('/chip-sound.mp3');
  const keys = othersChipsPerContainers ? Object?.keys(othersChipsPerContainers) : undefined;
  const chipsLengths = keys && keys?.map((key) => othersChipsPerContainers[key]?.chips?.length);

  useEffect(() => {
    const hasChipsGreaterThanZero = chipsLengths.some((length) => length > 0);
    if (othersChipsPerContainers && hasChipsGreaterThanZero) {
      baccaratChipSound && baccaratChipAudio && baccaratChipAudio.play();
    }
  }, [chipsLengths]);

  useEffect(() => {
    const blinkerDelayTimer = setTimeout(() => {
      setDelayReveal(revealCards);
    }, 3000);

    const cardsSplitted = cardsResult?.code?.split(' ');
    if (cardsSplitted && cardsSplitted[0] === cardsResult?.analyse) {
      setPlayerWins(true);
    } else {
      setPlayerWins(false);
    }

    return () => {
      clearTimeout(blinkerDelayTimer);
    };
  }, [revealCards]);

  const addChips = (betAreaId) => {
    if (!stopBetting) {
      let randomX = `${
        (Math.ceil(Math.random() * ref.current.offsetWidth - 100) / 260) *
        (Math.round(Math.random()) ? 1 : -1)
      }rem`;
      let randomY = `${
        (Math.ceil(Math.random() * ref.current.offsetHeight - 100) / 270) *
        (Math.round(Math.random()) ? 1 : -1)
      }rem`;

      if (userBalance >= chosenChip.value) {
        baccaratChipSound && baccaratChipAudio.play();
        lotteryInit(2001).then((res) => {
          localStorage.setItem('lastBetTime', Math.floor(Date.now() / 1000));
          localStorage.setItem('lastBetTimeCountDown', res.data.data.issuevo.countdown);
        });

        dispatch(setHasBet(true));
        bet(lotteryData?.base.id, lotteryData?.methods[0].id, chosenChip?.value, betAreaId).then(
          (res) => {
            dispatch(setUserBalance(res.data.data.money));
          }
        );
        dispatch(
          storeChips({
            [betAreaId]: {
              chips: [
                ...chipsPerContainers[betAreaId]?.chips,
                { ...chosenChip, x: randomX, y: randomY },
              ],
              totalAmount: chipsPerContainers[betAreaId].totalAmount + chosenChip.value,
            },
          })
        );
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <audio id='baccaratSound' autoPlay='autoplay'>
        <source src='chip-sound.mp3' type='audio/ogg' />
        <source src='chip-sound.mp3' type='audio/mpeg' />
      </audio>
      {bettingAreas?.map((bettingArea, index) => {
        return (
          <div
            key={index}
            className={classnames(styles.betAmountBg, {
              [styles.blink]:
                (bettingArea.info === '闲' && playerWins && delayReveal) ||
                (bettingArea.info === '庄' && !playerWins && delayReveal),
            })}
          >
            <div
              className={styles.onClickOverlay}
              onClick={() => {
                addChips(bettingArea.id);
              }}
            />
            <div id='rollSpace' className={styles.rollSpace} ref={ref}>
              <div className={styles.text}>
                <p>{bettingArea.info}</p>
                <p>X{bettingArea.odds}</p>
              </div>
              {chipsPerContainers[bettingArea.id]?.chips.map((chip, index) => {
                return (
                  <motion.img
                    initial={{
                      x: 0,
                      y: '0.5rem',
                    }}
                    animate={{ x: chip.x, y: chip.y }}
                    transition={{ easeInOut: 0.2 }}
                    className={styles.chip}
                    src={chip.src}
                    key={index}
                  />
                );
              })}
              {othersChipsPerContainers &&
                othersChipsPerContainers[bettingArea.id]?.chips.map((chip, index) => {
                  return (
                    <motion.img
                      initial={{
                        x: 0,
                        y: '0.5rem',
                      }}
                      animate={{ x: chip.x, y: chip.y }}
                      transition={{ easeInOut: 0.2 }}
                      className={styles.chip}
                      src={chip.src}
                      key={index}
                    />
                  );
                })}
            </div>
            <div className={styles.bottom}>
              <img src={coins} alt='coins' />
              <span>{chipsPerContainers[bettingArea.id]?.totalAmount}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BettingSection;
