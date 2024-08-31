import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivityInfos,
  getActivityQuestInfos,
  getActivityQuestTypes,
  getActivityTypes,
  getMessageHomeNotices,
} from 'src/api/game/gamelist';
import { setHomeNotices } from 'src/reducers/gameData';
import { setShowOtherModalComp } from 'src/reducers/gameSettings';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import ContentSetting from './components/Content';
import HeaderSetting from './components/Header';
import Sidebar from './components/Sidebar';
import SideTabComponents from './SideTabComponents/SideTabComponents';

import styles from './index.module.scss';

const OtherModalComp = ({ open, onClose, activesideTab, activeSection, notLogin, isSettings }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { homeNotices } = useSelector((state) => state.gameData);
  const dispatch = useDispatch();
  const [omSideActive, setOmSideActive] = useState(activeSection);
  const [sidetabActive, setSidetabActive] = useState(activesideTab);
  const [activityTypes, setActivityTypes] = useState([]);
  const [activityTypesLists, setActivityTypesLists] = useState([]);

  const [activeQuestSectionContent, setActiveQuestSectionContent] = useState([]);
  const [activeQuestSectionInfo, setActiveQuestSectionInfo] = useState([]);

  // const [activeQuestSectionItem, setActiveQuestSectionItem] = useState([]);

  // HomeNotice Sidebar && content
  const [activeHomeNotices, setActiveHomeNotices] = useState([]);
  const [activeHomeNoticesId, setActiveHomeNoticesId] = useState([]);
  // const [activeSectionContent, setActiveSectionContent] = useState([]);

  const [activityInfoContent, setActivityInfoContent] = useState([]);

  const [selectedActiTypeId, setSelectedActiTypeId] = useState();
  const [selectedQuestTypeId, setSelectedQuestTypeId] = useState();

  // const [clicker, setClicker] = useState(0);

  // useEffect(() => {}, [clicker]);

  // function handleSwitched() {
  //   setClicker(1);
  // }

  useEffect(() => {
    const fetchActivityInfo = async () => {
      if (activityTypes?.length > 0) {
        setSelectedActiTypeId(activityTypes[0]?.id);

        try {
          const promises = activityTypes.map(async (activityType) => {
            const res = await getActivityInfos(activityType?.id);
            return { id: activityType?.id, list: res.data.data };
          });

          const results = await Promise.all(promises);
          setActivityTypesLists(results);
        } catch (err) {
          console.error('Error', err);
        }
      }
    };

    fetchActivityInfo();
  }, [activityTypes]);

  useEffect(() => {
    if (open) {
      setSidetabActive(activesideTab);
    }
  }, [open]);

  // for resetting activityType tabs and quest tabs when changing sideTabActive
  useEffect(() => {
    const fetchData = async () => {
      try {
        setOmSideActive(0);
        setSelectedActiTypeId(activityTypes[0]?.id);

        const questTypesRes = await getActivityQuestTypes();
        const questTypes = questTypesRes.data.data;
        setActiveQuestSectionContent(questTypes);
        setSelectedQuestTypeId(questTypes?.[0]?.id);

        if (questTypes?.[0]?.id) {
          const questInfosRes = await getActivityQuestInfos(questTypes[0].id);
          setActiveQuestSectionInfo(questInfosRes.data.data);
        }

        setActiveHomeNoticesId(activeHomeNotices[0]?.id);
      } catch (err) {
        console.error('Error', err);
      }
    };

    fetchData();
  }, [sidetabActive]);

  //This gets data from the backend
  useEffect(() => {
    const fetchActivityTypes = async () => {
      try {
        const res = await getActivityTypes();
        setActivityTypes(res.data.data);
      } catch (err) {
        console.error('Error', err);
      }
    };

    fetchActivityTypes();
  }, []);

  useEffect(() => {
    const fetchActivityInfos = async () => {
      if (selectedActiTypeId) {
        try {
          const res = await getActivityInfos(selectedActiTypeId);
          setActivityInfoContent(res.data.data);
        } catch (err) {
          console.error('Error', err);
        }
      }
    };

    fetchActivityInfos();
  }, [selectedActiTypeId]);

  useEffect(() => {
    const fetchActivityQuest = async () => {
      try {
        const questTypesRes = await getActivityQuestTypes();
        const questTypes = questTypesRes.data.data;
        setActiveQuestSectionContent(questTypes);

        if (questTypes && questTypes[0]) {
          const questInfosRes = await getActivityQuestInfos(questTypes[0].id);
          setActiveQuestSectionInfo(questInfosRes.data.data);
        }
      } catch (err) {
        console.error('Error', err);
      }
    };

    fetchActivityQuest();
  }, []);

  useEffect(() => {
    const fetchActivityQuest = async () => {
      if (selectedQuestTypeId) {
        try {
          const res = await getActivityQuestInfos(selectedQuestTypeId);
          setActiveQuestSectionInfo(res.data.data);
        } catch (err) {
          console.error('Error', err);
        }
      }
    };

    fetchActivityQuest();
  }, [selectedQuestTypeId]);

  const reloadDataone = async () => {
    try {
      const res = await getActivityTypes();
      setActivityTypes(res.data.data);
    } catch (err) {
      console.error('Error', err);
    }
  };

  const reloadData = async () => {
    try {
      const res = await getMessageHomeNotices();
      const notices = res.data.data;
      setActiveHomeNotices(notices);
      setActiveHomeNoticesId(notices[0]?.id);
      const transformedNotices = notices.map((homeNotice, idx) => {
        const existingNotice = homeNotices.find(
          (homeNoticeReducer) => homeNoticeReducer?.id === homeNotice?.id
        );
        return { ...homeNotice, isRead: existingNotice ? existingNotice.isRead : false };
      });
      dispatch(setHomeNotices(transformedNotices));
    } catch (err) {
      console.error('Error', err);
    }
  };

  useEffect(() => {
    // isLoggedIn() &&
    const fetchMessageNotices = async () => {
      try {
        const res = await getMessageHomeNotices();
        const notices = res.data?.data;
        if (!homeNotices || homeNotices.length === 0) {
          const transformedNotices = notices.map((homeNotice, idx) => ({
            ...homeNotice,
            isRead: idx === 0,
          }));
          dispatch(setHomeNotices(transformedNotices));
        }
        setActiveHomeNotices(notices);
        setActiveHomeNoticesId(notices[0]?.id);
      } catch (err) {
        console.error('Error', err);
      }
    };

    fetchMessageNotices();
  }, []);

  function beActive(index) {
    setOmSideActive('');
    setOmSideActive(index);
  }

  function beQuestActive(index) {
    setOmSideActive('');
    setOmSideActive(index);
  }

  function handleClose(activesideTab) {
    setSidetabActive(activesideTab);
    dispatch(setShowOtherModalComp(false));
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={MODAL_BG_ANIMATION}
          initial='hidden'
          animate='visible'
          exit='exit'
          className={styles.giftBoxModal_overlay}
        >
          <motion.div
            variants={MODAL_CONTENT_ANIMATION}
            initial='hidden'
            animate='visible'
            exit='exit'
            className={styles.giftBoxModal_wrapper}
            style={{
              marginLeft: activeSection === 'walletSlot' ? '2%' : '',
              marginTop: activeSection === 'walletSlot' ? '-4%' : '',
            }}
            data-theme={currTheme}
          >
            {/* Header */}
            <HeaderSetting
              sidetabActive={sidetabActive}
              handleClose={() => handleClose(sidetabActive)}
            />

            {/* BodyContainer */}
            <div className={styles.otherModal_container} data-theme={currTheme}>
              {/* This is the sidebar */}

              <Sidebar
                omSideActive={omSideActive}
                setOmSideActive={setOmSideActive}
                sidetabActive={sidetabActive}
                activityTypes={activityTypes}
                activeQuestSectionContent={activeQuestSectionContent}
                activeHomeNoticesId={activeHomeNoticesId ?? activeHomeNotices?.[0]?.id}
                setActiveHomeNoticesId={setActiveHomeNoticesId}
                beActive={beActive}
                setSelectedActiTypeId={setSelectedActiTypeId}
                beQuestActive={beQuestActive}
                setSelectedQuestTypeId={setSelectedQuestTypeId}
              />
              <ContentSetting
                sidetabActive={sidetabActive}
                activityTypes={activityTypes}
                omSideActive={omSideActive}
                activityInfoContent={activityInfoContent}
                activityTypesLists={activityTypesLists}
                selectedActiTypeId={selectedActiTypeId}
                activeQuestSectionInfo={activeQuestSectionInfo}
                activeHomeNoticesId={activeHomeNoticesId ?? activeHomeNotices?.[0]?.id}
                onClose={onClose}
                reloadData={reloadData}
                reloadDataone={reloadDataone}
              />
            </div>

            {/* This is the sidetabs of the other modal */}
            {!isSettings && (
              <div className={styles.otherModal_sideTabs}>
                {sidetabActive !== 4 && (
                  <SideTabComponents
                    notLogin={notLogin}
                    sidetabActive={sidetabActive}
                    setSidetabActive={setSidetabActive}
                  />
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OtherModalComp;
