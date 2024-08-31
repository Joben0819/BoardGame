import image2 from './../../../assets/commons/addscreenmodal2.png';
import styles from './index.module.scss';

const logoIcon = require(`../../../../variants/${process.env.REACT_APP_SITE}/logo_icon.png`);

export default function IphoneAddScreen({ showing, closeMe }) {
  if (!showing) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.arrow}>&nbsp;</div>
      <div className={styles.row1}>
        <div className={styles.imageCont}>
          <img src={logoIcon} alt='Logo Icon' />
        </div>
        <div className={styles.close} onClick={closeMe}>
          <span>&nbsp;X&nbsp;</span>
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.text}>
          依次点击：分享按钮，添加到主屏幕，<br></br>即可在桌面快速访问。
          <img
            src={image2}
            style={{
              width: '0.15rem',
              height: '0.15rem',
              marginRight: '0.1rem',
            }}
            alt='Add Screen'
          />
        </div>
      </div>
    </div>
  );
}
