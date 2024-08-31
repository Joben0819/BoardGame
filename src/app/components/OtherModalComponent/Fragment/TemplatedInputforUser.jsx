function TemplatedInputforUser(props) {
  return (
    <div className='templatedInputforUser'>
      <div className='templated_inputLabel'>{props.label}</div>
      <div className='templated_inputHolder'>
        <input type='text' placeHolder={props.placeholder} onChange={props.changeMe}></input>
      </div>
    </div>
  );
}

export default TemplatedInputforUser;
