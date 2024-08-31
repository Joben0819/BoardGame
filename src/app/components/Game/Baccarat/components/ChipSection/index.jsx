import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BaccaratContext } from '../..';
import styles from './index.module.scss';

const ChipSection = () => {
  const { setChosenChip, setIsShowSelectChipsModal } = React.useContext(BaccaratContext);
  const { selectedChips } = useSelector((state) => state.baccarat);
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    setChosenChip(selectedChips[activeChip]);
  }, [selectedChips]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.chipHolderBg}>
        <div className={styles.chipsContainer}>
          {selectedChips &&
            selectedChips.map((chip, index) => {
              return (
                <img
                  src={chip.src}
                  key={index}
                  className={classnames({
                    [styles.isActive]: index === activeChip,
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setChosenChip(chip);
                    setActiveChip(index);
                  }}
                  alt='Chip selected'
                />
              );
            })}
        </div>
      </div>
      <div onClick={() => setIsShowSelectChipsModal(true)} className={styles.selectChipsBtn}>
        <span style={{ paddingTop: '0.01rem' }}>选择筹码</span>
      </div>
    </div>
  );
};

export default ChipSection;
