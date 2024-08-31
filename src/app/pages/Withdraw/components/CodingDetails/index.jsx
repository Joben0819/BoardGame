import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getCodeFlowList } from 'src/api/game/gamelist';
import NoData from 'src/app/components/NoData';
import { BasicTable } from '../../../../components/Tables/Basictable';
import { CodingFlowList } from '../../../../data/Tables/CodingFlowList';
import styles from './index.module.scss';

const CodingDetails = () => {
  const [codeFlowList, setCodeFlowList] = useState([]);
  const { currTheme } = useSelector((state) => state.gameSettings);

  useEffect(() => {
    getCodeFlowList().then((res) => {
      setCodeFlowList(res.data.data);
    });
  }, []);
  const reloadData = async () => {
    getCodeFlowList().then((res) => {
      setCodeFlowList(res.data.data);
    });
  };

  return codeFlowList ? (
    <PullToRefresh className={styles.pullToRefresh} onRefresh={reloadData}>
      <div
        className={classnames(styles.codingDetailsWrapper, {
          [styles.noDataOverride]: codeFlowList <= 0,
        })}
        data-theme={currTheme}
      >
        <div className='wd-100'>
          {/* {(codeFlowList.length < 0 && ( */}
          <div>
            <BasicTable basicData={codeFlowList} headerData={CodingFlowList} dataColor='#ffffff' />
          </div>
          {/* <BasicTable
            basicData={codeFlowList}
            headerData={CodingFlowList}
            dataColor="#ffffff"
          /> */}
          {codeFlowList <= 0 && (
            <div className={styles.noDataWrapper}>
              <NoData />
            </div>
          )}
        </div>
      </div>
    </PullToRefresh>
  ) : (
    <div className={styles.noDataWrapper}>
      <NoData />
    </div>
  );
};

export default CodingDetails;
