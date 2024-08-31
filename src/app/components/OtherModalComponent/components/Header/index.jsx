import { useSelector } from 'react-redux';
import { Folder_env } from 'src/utils/helpers';
import styles from './style.module.scss';

const HeaderSetting = ({ sidetabActive, handleClose }) => {
  const { domainName } = useSelector((state) => state.gameData);
  const { currTheme, omSideActive } = useSelector((state) => state.gameSettings);

  const logoIcon = require(`../../../../../variants/${process.env.REACT_APP_SITE}/modal_logo.png`);

  const renderContent = () => {
    if (sidetabActive === 4) {
      return (
        <div className={styles.headerTitle}>
          <div className={styles.text}>设置</div>
        </div>
      );
    } else if (omSideActive === 'walletSlot') {
      return <div className={styles.walletSlot_header}>绑定银行卡</div>;
    } else {
      return (
        <div className={styles.logoContainer}>
          <img src={logoIcon} alt='Ky' className={styles.logoIcon} />
          {/*<div className={styles.popLogo_99}>{domainName}</div>*/}
        </div>
      );
    }
  };

  return (
    <div className={styles.headerContainer} data-theme={currTheme}>
      {renderContent()}
      <span onClick={handleClose} className={styles.closeBtn} />
    </div>
  );
};

export default HeaderSetting;
