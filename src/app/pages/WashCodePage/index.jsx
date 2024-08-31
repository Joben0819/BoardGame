import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OtherHeader from '../../components/OtherHeader';
import SidebarV2 from '../../components/Sidebar';
import soundFile from './../../data/audioData/cleancode.mp3';
import CodeWashingRatio from './CodeWashingRatio';
import CodeWashingRecord from './CodeWashingRecord';
import SelfServiceCW from './SelfServiceCW';
import styles from './index.module.scss';

export default function WashCodePage() {
  const [washSideAct, setwashSideAct] = useState(0);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const list = ['自助洗码', '洗码记录', '洗码比例'];

  function handleClickSide(index) {
    setwashSideAct(index);
  }

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    audioFile.play();
  }, []);

  return (
    <>
      <div className={styles.washCodePage}>
        <OtherHeader title={'洗码'} />
        <div className={styles.wrapper}>
          <SidebarV2 list={list} activeItem={washSideAct} setActiveItem={setwashSideAct} />
          <div className={styles.mainContent} data-theme={currTheme}>
            {washSideAct === 0 && <SelfServiceCW />}
            {washSideAct === 1 && <CodeWashingRecord />}
            {washSideAct === 2 && <CodeWashingRatio />}
          </div>
        </div>
      </div>
    </>
  );
}
