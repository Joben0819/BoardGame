import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChips } from 'src/reducers/baccarat';
import { BaccaratContext } from '../..';
import { chips } from '../ChipSection/data';
import styles from './SelectChipsModal.module.scss';

const SelectChipsModal = ({ isShow }) => {
  const { setIsShowSelectChipsModal } = React.useContext(BaccaratContext);
  const [selectedToken, setSelectedToken] = useState([]);
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);

  const handleChipSelect = (chip) => {
    setSelectedToken((prevState) => {
      if (prevState.length <= 5) {
        if (prevState.find((el) => el.key === chip.key)) {
          return prevState.filter((el) => el.key !== chip.key);
        } else {
          return [...prevState, chip];
        }
      }
      if (prevState.length === 6) {
        if (prevState.find((el) => el.key === chip.key)) {
          return prevState.filter((el) => el.key !== chip.key);
        }
      }
      return prevState;
    });
  };

  useEffect(() => {
    // if(selectedToken.length === 5){
    //     dispatch(setSelectedChips(selectedToken));
    // }
  }, [selectedToken]);

  return isShow ? (
    <div className={styles.backDrop}>
      <div className={styles.modalContainer} data-theme={currTheme}>
        <div className={styles.header}>
          <span>请选择6个自定义筹码</span>
          <img
            onClick={() => {
              setSelectedToken([]);
              setIsShowSelectChipsModal(false);
            }}
            src={require(`../../../../../assets/${currTheme}/other_modal/othermodal_xbtn.png`)}
            alt='Other Modal Icon'
          />
        </div>
        <div className={styles.body}>
          <div className={styles.chipsContainer}>
            {chips.map((chip, index) => (
              <img
                className={classnames({
                  [styles.selected]: !!selectedToken.find((el) => el.key === chip.key),
                })}
                onClick={() => handleChipSelect(chip)}
                key={index}
                src={chip.src}
                alt='chip'
              />
            ))}
          </div>
          <div
            onClick={() => {
              setSelectedToken([]);
              setIsShowSelectChipsModal(false);
              dispatch(setSelectedChips(selectedToken));
            }}
            className={classnames(styles.selectButton, {
              [styles.disabled]: selectedToken.length !== 6,
            })}
          >
            <span>确认</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default SelectChipsModal;
