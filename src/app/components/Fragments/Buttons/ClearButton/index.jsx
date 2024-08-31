import { useSelector } from 'react-redux';
import styles from './index.module.scss';

export default function ClearButton(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div
      data-theme={currTheme}
      onClick={props.clickMe}
      className={styles.button}
      style={{
        color: 'white',
        fontSize: props.fontSize + 'rem',
        padding: '0.025rem',
        width: props.width + 'rem',
        height: props?.height ? props.height + 'rem' : '0.23rem',

        borderRadius: '0.1rem',
        borderBottom: 'none',
        display: 'flex',
        paddingTop: '0.005rem',
        alignContent: 'center',
        justifyContent: 'center',
        margin: '0.03rem 0.075rem 0.03rem 0',
        fontWeight: props.fw + 'rem',
      }}
    >
      <span>{!props.buttonName ? '最大金额' : props.buttonName}</span>
    </div>
  );
}
