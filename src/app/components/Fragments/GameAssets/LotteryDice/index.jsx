import { useSelector } from 'react-redux';
import styles from './index.module.scss';

export default function LotteryDice(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div className={styles.lotteryDiceSelector} data-theme={currTheme}>
      <div className={props.bg !== 1 ? styles.diceCircle : styles.diceActive}>
        <span className={styles.diceContent}>{props.content}</span>
      </div>
      <div className={styles.diceLabel}>{props.label}</div>
    </div>
  );
}
