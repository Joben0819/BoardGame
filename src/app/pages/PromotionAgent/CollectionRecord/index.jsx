import { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getRecommendRewardDetailList } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';

import { useSelector } from 'react-redux';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { CollectionRecordTableHeader } from 'src/app/data/Tables/CollectionRecordTableHeader';
import styles from './index.module.scss';

export default function CollectionRecord() {
  const [CollectionRecordTableData, setCollectionRecordTableData] = useState([]);
  const { currTheme } = useSelector((state) => state.gameSettings);

  useEffect(() => {
    getRecommendRewardDetailList().then((res) => {
      setCollectionRecordTableData(res.data.data);
    });
  }, []);

  const reloadData = async () => {
    getRecommendRewardDetailList().then((res) => {
      setCollectionRecordTableData(res.data.data);
    });
  };

  return (
    <>
      <div className={styles.container}>
        {/* <div className={styles.collectionRecord_wrapper}> */}
        <div className={styles.collectionRecord}>
          <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
            <div className={styles.collectionRecordTableContainer} data-theme={currTheme}>
              <BasicTable
                headerData={CollectionRecordTableHeader}
                basicData={CollectionRecordTableData ? CollectionRecordTableData : []}
              />
              {!CollectionRecordTableData ||
                (CollectionRecordTableData?.length <= 0 && (
                  <div className={styles.noDataWrapper}>
                    <NoData />
                  </div>
                ))}
            </div>
          </PullToRefresh>
          {/* <div className="collectionRecord_header">
                    <ul>
                      <li>时间</li>
                      <li>金额</li>
                    </ul>
                  </div> */}

          {/* This will be displayed when there is no other data shown in the ui */}
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
