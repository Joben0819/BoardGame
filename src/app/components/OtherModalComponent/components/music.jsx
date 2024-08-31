import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameVolume } from 'src/reducers/gameSettings';
import { setVolume } from 'src/utils/audio-player';

function Music() {
  const { gameVolume } = useSelector((state) => state.gameSettings);
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(false);
  const [valv, setvalv] = useState(gameVolume);

  const volumeOnChange = () => {
    setVolume(Number.isInteger(valv) ? valv / 100 : 1);
    var slider = document.getElementById('myRange');
    slider.oninput = function () {
      setvalv(Number(this.value));
      dispatch(setGameVolume(Number(this.value)));
    };
  };
  useEffect(() => {
    setvalv(Number(gameVolume));
    setVolume(Number.isInteger(valv) ? valv / 100 : 1);
  }, [gameVolume]);

  var xx = sessionStorage.getItem('Vol');

  return (
    <div className='d-flex just-space-around al-items wd-100' style={{ gap: '0.1rem' }}>
      <input
        type='range'
        min='0'
        max='100'
        className='styled-slider '
        value={valv}
        onChange={volumeOnChange}
        id='myRange'
        style={{ backgroundSize: `${valv === undefined ? 100 : valv}% 100%` }}
      />
      <img
        style={{ height: '0.2rem', width: '0.25rem' }}
        className='muteIcon'
        src={
          xx === '0'
            ? require('./../../../assets/Music/no-sound.png')
            : require('./../../../assets/Music/have-sound.png')
        }
        alt='music'
        id='muted'
        onClick={() => {
          setIsMuted(!isMuted);
          dispatch(setGameVolume(Number(xx) > 0 ? 0 : 100));
        }}
      />
    </div>
  );
}

export default Music;
