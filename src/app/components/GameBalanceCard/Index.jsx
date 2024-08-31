import ButtonDesignTwo from '../Fragments/Buttons/ButtonDesignTwo';
import styles from './index.module.scss';

export default function GameBalanceCard(props) {
  return (
    <div className={styles.gameBalanceCard} key={props.platformId}>
      <div className={styles.gameBalanceName}>{props.platformName}</div>
      <div
        className={styles.gameBalanceAmount}
        style={{ marginBottom: '0.05rem', marginRight: '0.1rem' }}
      >
        ¥ {props.money.toFixed(1)}
      </div>
      <div className={styles.gameBalanceButton}>
        <ButtonDesignTwo
          clickMe={props.getBackMoney}
          padding={0.025}
          margin={0}
          width={0.7}
          height={0.22}
          buttonName={'转出'}
        />
      </div>
    </div>
  );
}
