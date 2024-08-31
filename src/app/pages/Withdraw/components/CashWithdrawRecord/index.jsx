import { useEffect, useState } from 'react';
import { withdrawRechargeDetail } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';
import { BasicTable } from 'src/app/components/Tables/Basictable';
import { WithRecord } from 'src/app/data/Tables/WithRecord';
import styles from './index.module.scss';

const CashWithdrawalRecord = () => {
  const [tableData, setTableData] = useState([]);

	useEffect(() => {
		withdrawRechargeDetail('withdraw', 1, 10).then(res => {
			if (res?.data.code === 200) {
				setTableData(res.data.data)
			} else {
				setTableData([])
			}
		})
	}, [])

  return (
    <div className={styles.withdrawalRecordWrapper}>
      {tableData?.length > 0 ? (
        <BasicTable
          headerData={WithRecord}
          basicData={tableData.length > 0 && tableData}
          noHeader={true}
        />
      ) : (
        <div className={styles.noDataContainer}>
          <NoData/>
        </div>
      )}
    </div>
  );
};

export default CashWithdrawalRecord;
