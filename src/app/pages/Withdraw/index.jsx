import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OtherHeader from 'src/app/components/OtherHeader';
import SidebarV2 from 'src/app/components/Sidebar';
import { isLoggedIn } from 'src/utils/helpers';
import soundFile from './../../data/audioData/withdraw.mp3';
import BindCards from './components/BindCards';
import CashWithdrawalRecord from './components/CashWithdrawRecord';
import CodingDetails from './components/CodingDetails';
import SelfWithdrawal from './components/SelfWithdrawal';
import SuccessWithdrawModal from './components/SuccessWithdrawModal';
import styles from './index.module.scss';

const Withdraw = () => {
  const { showWithdrawSuccessModal, currTheme } = useSelector((state) => state.gameSettings);
  const list = ['自主提现', '打码详情', '钱包管理', '提现记录'];
  const [activeItem, setActiveItem] = useState(0);
  const takeMe = useNavigate();

  if (!isLoggedIn()) {
    takeMe('/');
  }

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    audioFile.play();

    return () => {
      audioFile.pause();
    };
  }, []);

  return (
    isLoggedIn() && (
      <>
        {showWithdrawSuccessModal && <SuccessWithdrawModal />}
        <div className={styles.withdrawPageWrapper}>
          <OtherHeader title={'提现'} />
          <div className={styles.withdrawContentWrapper} data-theme={currTheme}>
            <SidebarV2 list={list} activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className={styles.withdrawContents}>
              {activeItem === 0 && <SelfWithdrawal />}
              {activeItem === 1 && <CodingDetails />}
              {activeItem === 2 && <BindCards />}
              {activeItem === 3 && <CashWithdrawalRecord />}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Withdraw;
