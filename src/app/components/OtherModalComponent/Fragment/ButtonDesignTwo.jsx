import { useSelector } from 'react-redux';

export default function ButtonDesignTwo(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div
      onClick={props.clickMe}
      className='buttonDesignTwo d-flex just-space-cent'
      style={{
        padding: props.padding + 'rem',
        margin: props.margin + 'rem',
        width: props.width + 'rem',
        height: props.height + 'rem',
        fontWeight: props.fwm,
        fontSize: props.fs + 'rem',
        borderRadius: props.brad + 'rem',
      }}
      data-theme={currTheme}
    >
      <span>{props.buttonName}</span>
    </div>
  );
}
