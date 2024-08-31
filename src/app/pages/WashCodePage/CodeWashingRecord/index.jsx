import classnames from 'classnames';
import { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getWashCodeLogs } from 'src/api/game/gamelist';
import { CodeWashRecordHeader } from '../Fragments/tableData/CodoWashRecord';
import { WashCodeTable } from '../Fragments/WashCodeTable';
import styles from './index.module.scss';

export default function CodeWashingRecord() {
  const [codeLogs, setCodeLogs] = useState([]);

  useEffect(() => {
    getWashCode();
  }, []);

  const getWashCode = async () => {
    const { data } = await getWashCodeLogs();
    if (data?.code === 200) {
      setCodeLogs(data?.data);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tableCont}>
          <PullToRefresh onRefresh={getWashCode} className={styles.pullToRefresh}>
            <div
              className={classnames(styles.washCodeTableWrapper, {
                [styles.noDataWrapper]: codeLogs?.length <= 0,
              })}
            >
              <WashCodeTable
                pbot={'.03rem'}
                headerData={CodeWashRecordHeader}
                tableData={codeLogs}
              />
            </div>
          </PullToRefresh>
        </div>
      </div>
    </>
  );
}
