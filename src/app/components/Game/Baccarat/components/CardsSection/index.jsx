import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cardBack from 'src/app/assets/commons/baccarat/cards/card-back.png';
import cardFlip from '../../../../../data/audioData/baijialefp.mp3';
import { cardsData } from './data.js';
import styles from './index.module.scss';

const CardsSection = ({ isShowSelectChipsModal, stopBetting }) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [bankerCards, setBankerCards] = useState([]);
  const [delayReveal, setDelayReveal] = useState(false);
  const { cardsResult, revealCards } = useSelector((state) => state.baccarat);
  const [isInitial, setIsInitial] = useState(true);
  const cardFx = new Audio(cardFlip);

  useEffect(() => {
    if (cardsResult?.code) {
      const cardsSplitted = cardsResult?.code.split(' ');

      const player = cardsSplitted[0];
      setPlayerCards(player.split(','));

      const banker = cardsSplitted[1];
      setBankerCards(banker.split(','));
    }
  }, [cardsResult]);

  useEffect(() => {
    setIsInitial(false);
    revealCards === false && resetCards();
    const thirdCardDelayTimer = setTimeout(() => {
      setDelayReveal(revealCards);
    }, 2400);
    !isInitial && cardFx && cardFx.play();
    return () => {
      clearTimeout(thirdCardDelayTimer);
    };
  }, [revealCards]);

  const resetCards = () => {
    setDelayReveal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.player}>
        <div>闲</div>
        <div>PLAYER</div>
      </div>

      <div className={styles.playerCards}>
        <div className={classnames(styles.thirdCard, { [styles.enterThirdCard]: revealCards })}>
          {playerCards.length === 3 && revealCards && (
            <div
              className={classnames(styles.cardHolder, {
                [styles.revealCard]: revealCards && delayReveal,
              })}
            >
              <img className={classnames(styles.card, styles.back)} src={cardBack} alt='' />
              <img
                className={classnames(styles.card, styles.front)}
                src={playerCards.length !== 0 ? cardsData[playerCards[2]]?.src : cardBack}
                alt=''
              />
            </div>
          )}
        </div>
        <div className={styles.firstSecondCard}>
          <div
            className={classnames(styles.cardHolder, {
              [styles.revealCard]: revealCards,
              [styles.unsetPreserve3d]: isShowSelectChipsModal,
            })}
          >
            <img className={classnames(styles.card, styles.back)} src={cardBack} alt='' />
            <img
              className={classnames(styles.card, styles.front)}
              src={playerCards.length !== 0 ? cardsData[playerCards[0]]?.src : cardBack}
              alt=''
            />
          </div>
          <div
            className={classnames(styles.cardHolder, {
              [styles.revealCard]: revealCards,
              [styles.unsetPreserve3d]: isShowSelectChipsModal,
            })}
          >
            <img className={classnames(styles.card, styles.back)} src={cardBack} alt='' />
            <img
              className={classnames(styles.card, styles.front)}
              src={playerCards.length !== 0 ? cardsData[playerCards[1]]?.src : cardBack}
              alt=''
            />
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.bankerCards}>
        <div className={classnames(styles.thirdCard, { [styles.enterThirdCard]: revealCards })}>
          {bankerCards.length === 3 && revealCards && (
            <div
              className={classnames(styles.cardHolder, {
                [styles.revealCard]: revealCards && delayReveal,
              })}
            >
              <img className={classnames(styles.card, styles.back)} src={cardBack} alt='' />
              <img
                className={classnames(styles.card, styles.front)}
                src={bankerCards.length !== 0 ? cardsData[bankerCards[2]]?.src : cardBack}
                alt=''
              />
            </div>
          )}
        </div>

        <div className={styles.firstSecondCard}>
          <div
            className={classnames(styles.cardHolder, {
              [styles.revealCard]: revealCards,
              [styles.unsetPreserve3d]: isShowSelectChipsModal,
            })}
          >
            <img className={classnames(styles.card, styles.back)} src={cardBack} alt='' />
            <img
              className={classnames(styles.card, styles.front)}
              src={bankerCards.length !== 0 ? cardsData[bankerCards[0]]?.src : cardBack}
              alt=''
            />
          </div>
          <div
            className={classnames(styles.cardHolder, {
              [styles.revealCard]: revealCards,
              [styles.unsetPreserve3d]: isShowSelectChipsModal,
            })}
          >
            <img className={classnames(styles.card, styles.back)} src={cardBack} alt='' />
            <img
              className={classnames(styles.card, styles.front)}
              src={bankerCards.length !== 0 ? cardsData[bankerCards[1]]?.src : cardBack}
              alt=''
            />
          </div>
        </div>
      </div>

      <div className={styles.banker}>
        <div>庄</div>
        <div>BANKER</div>
      </div>
    </div>
  );
};

export default CardsSection;
