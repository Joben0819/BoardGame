import classnames from 'classnames';

export default function OnelineRecordDetail(props) {
  return (
    <div className='betRecordOneline '>
      {/* <div className="betRecordKey" style={{ background: props.bg === 1 ? "#2c2c2c" : "#1a1a1a" }}> */}
      <div className='betRecordKey'>{props.mykey}</div>
      {/* <div className="betRecordValue" style={{ width: props.width + "rem", background: props.bg === 1 ? "#2c2c2c" : "#1a1a1a" }}> */}
      <div
        className={classnames('betRecordValue', {
          losebetRecordValue: props.myvalue === '输了',
          winbetRecordValue: props.myvalue !== '输了',
        })}
        style={{
          width: props.width + 'rem',
        }}
      >
        {props.myvalue}
      </div>
    </div>
  );
}
