import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lotteryInit } from 'src/api/game/gamelist';
import {
  resetContainers,
  setBettingAreas,
  setChipsPerContainers,
  setInitialChipsPerContainer,
  setOthersChipsPerContainers,
  setRevealCards,
} from 'src/reducers/baccarat';
import { updateBalance } from 'src/reducers/userInfo';
import BettingSection from './components/BettingSection';
import CardsSection from './components/CardsSection';
import ChipSection from './components/ChipSection';
import SelectChipsModal from './components/Modal/SelectChipsModal';
import styles from './index.module.scss';

//Initial State and Actions
const initialState = {
  chosenChip: {
    key: '',
    src: '',
    value: 0,
  },
  isShowSelectChipsModal: false,
};

const actions = {
  SET_CHOSEN_CHIP: 'SET_CHOSEN_CHIP',
  IS_SHOW_SELECT_CHIPS_MODAL: 'IS_SHOW_SELECT_CHIPS_MODAL',
};

//Reducer to Handle Actions
const baccaratReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_CHOSEN_CHIP:
      return {
        ...state,
        chosenChip: {
          ...action.payload,
        },
      };
    case actions.IS_SHOW_SELECT_CHIPS_MODAL:
      return {
        ...state,
        isShowSelectChipsModal: action.payload,
      };
    default:
      return state;
  }
};

export const BaccaratContext = React.createContext();

const Baccarat = () => {
  const [state, dispatch] = React.useReducer(baccaratReducer, initialState);
  const dispatchStore = useDispatch();
  const { revealCards, hasBet, othersChipsPerContainers } = useSelector(
    (state) => state.baccarat
  );
  const [stopBetting, setStopBetting] = useState(undefined);
  const [countDown, setCountDown] = useState(0);
  const [lotteryData, setLotteryData] = useState();
  const [isInitial, setIsInitial] = useState(true);
  const keys = othersChipsPerContainers
    ? Object?.keys(othersChipsPerContainers)
    : undefined;
  const chipsLengths =
    keys && keys?.map((key) => othersChipsPerContainers[key]?.chips?.length);
  const hasOthersChipsGreaterThanZero =
    chipsLengths && chipsLengths?.some((length) => length > 0);

  const contextValue = {
    chosenChip: state.chosenChip,
    isShowSelectChipsModal: state.isShowSelectChipsModal,
    selectedChips: state.selectedChips,
    setChosenChip: (chosenChip) => {
      dispatch({ type: actions.SET_CHOSEN_CHIP, payload: chosenChip });
    },
    setIsShowSelectChipsModal: (isShow) => {
      dispatch({ type: actions.IS_SHOW_SELECT_CHIPS_MODAL, payload: isShow });
    },
  };

  useEffect(() => {
    lotteryInit(2001).then((res) => {
      const chipsPerContainersInitial = res.data.data?.methods[0].games.reduce(
        (obj, item) => ((obj[item.id] = { chips: [], totalAmount: 0 }), obj),
        {}
      );
      setCountDown(res.data.data.issuevo.countdown);
      setIsInitial(false);
      setLotteryData(res.data.data);
      dispatchStore(setBettingAreas(res.data.data?.methods[0].games));
      if (!hasBet) {
        dispatchStore(setOthersChipsPerContainers(chipsPerContainersInitial));
        dispatchStore(setInitialChipsPerContainer(chipsPerContainersInitial));
        dispatchStore(setChipsPerContainers(chipsPerContainersInitial));
      }
    });
  }, []);

  const lastBetTime = Number(localStorage.getItem('lastBetTime'));
  const lastBetTimeCountDown = Number(
    localStorage.getItem('lastBetTimeCountDown')
  );
  const shouldResetContainers =
    lastBetTime + lastBetTimeCountDown - Math.floor(Date.now() / 1000) <= 0;

  useEffect(() => {
    let stopBettingTimer;
    let requestLotteryInitTimer;
    let requestLotteryInitInterval;

    let updateBalanceTimer = setTimeout(
      () => dispatchStore(updateBalance()),
      2000
    );

    if (countDown !== 0 && countDown > 10) {
      !hasOthersChipsGreaterThanZero &&
        shouldResetContainers &&
        dispatchStore(resetContainers());
      setStopBetting(false);
      //timer for displaying stop betting === true / stop betting
      stopBettingTimer = setTimeout(() => {
        setStopBetting(true);
      }, (countDown - 10) * 1000);
    }
    if (countDown !== 0 && countDown <= 10) {
      setStopBetting(true);
    }

    if (countDown === 60) {
      dispatchStore(setRevealCards(false));
      !hasBet && shouldResetContainers && dispatchStore(resetContainers());
      requestLotteryInitInterval = setInterval(() => {
        lotteryInit(2001).then((res) => {
          setCountDown(res.data.data.issuevo.countdown);
        });
      }, 30000);
    } else {
      requestLotteryInitTimer = setTimeout(() => {
        !isInitial && countDown <= 0 && dispatchStore(setRevealCards(false));
        !hasBet && shouldResetContainers && dispatchStore(resetContainers());
        lotteryInit(2001).then((res) => {
          setCountDown(res.data.data.issuevo.countdown);
        });
      }, countDown * 1000);
    }

    return () => {
      clearTimeout(stopBettingTimer);
      clearTimeout(requestLotteryInitTimer);
      clearInterval(requestLotteryInitInterval);
      clearTimeout(updateBalanceTimer);
    };
  }, [countDown]);

  return (
    <BaccaratContext.Provider value={contextValue}>
      <SelectChipsModal isShow={state.isShowSelectChipsModal} />
      <div
        className={styles.bg}
        // src={require("src/Assets/img/BaccaratImages/bg.png")}
        // size="cover"
        // repeat="no-repeat"
        // position="center"
      >
        {stopBetting === false && (
          <img
            className={styles.startBetting}
            src={require('../../../assets/commons/baccarat/baccarat_game_start_betting.png')}
            alt=''
          />
        )}
        {stopBetting === true && (
          <img
            className={styles.stopBetting}
            src={require('../../../assets/commons/baccarat/baccarat_game_stop_betting.png')}
            alt=''
          />
        )}
        <CardsSection
          stopBetting={stopBetting}
          isShowSelectChipsModal={state.isShowSelectChipsModal}
        />
        <BettingSection
          stopBetting={stopBetting}
          lotteryData={lotteryData}
        />
        <ChipSection />
      </div>
    </BaccaratContext.Provider>
  );
};

export default Baccarat;
