import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import styles from './index.module.scss';

export default function ButtonDesignOne(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const location = useLocation();

  return (
    <div
      data-theme={currTheme}
      onClick={props.clickMe}
      bet-data={props.butcolor}
      className={classnames('buttonDesignOne', [styles.buttonDesignOne])}
      style={{
        fontSize: props.fontSize + 'rem',
        padding: props.padding ? props.padding : '0.025rem',
        width: props.width + 'rem',
        height: props?.height ? props.height + 'rem' : '0.23rem',
        background: props.bgColor,
        // color: props.textColor,
        borderBottom: 'none',

        margin: '0.03rem',
        fontWeight: props.fw + 'rem',
      }}
    >
      <span style={{ color: props.white ? 'white' : '' }}>
        {!props.buttonName ? '最大金额' : props.buttonName}
      </span>
    </div>
  );
}
