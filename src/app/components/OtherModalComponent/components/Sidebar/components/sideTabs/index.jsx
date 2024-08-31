import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeNotices } from 'src/reducers/gameData';
import { Folder_env } from 'src/utils/helpers';
import styles from './style.module.scss';

const listItems = [
  { id: 0, title: '个人信息' },
  { id: 1, title: '音乐切换' },
  { id: 2, title: '修改密码' },
  { id: 3, title: '网站详情' },
  { id: 4, title: '改变主题', condition: !Folder_env('8803') },
];

const SideTabs = (props) => {
  const {
    sidetabActive,
    omSideActive,
    setOmSideActive,
    activityTypes,
    activeQuestSectionContent,
    setActiveHomeNoticesId,
    activeHomeNoticesId,
    popSound,
    beActive,
    setSelectedActiTypeId,
    setSelectedQuestTypeId,
    beQuestActive,
    // setClicker,
  } = props;
  const dispatch = useDispatch();
  const { homeNotices } = useSelector((state) => state.gameData);
  const handleSetActive = (index) => setOmSideActive(index);

  const ListItem = ({ index, activeIndex, title }) => (
    <li
      onClick={() => handleSetClick(index)}
      className={classnames({ [styles.active]: activeIndex === index })}
    >
      <span>{title}</span>
    </li>
  );

  const handleSetClick = (index) => {
    popSound();
    handleSetActive(index);
  };

  return (
    <div className={styles.sidebarContainer}>
      <ul>
        {sidetabActive === 1 ? (
          activityTypes?.map((activityTab, index) => {
            return (
              <li
                key={activityTab.id}
                onClick={() => {
                  beActive(index, activityTab);
                  setSelectedActiTypeId(activityTab.id);
                  popSound();
                }}
                className={classnames({
                  [styles.active]: omSideActive === index,
                })}
              >
                <span>{activityTab.name}</span>
              </li>
            );
          })
        ) : sidetabActive === 2 ? (
          activeQuestSectionContent?.map((activityTab, index) => (
            <li
              key={index}
              onClick={() => {
                popSound();
                beQuestActive(index, activityTab);
                setSelectedQuestTypeId(activityTab.id);
                // setClicker(0);
              }}
              className={classnames({
                [styles.active]: omSideActive === index,
              })}
            >
              <span style={{ fontSize: '0.15rem' }}>{activityTab.name}</span>
            </li>
          ))
        ) : sidetabActive === 3 ? (
          homeNotices?.map((homeNotice, index) => (
            <li
              key={index}
              onClick={() => {
                popSound();
                setActiveHomeNoticesId(homeNotice.id);
                const updatedHomeNotices = homeNotices?.map((notice) =>
                  notice?.id === homeNotice?.id ? { ...notice, isRead: true } : notice
                );
                dispatch(setHomeNotices(updatedHomeNotices));
              }}
              className={classnames(styles.homeNoticeItem, {
                [styles.active]: activeHomeNoticesId === homeNotice.id,
              })}
            >
              {!homeNotice?.isRead && <s />}
              <span className='homeNotices'>{homeNotice.title}</span>
            </li>
          ))
        ) : sidetabActive === 4 ? (
          <>
            {listItems.map(
              (item, index) =>
                (item.condition === undefined || item.condition) && (
                  <ListItem
                    key={index}
                    index={item.id}
                    activeIndex={omSideActive}
                    handleSetActive={handleSetActive}
                    title={item.title}
                  />
                )
            )}
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default SideTabs;
