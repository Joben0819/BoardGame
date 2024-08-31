import { useSelector } from 'react-redux';
import ButtonDesignOne from '../Fragments/Buttons/ButtonDesignOne';

export default function InputTempOne(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <div className='inputTempOne' style={{ width: props.pwidth && props.pwidth }}>
      {/* <div className="cdi_label" style={{ margin: "0.05rem 0 0 0.25rem" }}>{props.label}</div> */}

      {props.wButton === 1 ? (
        <>
          <div className='inputtemp_withbutton'>
            <input
              type='text'
              placeholder={props.placeholder}
              style={{ width: props.width + 'rem' }}
              onChange={props.onChangeText}
              value={props.value}
            />
          </div>
          <div className='inputtemp_withButtonHolder'>
            <ButtonDesignOne
              buttonName={props.buttonTitle}
              color={props.color}
              fontSize={0.1}
              padding={0.03}
              margin={0.04}
              height={0.15}
              width={0.4}
            />
          </div>
        </>
      ) : (
        <div
          className='cdi_inputHolder'
          style={{ width: props.pwidth && props.pwidth }}
          data-theme={currTheme}
        >
          <input
            onClick={props.Click}
            className='input2'
            type={props.typenum ? props.typenum : 'text'}
            placeholder={props.placeholder}
            style={{
              width: props.width ? props.width + 'rem' : props.pwidth && props.pwidth,
              height: props.height,
            }}
            onChange={props.onChangeText}
            value={props.value}
          />
        </div>
      )}
    </div>
  );
}
