import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowLoginModal } from 'src/reducers/gameSettings';
import { popSound } from 'src/utils/audio-player';
import { isLoggedIn } from 'src/utils/helpers';
import styles from './index.module.scss';

function SideTabComponents({ setSidetabActive, sidetabActive }) {
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { homeNotices } = useSelector((state) => state.gameData);
  const [allIsRead, setAllIsRead] = useState(false);

  useEffect(() => {
    const allIsRead = homeNotices && homeNotices?.every((obj) => obj.isRead === true);
    if (allIsRead && homeNotices) {
      setAllIsRead(true);
    } else {
      setAllIsRead(false);
    }
  }, [homeNotices]);

  return (
    <>
      <div
        data-theme={currTheme}
        onClick={() => {
          popSound();
          setSidetabActive(1);
        }}
        className={sidetabActive === 1 ? styles.otherModal_sideActive : styles.otherModal_sidetab}
      >
        活动
      </div>

      <div
        data-theme={currTheme}
        onClick={() => {
          popSound();
          if (!isLoggedIn()) {
            dispatch(setShowLoginModal(true));
          } else {
            setSidetabActive(2);
          }
        }}
        className={sidetabActive === 2 ? styles.otherModal_sideActive : styles.otherModal_sidetab}
      >
        任务
      </div>

      <div
        data-theme={currTheme}
        onClick={() => {
          popSound();
          setSidetabActive(3);
        }}
        className={classnames(
          styles.homeNoticesTab,
          sidetabActive === 3 ? styles.otherModal_sideActive : styles.otherModal_sidetab
        )}
      >
        {!allIsRead ? <s /> : null}
        公告
      </div>
    </>
  );
}

export default SideTabComponents;
