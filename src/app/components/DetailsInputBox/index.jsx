import styles from './index.module.scss';

function DetailInputBox(props) {
  return (
    <div className={styles.detailInputBox_wrapper}>
      <div className={styles.detailInputBox_container}>
        <div className={styles.detailInputBoxLabel}>
          <div className={styles.detailInputBox_imgHolder}>
            <img src={props.icon} alt='Icon' />
          </div>
          <span>{props.label}</span>
        </div>

        <div className={styles.detailsInputHolder}>
          <input
            disabled={props.disable}
            className={
              props.wClass === styles.detailInput
                ? styles.forDetailComponent
                : styles.justPlainInput
            }
            type='text'
            value={props.placeholder}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default DetailInputBox;
