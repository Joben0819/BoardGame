import classnames from 'classnames';
import { useSelector } from 'react-redux';
import bgBg from '../../assets/brownGold/fragments/nodata.png';
import bettingBg from '../../assets/commons/Nodata/bettingBg.png';
import dbBg from '../../assets/darkBlue/fragments/nodata.png';
import gyBg from '../../assets/greenYellow/fragments/nodata.png';
import rgBg from '../../assets/redGold/fragments/nodata.png';
import sbBg from '../../assets/skyBlue/fragments/nodata.png';
import wgBg from '../../assets/whiteGold/fragments/nodata.png';
import ywBg from '../../assets/yellowWhite/fragments/nodata.png';
import styles from './index.module.scss';

export default function NoData(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  return (
    <>
      <div
        className={classnames(styles.NoData_bgImageContainer, 'noDataContainer')}
        style={{
          position: props.pos,
          marginLeft: props.marleft ? props.marleft : '0rem',
          margintop: props.martop ? props.martop : '0rem',
        }}
      >
        <img
          className={styles.Nodata}
          src={
            currTheme === 'brownGold'
              ? bgBg
              : currTheme === 'greenYellow'
              ? gyBg
              : currTheme === 'yellowWhite'
              ? ywBg
              : currTheme === 'skyBlue'
              ? sbBg
              : currTheme === 'darkBlue'
              ? dbBg
              : currTheme === 'redGold'
              ? rgBg
              : currTheme === 'whiteGold'
              ? wgBg
              : bettingBg
          }
          alt='No Data'
        />
        <div className={styles.ImageLabel}>暂无数据...</div>
      </div>
    </>
  );
}
