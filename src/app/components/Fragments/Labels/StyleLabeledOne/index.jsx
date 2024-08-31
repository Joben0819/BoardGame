import { useSelector } from 'react-redux';
import styles from './index.module.scss';

export default function StyleLabeled1(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  return (
    <div
      data-theme={currTheme}
      className={props.style1 ? styles.styleLabel2 : styles.styleLabeled1}
      style={{
        fontWeight: props.fw,
        fontSize: props.fs + 'rem',
        textAlign: props.align,
        letterSpacing: props.letters,
        width: props.width + 'rem',
      }}
    >
      {props.labelName}
    </div>
  );
}
