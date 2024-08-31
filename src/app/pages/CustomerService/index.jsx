import { Howl } from 'howler';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PopCustomerService } from 'src/api/game/gamelist';
import { useAuth } from '../../components/Modal/LoginAuth';
import OtherHeader from '../../components/OtherHeader';
import SidebarV2 from '../../components/Sidebar';
import FAQComponent from '../FAQ';
import soundFile from './../../data/audioData/customer.mp3';
import CsIframe from './component/CsIframe';
import CsPop from './component/csPop';
import styles from './index.module.scss';
function CustomerService() {
  const [csActiveTab, setCsActiveTab] = useState(0);
  const [csPopData, setCsPopData] = useState([]);
  const [list, setList] = useState(['在线客服', '常见问题']);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const auth = useAuth();

  useEffect(() => {
    fetchCustomerService();
  }, []);

  const fetchCustomerService = () => {
    PopCustomerService().then((res) => {
      setCsPopData(res?.data?.data);
      if (res?.data?.data?.length > 0) {
        setList(['在线客服', 'POP客服', '常见问题']);
      } else {
        setList(['在线客服', '常见问题']);
      }
    });
  };

  const audioFile = new Audio(soundFile);
  // useEffect(() => {
  //   audioFile.play();
  // }, []);
  useEffect(() => {
    const sound = new Howl({
      src: [audioFile],
      loop: false,
    });
    sound.play();
  }, []);

  return (
    <div className={styles.csPage}>
      <OtherHeader title={'客户服务'} />
      <div className={styles.wrapper}>
        <SidebarV2 list={list} activeItem={csActiveTab} setActiveItem={setCsActiveTab} />
        <div className={styles.mainContent} data-theme={currTheme}>
          {csActiveTab === 0 && <CsIframe />}
          {!!csPopData?.length && csActiveTab === 1 && <CsPop csPopData={csPopData} />}
          {!csPopData?.length
            ? csActiveTab === 1 && <FAQComponent />
            : csActiveTab === 2 && <FAQComponent />}
        </div>
      </div>
    </div>
  );
}
export default CustomerService;
