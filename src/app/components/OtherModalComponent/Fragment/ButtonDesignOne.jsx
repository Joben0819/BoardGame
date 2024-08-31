export default function ButtonDesignOne(props) {
  return (
    <div
      bet-data={props.butcolor}
      onClick={props.clickMe}
      className='buttonDesignOne'
      style={{
        color: props.color,
        fontSize: props.fontSize + 'rem',
        padding: '0.025rem',
        width: props.width + 'rem',
        height: '0.23rem',
        background: props.bgColor,
        color: props.textColor,
        borderBottom: 'none',
        margin: '0.03rem',
        fontWeight: props.fw + 'rem',
      }}
    >
      <span bet-data={props.butcolor} style={{ color: props.butcolor + ' !important' }}>
        {!props.buttonName ? '最大金额' : props.buttonName}
      </span>
    </div>
  );
}
