import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoginModal } from 'src/reducers/gameSettings';
import { updateBalance } from 'src/reducers/userInfo';
import { popSound } from 'src/utils/audio-player';
import { isLoggedIn } from 'src/utils/helpers';
import coinIcon from '../../assets/blackGold/header/coin.png';
import styles from './index.module.scss';

function CoinPurse(props) {
  const { userBalance } = useSelector((state) => state.userInfo);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const dispatch = useDispatch();
  const [animateSpin, setAnimateSpin] = useState(false);

  useEffect(() => {
    let spinTimer = setTimeout(() => setAnimateSpin(false), 500);
    return () => {
      clearTimeout(spinTimer);
    };
  }, [animateSpin]);

  return (
    <>
      <div
        className={styles.coinpurse_wrapper}
        style={{
          color: props.Icolor ? props.Icolor : 'white',
          position: props.posi ? props.posi : 'relative',
          top: props.top,
          left: props.hleft,
        }}
      >
        <img src={coinIcon} className={styles.img2} alt='' />

        {!props.betlog && (
          <div className={styles.coinInput2}>
            <input
              className='txt-cent point-coin'
              value={isLoggedIn() ? userBalance : 0}
              disabled={true}
              style={{
                background: props.inputBg,
                width: '90%',
                color: props.Icolor,
              }}
            ></input>
          </div>
        )}
      </div>
      {props.noShuffle ? (
        <></>
      ) : (
        <div className={classnames(styles.shuffles, { shuffleSpin: animateSpin })}>
          <img
            onClick={() => {
              popSound();
              if (!isLoggedIn()) {
                dispatch(setShowLoginModal(true));
              } else {
                setAnimateSpin(true);
                dispatch(updateBalance());
              }
            }}
            src={require(`../../assets/${currTheme}/header/reload.png`)}
            alt=''
            style={{ left: props.left }}
          />
        </div>
      )}
    </>
  );
}

export default CoinPurse;
