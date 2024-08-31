function TemplatedInputforUser(props) {
  return (
    <div className='templatedInputforUser'>
      <div className='templated_inputLabel'>{props.label}</div>
      <div className='templated_inputHolder'>
        <input
          type='text'
          placeholder={props.placeholder}
          onChange={props.changeMe}
          value={props.myValue}
          disabled={props.amIdisable}
          style={{ background: props.bgColor ? props.bgColor : '' }}
          readOnly={props.readOnly}
        ></input>
      </div>
    </div>
  );
}

export default TemplatedInputforUser;
