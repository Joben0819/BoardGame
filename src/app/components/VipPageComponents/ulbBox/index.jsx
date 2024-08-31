import classnames from 'classnames';
import styles from './index.module.scss';

function UlbBox(props) {
  const isActive = props.info === '未领取';
  // This checks the color of the box
  function determineColor(colorname) {
    if (colorname === 'pink') {
      return {
        background: 'linear-gradient(to bottom, #F49E97,#FA6653)',
      };
    } else if (colorname === 'blue') {
      return { background: 'linear-gradient(to bottom, #76C6DD, #00AC90)' };
    } else if (colorname === 'orange') {
      return { background: 'linear-gradient(to bottom, #F7C697, #DE7900)' };
    }
  }

  return (
    <div className={styles.ulbBox_wrapper} style={{ color: 'white' }}>
      <div className={styles.ulbBox_header} style={determineColor(props.color)}>
        <img src={props.imagesrc} alt='Ulb' />
        <span style={{ paddingBottom: '0.02rem', paddingTop: '0.002rem' }}>{props.title} </span>
      </div>
      <div className={styles.ulbBox_body} style={determineColor(props.color)}>
        <div className={styles.ulbBox_ycount}>{props.yencount}</div>
        <div
          onClick={props.handleGift}
          className={classnames(styles.ulbBox_info, {
            [styles.isActive]: isActive,
          })}
        >
          {props.info}
        </div>
      </div>
    </div>
  );
}

export default UlbBox;
