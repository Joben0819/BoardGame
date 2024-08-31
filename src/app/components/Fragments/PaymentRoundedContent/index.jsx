import { useSelector } from 'react-redux';
import styles from './index.module.scss';

export default function PaymentRoundedContent(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div
      className={styles.payment_roundedContent}
      data-theme={currTheme}
      bet-data={props.betData}
      style={{
        border: props.bg === 1 ? 'none' : props.betData === 'dblue' ? 'none' : props.border,
        width: props.width + 'rem',
        background:
          props.bg === 1 && currTheme === 'darkBlue'
            ? 'linear-gradient(to bottom,#29468D,#162752)'
            : props.bg === 1
            ? 'linear-gradient(to top,#018B57,#11D38A)'
            : props.bg === 2
            ? 'linear-gradient(to top,#FA6653,#F49E97)'
            : '',
        color: props.bg === 1 ? '#fff' : '',
        fontSize: props.fs + 'rem',
        letterSpacing: '-0.01rem',
        padding: props.padding,
        height: props.height ? props.height : '',
      }}
    >
      {props.content}
    </div>
  );
}
