import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getBindCardList } from 'src/api/game/gamelist';
import AddCardModal from '../AddCardModal';
import AddUSDTModal from '../AddUSDTModal';
import styles from './index.module.scss';

const BindCards = () => {
  const [bindCards, setBindCards] = useState();
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showUSDTModal, setShowUSDTModal] = useState(false)
  const { currTheme } = useSelector((state) => state.gameSettings);

  useEffect(() => {
    fetchBindCardList();
  }, []);

  const fetchBindCardList = () => {
    getBindCardList().then((res) => {
      setBindCards(res.data?.data?.memberCardList);
    });
  };

  function censorMyAccount(myAccount) {
    if (myAccount.length < 4) {
      return myAccount;
    }
    return (
      myAccount
        .slice(0, myAccount.length - 4)
        .replaceAll(
          myAccount.slice(0, myAccount.length - 4),
          '*'.repeat(myAccount.length - 4)
        ) + myAccount.substr(-4)
    );
  }

  return (
    <div className={styles.mainWrapper} data-theme={currTheme}>
      <PullToRefresh onRefresh={fetchBindCardList}>
        <AddCardModal
          showMe={showAddCardModal}
          onSuccess={() => fetchBindCardList()}
          onClose={() => setShowAddCardModal(!showAddCardModal)}
          style={{ border: '1px solid red' }}
        />
        <AddUSDTModal
          showMe={showUSDTModal}
          onSuccess={() => fetchBindCardList()}
          onClose={() => setShowUSDTModal(!showUSDTModal)}
          style={{ border: '1px solid red' }}
        />
        <div
          className={styles.bindCardWrapper}
          data-theme={currTheme}
        >
          {bindCards?.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.bankCard}
                onClick={() => {
                  //   dispatch(setSelectedBindCard(item));
                  //   setSelectedCard(item);
                }}
              >
                <div className={styles.bankDetails}>
                  <img
                    src={item?.bankIcon}
                    alt='Bank Icon'
                  />
                  {item?.bankName}
                </div>

                <span className={styles.bankAccount}>
                  {censorMyAccount(item?.bankAccount)}
                </span>
              </div>
            );
          })}
          <div
            className={styles.bankCard}
            onClick={() => setShowAddCardModal(!showAddCardModal)}
          >
            <div className={styles.bankDetails}>
              <img
                src={require(`../../../../assets/${currTheme}/fragments/bind_card_add.png`)}
                alt='Bind card'
              />
              <span>绑定银行卡</span>
            </div>
            <img
              src={require(`../../../../assets/${currTheme}/fragments/arrowvector.png`)}
              alt='Arrow Vector'
            />
          </div>
          <div
            className={styles.bankCard}
            onClick={() => setShowUSDTModal(!showUSDTModal)}
          >
            <div className={styles.bankDetails}>
              <img
                src={require(`../../../../assets/${currTheme}/fragments/bind_card_add.png`)}
                alt='Bind card'
              />
              <span>添加USDT</span>
            </div>
            <img
              src={require(`../../../../assets/${currTheme}/fragments/arrowvector.png`)}
              alt='Arrow Vector'
            />
          </div>
        </div>
      </PullToRefresh>
    </div>
  );
};

export default BindCards;
