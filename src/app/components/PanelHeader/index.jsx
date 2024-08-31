import { useSelector } from 'react-redux';
import styles from './index.module.scss';

const PanelHeader = ({ title, type = 'default', tabs, active = 0, badge, onClick }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div className={styles.panelHeaderWrapper} data-theme={currTheme} data-type={type}>
      {type === 'default' && <span>{title}</span>}
      {!!tabs &&
        !!tabs.length &&
        tabs.map((tab) => (
          <span
            data-isactive={active === tab.id}
            key={tab.id}
            data-id={tab.id}
            onClick={() => onClick(tab.id)}
          >
            {tab?.tabName}
            {!!badge && <p>{badge}</p>}
          </span>
        ))}
    </div>
  );
};

export default PanelHeader;
