import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { vipGiftInfo } from 'src/api/game/gamelist';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { VipGiftInfoColumn } from '../../../data/Tables/VipGiftInfoColumns';
import styles from './index.module.scss';

export default function VipDetails() {
  const [tableData, setTableData] = useState([]);
  const { currTheme } = useSelector((state) => state.gameSettings);

  useEffect(() => {
    vipGiftInfo().then((res) => {
      setTableData(res.data.data.vipSetList);
    });
  }, []);

  return (
    <div className={styles.container} data-theme={currTheme}>
      <div className={styles.vipDetails_wrapper}>
        <div className={styles.vipDetails_header}>
          <span>VIP晋级模式</span>
        </div>
        <div className={styles.vipDetails_body}>
          <BasicTable headerData={VipGiftInfoColumn} basicData={tableData} />
        </div>
      </div>
    </div>
  );
}
