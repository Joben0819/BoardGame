import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getGameCategoryList, getGameDataList } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';

import { motion } from 'framer-motion';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { BettingRecordData } from './../../../data/Tables/BettingRecordData';
import styles from './index.module.scss';

export default function Betting({ selectBrEnumTime }) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [RecordData, setRecordData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  //this is for getting the name for the other api
  const [RecordName, setRecordName] = useState('LOTTERY');
  const [tableData, setTableData] = useState([]);
  const [select, setSelect] = useState({});

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflowY = 'hidden';
    }
    return () => {
      if (body) {
        body.style.overflowY = '';
      }
    };
  }, []);

  useEffect(() => {
    async function fetchGameCategoryList() {
      const { data } = await getGameCategoryList();
      setRecordData(data);
      const selects = {};
      data.forEach((c) => {
        selects[c.des] = selectBrEnumTime[0];
      });
      setSelect(selects);
    }
    fetchGameCategoryList();
  }, []);

  useEffect(() => {
    const dateFilter = select[RecordData[activeTab]?.des]?.name;
    async function fetchGameDataList() {
      const { data } = await getGameDataList(RecordName, dateFilter);
      setTableData(data);
    }
    fetchGameDataList();
  }, [RecordName, select, RecordData, activeTab]);

  useEffect(() => {
    var item = document.getElementById('bettingRecord_roundedTabs');

    item.addEventListener('wheel', function (e) {
      if (e.deltaY > 0) item.scrollLeft += 100;
      else item.scrollLeft -= 100;
    });
  }, []);

  const reloadData = async () => {
    const dateFilter = select[RecordData[activeTab]?.des]?.name;
    const { data } = await getGameDataList(RecordName, dateFilter);

    if (!Array.isArray(data)) return;
    setTableData(data);
  };

  function ChangeSelectBrName(selected) {
    const currentSelect = RecordData[activeTab].des;

    setSelect((prev) => ({
      ...prev,
      [currentSelect]: selected,
    }));
  }

  return (
    <div className={styles.container} data-theme={currTheme}>
      <div className={styles.bettingRecord_wrapper}>
        <div
          id='bettingRecord_roundedTabs'
          style={{ marginBottom: '0.12rem' }}
          className={styles.bettingRecord_roundedTabs}
        >
          <ul>
            {RecordData.length > 0 && (
              <motion.div
                className={`${styles.liActive} ${styles.activeNav}`}
                animate={{
                  left: `${0.9 * activeTab}rem`,
                }}
              >
                <div data-theme={currTheme} className={styles.bettingRecord_roundtabActive} />
              </motion.div>
            )}

            {RecordData?.map((brData, index) => {
              return (
                <li
                  key={index}
                  className={activeTab === index ? styles.liActive : ''}
                  onClick={() => {
                    setActiveTab(index);
                    setRecordName(brData?.name);
                  }}
                >
                  <div
                    data-theme={currTheme}
                    className={
                      activeTab === index
                        ? styles.bettingRecord_roundtabActive
                        : styles.bettingRecord_roundtab
                    }
                  >
                    <span>{brData.des}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={styles.bettingRecord_dropdownContainer}
          style={{ marginBottom: '0.075rem' }}
        >
          <div className={styles.bettingRecord_dropdownLabel}>交易时间</div>
          <div className={styles.bettingRecordDropdown} data-theme={currTheme}>
            <ReactSelect
              options={selectBrEnumTime}
              className={'vipSelectdd'}
              onChange={(selected) => ChangeSelectBrName(selected)}
              defaultValue={selectBrEnumTime[0]}
              value={select[RecordData[activeTab]?.des]}
              classNamePrefix={'vipSelectdd'}
              isSearchable={false}
            />
          </div>
        </div>
        <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
          <div
            className={styles.tableHolder}
            style={{
              width: '100%',
              // height: "auto",
              overflowY: 'scroll',
              // height: tableData?.length === 0 ? "9%" : "100%",
            }}
          >
            <BasicTable headerData={BettingRecordData} basicData={tableData} />
          </div>
          {tableData?.length === 0 && (
            <div className={styles.noDataWrapper}>
              <NoData />
            </div>
          )}
        </PullToRefresh>
      </div>
    </div>
  );
}
