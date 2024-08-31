import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBindCardList, withdrawPassIsOpen } from 'src/api/game/gamelist';
import SafeBoxModal from 'src/app/components/Modal/Vault';
import AlertContainer from 'src/app/components/Modal/Vault/components/AlertContainer';
import { setSelectedBindCard, setWithdrawPassIsSet } from 'src/reducers/userInfo';
import { popSound } from 'src/utils/audio-player';
import PanelHeader from '../../../../components/PanelHeader';
import AddCardModal from '../AddCardModal';
import AddUSDTModal from '../AddUSDTModal';
import styles from './index.module.scss';

const SelfWithdrawal = () => {
  const { userBalance, selectedBindCard } = useSelector((state) => state.userInfo);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [bindCards, setBindCards] = useState();
  const [selectedCard, setSelectedCard] = useState(selectedBindCard ? selectedBindCard : null);
  const [amountToWithdraw, setAmountToWithdraw] = useState('');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showSafeBox, setShowSafeBox] = useState(false);
  const dispatch = useDispatch();
  const [specialCard, setSpecialCard] = useState([]);
  const [passedBankName, setPassedBankName] = useState();
  const [passedBankID, setPassedBankID] = useState();
  const [showUSDTModal, setShowUSDTModal] = useState(false);

  useEffect(() => {
    fetchBindCardList();
  }, []);

  const fetchBindCardList = () => {
    getBindCardList().then((res) => {
      setBindCards(res.data?.data?.memberCardList);
      dispatch(setSelectedBindCard(res.data?.data?.memberCardList[0]));
    })
  }

  useEffect(() => {
    setSelectedCard(selectedBindCard);
  }, [selectedBindCard]);

  const handleWithdrawButton = () => {
    setShowSafeBox(true);
  };

  useEffect(() => {
    getBindCardList().then((res) => {
      setSpecialCard(res.data.data.specialBankInfoMap);
    });

    withdrawPassIsOpen().then((res) => {
      dispatch(setWithdrawPassIsSet(res.data?.data));
    });
  }, []);

  function refreshcardlist() {
    getBindCardList().then((res) => {
      setBindCards(res.data?.data?.memberCardList);
    });
  }

  const handleWithdraw = () => {
    if (!amountToWithdraw) {
      alert('请输入正确金额');
      return;
    }

    if (!selectedCard) {
      alert('请选择提现卡');
      return;
    }

    handleWithdrawButton();
    popSound();
  };

  const [alertNotif, setAlertNotif] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  return (
    <>
      <AlertContainer alertMe={alertNotif} notify={alertMessage} />
      <AddCardModal
        showMe={showAddCardModal}
        onClose={() => {
          setShowAddCardModal(!showAddCardModal);
        }}
        rcardlist={refreshcardlist}
      />
      <AddUSDTModal
        showMe={showUSDTModal}
        onSuccess={() => fetchBindCardList()}
        onClose={() => setShowUSDTModal(!showUSDTModal)}
      />
      <SafeBoxModal
        withdraw1={amountToWithdraw}
        withdraw2={selectedCard?.id}
        safeBoxOpen={showSafeBox}
        safeBoxClose={() => {
          setAmountToWithdraw('');
          setShowSafeBox(false);
        }}
        setAlertNotif={setAlertNotif}
        setAlertMessage={setAlertMessage}
      />
      <div className={styles.selfWithdrawalWrapper} data-theme={currTheme}>
        <div className={styles.panel}>
          <PanelHeader title={'提现金额'} />
          <div className={styles.inputField}>
            <input
              type='text'
              placeholder='请输入提现金额'
              onKeyDown={(e) =>
                !['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Delete', 'Backspace'].includes(
                  e.key
                ) && e.preventDefault()
              }
              value={amountToWithdraw}
              maxLength={10}
              onChange={(e) => setAmountToWithdraw(e.target.value)}
            />
            <div>
              <span>当前打码量可提现金额: {userBalance}</span>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <PanelHeader title={'提现方式'} />
          <div className={styles.selectBindCardList}>
            {bindCards?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classnames(styles.bankCard, {
                    [styles.selectedCard]: item?.id === selectedBindCard?.id,
                  })}
                  onClick={() => {
                    dispatch(setSelectedBindCard(item));
                    selectedCard === item ? setSelectedCard(null) : setSelectedCard(item);
                    popSound();
                  }}
                >
                  <div className={styles.bankDetails}>
                    <img src={item?.bankIcon} alt='Bank Icon' />
                    {item?.bankName} 尾号 {item?.bankAccount.substr(item?.bankAccount.length - 4)}
                  </div>

                  <span
                    className={classnames(styles.toggle, {
                      [styles.toggleSelected]: item?.id === selectedCard?.id,
                    })}
                  ></span>
                </div>
              );
            })}
          </div>
          <div className={styles.addCardsCont}>
            <div
              className={styles.addCard}
              onClick={() => {
                popSound();
                setShowAddCardModal(!showAddCardModal);
              }}
            >
              <img
                src={require(`../../../../assets/${currTheme}/fragments/plusvector.png`)}
                alt='Plus Vector'
              />
              <span>绑定银行卡</span>
            </div>
            {Object.keys(specialCard)?.map((card, index) => {
              return (
                <div
                  key={index}
                  className={styles.addCard}
                  onClick={() => {
                    setShowUSDTModal(!showUSDTModal);
                    setPassedBankID(specialCard[card]);
                    setPassedBankName(card);
                  }}
                >
                  <img
                    src={require(`../../../../assets/${currTheme}/fragments/plusvector.png`)}
                    alt='Plus Vector'
                  />
                  <span>{card}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.withdrawButtonWrapper}>
            <div>
              <div className={styles.details}>
                <span>还需打码</span>
                <span>0.00</span>
              </div>
              {/* <div className={styles.details}>
                <span>账户余额</span>
                <span>{userBalance}</span>
              </div> */}
            </div>
            <div className={styles.withdrawButton} onClick={handleWithdraw}>
              <span>立即提现</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfWithdrawal;
