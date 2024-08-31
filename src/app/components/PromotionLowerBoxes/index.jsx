import styles from './index.module.scss';

export default function MyPromotionLowerBoxes(props) {
  return (
    <div className={styles.lowerDetails_oneBox}>
      <div className={styles.lowerDetails_yellowText}>{props.yellow}</div>
      <div className={styles.lowerDetails_whiteText}>{props.white}</div>
    </div>
  );
}
