import styles from './index.module.scss';

export default function BoxHeader(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleHolder}>{props.title}</div>
      </div>
    </div>
  );
}
