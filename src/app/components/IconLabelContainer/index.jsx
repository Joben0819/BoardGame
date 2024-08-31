import styles from './index.module.scss';

export default function IconLabelContainer(props) {
  return (
    <div className={styles.iconLabelAmountContainer}>
      <div className={styles.ilaImageContainer}>
        <img src={props.imgsrc} alt='Icon' />
      </div>
      <div className={styles.ilaLabelContainer}>{props.label}</div>
      <div className={styles.ilaAmountContainer}>{props.amount}</div>
    </div>
  );
}
