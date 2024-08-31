import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GiftBoxModal from '../../../OtherModalComponent';
import styles from './index.module.scss';

const Announce = ({ type }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { announceText } = useSelector((state) => state.gameData);
  const [audioIcon, setAudioIcon] = useState('blackGold');
  const [isHovered, setIsHovered] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);
  const [omOpen, setOmOpen] = useState(false);

  useEffect(() => {
    setAudioIcon(currTheme);
  }, [currTheme]);

  useEffect(() => {
    setAnimationDuration(announceText?.length / 3);
  }, [announceText]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (type === 4) return null;
  return (
    <>
      <GiftBoxModal
        open={omOpen}
        onClose={() => {
          setOmOpen(!omOpen);
        }}
        activesideTab={3}
        isSettings={false}
      />

      <div className={styles.announceContainer}>
        <div className={styles.announceBar}>
          <img src={require(`src/app/assets/${audioIcon}/main/audio_icon.png`)} alt='AudioIcon' />
          <div
            className={styles.announceTextWrapper}
            onClick={() => setOmOpen(true)}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
          >
            {/* <div className="move_wrapper" style={{ animationDuration: `${announceText.length / 10}s` }} > */}
            <div
              className={classnames({
                [styles.moveTextItem]: true,
                [styles.pausedAnnounce]: isHovered,
              })}
              style={{ animationDuration: `${animationDuration}s` }}
            >
              {announceText
                ? announceText
                : '充值，成功率 100%，到账速度快，还享有额外的入款优惠！祝您旗开得胜！'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announce;
