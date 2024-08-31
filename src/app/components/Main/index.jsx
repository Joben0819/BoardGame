import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getMessageHomeNotices } from 'src/api/game/gamelist';
import { setAnnounceText } from 'src/reducers/gameData';
import IphoneAddScreen from '../Modal/IphoneAddScreen';
import MainContentList from './components/MainContentList';
import SideBar from './components/SideBar';
import styles from './index.module.scss';

const MainV2 = () => {
  const [showAdd, setShowAdd] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    const isSA = navigator.standalone;
    const isFirstVisit = !sessionStorage.getItem('visitedBefore');

    if (isIOS && !isSA && isFirstVisit) {
      setShowAdd(true);
      sessionStorage.setItem('visitedBefore', 'true');
    }

    getMessageHomeNotices().then((res) => {
      dispatch(setAnnounceText(res.data?.otherData));
    });
  }, []);

  return (
    <main className={styles.mainWrapper}>
      <IphoneAddScreen showing={showAdd} closeMe={() => setShowAdd(!showAdd)} />
      <SideBar />
      <MainContentList />
    </main>
  );
};

export default MainV2;
