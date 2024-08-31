import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendDetail } from 'src/api/game/gamelist';
import OtherHeader from '../../components/OtherHeader';
import SidebarV2 from '../../components/Sidebar';
import soundFile from './../../data/audioData/promotion.mp3';
import CollectionRecord from './CollectionRecord';
import styles from './index.module.scss';
import MyPromotion from './MyPromotion';
import PerformanceInquiry from './PerformanceInquiry';
export default function PromotionAgent() {
  const list = ['我的推广', '领取记录', '业绩查询'];
  const [activeItem, setActiveItem] = useState(0);
  const [recommendDetailData, setRecommendDetailData] = useState([]);

  const ThisPage = useLocation();
  const takeMe = useNavigate();

  useEffect(() => {
    updateRecommendDetail();
  }, []);

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    audioFile.play();
  }, []);

  const updateRecommendDetail = () => {
    getRecommendDetail().then((res) => {
      setRecommendDetailData(res.data.data);
    });
  };

  const goToShare = () => {
    takeMe('/Share', {
      state: {
        page: 'sharePage',
        imageBackground: recommendDetailData.shareIcon,
      },
    });
  };

  useEffect(() => {
    //     var w = window.innerWidth;
    // var h = window.innerHeight;
    // // document.getElementById("Promote").style.width = w + "px";
    // document.getElementById("Promote").style.height = h + "px";
    // document.getElementById("Promote").style.height =
    // (window.orientation === 0 ? window.innerWidth : window.innerHeight) +
    // "px";
    // document.getElementById("Promote").style.width =
    // (window.orientation === 0 ? window.innerHeight : window.innerWidth) +
    // "px";
  }, []);

  return (
    <>
      <div className={styles.container} id='Promote'>
        <OtherHeader title='推广代理' share={true} clickMe={goToShare} zindex={10} />
        <div className={styles.wrapper}>
          <SidebarV2 list={list} activeItem={activeItem} setActiveItem={setActiveItem} />
          <div className={styles.contentWrapper + ' wd-78'}>
            {activeItem === 0 && (
              <MyPromotion
                recommendDetailData={recommendDetailData}
                updateRecommendDetail={updateRecommendDetail}
              />
            )}
            {activeItem === 1 && <CollectionRecord />}
            {activeItem === 2 && <PerformanceInquiry />}
          </div>
        </div>
      </div>
    </>
  );
}
