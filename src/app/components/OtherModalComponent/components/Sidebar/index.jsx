import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bankList } from 'src/api/game/gamelist';
import { popSound } from 'src/utils/audio-player';
import AlertContainer from '../../../Modal/AlertContainer';
import SideTabs from './components/sideTabs';
import WalletSlot from './components/walletSlot';

const Sidebar = ({
  omSideActive,
  setOmSideActive,
  sidetabActive,
  activityTypes,
  activeQuestSectionContent,
  beActive,
  beQuestActive,
  setSelectedQuestTypeId,
  setActiveHomeNoticesId,
  setSelectedActiTypeId,
  activeHomeNoticesId,
}) => {
  const { homeNotices } = useSelector((state) => state.gameData);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [alertBind, setAlertBind] = useState(false);
  const [bindCardMsg, setBindCardMsg] = useState('');
  const [listofBanks, setListofBanks] = useState([]);
  const [myBankList, setMyBankList] = useState([]);

  useEffect(() => {
    omSideActive === 'walletSlot' &&
      bankList().then((res) => {
        setListofBanks(res.data.data);
      });
  }, []);

  useEffect(() => {
    const updatedBankList = listofBanks?.map((data, idx) => ({
      value: data.id,
      label: (
        <span key={data.id} style={{ fontSize: '0.2rem' }}>
          <img style={{ width: '0.2rem' }} src={data.bankIcon} alt='' />
          &nbsp;{data.bankName}
        </span>
      ),
    }));
    setMyBankList(updatedBankList);
  }, [listofBanks]);

  return (
    <>
      <AlertContainer alertMe={alertBind} top={2.2} left={1.45} notify={bindCardMsg} />
      {omSideActive === 'walletSlot' ? (
        <WalletSlot
          setAlertBind={setAlertBind}
          setBindCardMsg={setBindCardMsg}
          myBankList={myBankList}
        />
      ) : (
        <SideTabs
          sidetabActive={sidetabActive}
          omSideActive={omSideActive}
          setOmSideActive={setOmSideActive}
          activityTypes={activityTypes}
          activeQuestSectionContent={activeQuestSectionContent}
          setActiveHomeNoticesId={setActiveHomeNoticesId}
          activeHomeNoticesId={activeHomeNoticesId}
          currTheme={currTheme}
          popSound={popSound}
          beActive={beActive}
          beQuestActive={beQuestActive}
          setSelectedActiTypeId={setSelectedActiTypeId}
          setSelectedQuestTypeId={setSelectedQuestTypeId}
        />
      )}
    </>
  );
};

export default Sidebar;
