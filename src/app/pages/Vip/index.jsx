import { useEffect, useState } from 'react';
import OtherHeader from 'src/app/components/OtherHeader/index';
import SidebarV2 from '../../components/Sidebar';
import AccountDetails from './accountDetails';
import Betting from './Betting';
import GameBalance from './gameBalance';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import soundFile from './../../data/audioData/vip.mp3';
import styles from './index.module.scss';
import Privilege from './Privilege';
import SecurityCenter from './SecurityCenter';
import VipDetails from './VipDetails';
export default function VIPPages() {
  const location = useLocation();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const isInSecurityCenter = location.state?.section === 'securityCenter';
  const isInPersonalInfo = location.state?.section === 'personalInfo';
  const list = ['VIP特权', 'VIP详情', '投注记录', '安全中心', '账户明细', '游戏余额'];
  const [activeItem, setActiveItem] = useState(isInSecurityCenter ? 3 : 0);

  const EnumTime = [
    // {
    //   value: 1,
    //   name: "today",
    //   label: "全部时间",
    // },
    {
      value: 1,
      name: 'today',
      label: '今天',
    },
    {
      value: 2,
      name: 'yesterday',
      label: '昨天',
    },
    {
      value: 3,
      name: 'month',
      label: '一个月',
    },
  ];
  const defVal = [
    // {
    //   value: 1,
    //   name: "LOTTERY_BET",
    //   label: "彩票投注",
    // },
    {
      value: 1,
      name: null,
      label: '全部交易状态',
    },
  ];

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    audioFile.play();

    return () => {
      audioFile.pause();
    };
  }, []);

  return (
    <>
      <OtherHeader title={'个人中心'} />
      <div className={styles.container} data-theme={currTheme}>
        <SidebarV2 list={list} activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className={styles.wrapper}>
          <div className={styles.content} data-theme={currTheme} data-item={activeItem}>
            {activeItem === 0 && <Privilege />}
            {activeItem === 1 && <VipDetails />}
            {activeItem === 2 && <Betting selectBrEnumTime={EnumTime} />}
            {activeItem === 3 && <SecurityCenter />}
            {activeItem === 4 && <AccountDetails selectBrEnumTime={EnumTime} defVal={defVal} />}
            {activeItem === 5 && <GameBalance />}
          </div>
        </div>
      </div>
    </>
  );
}
