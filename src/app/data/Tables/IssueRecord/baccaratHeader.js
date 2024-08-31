import { cardsData } from 'src/app/components/Game/Baccarat/components/CardsSection/data';
import styles from './index.module.scss';

export const baccaratHeader = [
  {
    Header: 'time',
    accessor: 'issue', //name
    Cell: ({ value }) => {
      return <span className={styles.issueHeader}> {value}</span>;
    },
  },
  {
    Header: 'result',
    accessor: 'code',
    Cell: ({ value }) => {
      let code = value;
      const myNum = code.split(' ');
      const playerCards = myNum[0].split(',');
      const bankerCards = myNum[1].split(',');
      return (
        <>
          <div className={styles.playerContainer}>
            <div className={styles.playerCards}>
              <div className={styles.pText}>
                <span className={styles.pcards}>闲</span>
              </div>
              {playerCards.map((card, index) => {
                return (
                  <div className={styles.cardsContainer}>
                    <img
                      src={cardsData[playerCards[index]].src}
                      className={styles.cardsData}
                      alt='Player Cards'
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.playerCards}>
              <div className={styles.pText}>
                <span className={styles.bcards}>闲</span>
              </div>
              {bankerCards.map((card, index) => {
                return (
                  <div className={styles.cardsContainer}>
                    <img
                      src={cardsData[bankerCards[index]].src}
                      className={styles.cardsData}
                      alt='Banker Cards'
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
    },
  },
];
