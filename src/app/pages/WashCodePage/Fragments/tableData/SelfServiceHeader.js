import { useNavigate } from 'react-router-dom';
import styles from './../WashCodeTable/index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveSideBarItem } from 'src/reducers/gameData';

export const SelfServiceHeader = [
  {
    Header: '游戏类型',
    accessor: 'gameTypeName', //cleanTime
    Cell: ({ value }) => {
      return <span style={{ fontWeight: 700 }}>{value}</span>;
    },
  },
  {
    Header: '打码总额',
    accessor: 'codeAmountTotal', //codeAmount
    Cell: ({ value }) => {
      return <span className={styles.prioGolden}>{parseFloat(value).toFixed(2)}</span>;
    },
  },
  {
    Header: '洗码比例',
    accessor: 'washCodeRate', //cleanAmount
    Cell: ({ value }) => {
      return (
        <span className={styles.prioGolden}>{!value ? '0.0%' : parseFloat(value).toFixed(2)}</span>
      );
    },
  },
  {
    Header: '洗码金额',
    accessor: 'washCodeAmount', //cleanAmount
    Cell: ({ value }) => {
      return <span className={styles.prioGolden}>{parseFloat(value).toFixed(2)}</span>;
    },
  },
  {
    Header: '',
    accessor: '.', //cleanAmount
    Cell: ({ row }) => {
      // function alertMe(index) {
      //     alert('hi ' + index)
      // }
      const takeMe = useNavigate();
      const dispatch = useDispatch();
      const { sideBar } = useSelector((state) => state.gameData);
      const { currTheme } = useSelector((state) => state.gameSettings);

      function buttonColor(color) {
        if (color === 1) {
          return 'linear-gradient(to bottom, #ffe800, #e38c00)';
        } else {
          return 'linear-gradient(to top, #8AEAFF, #fff)';
        }
      }

      function navigateHome() {
        dispatch(setActiveSideBarItem(sideBar[Number(row.id) + 1]));
        takeMe('/', { state: { from: 'washCodePage' } });
      }
      return (
        <div onClick={() => navigateHome()} className={styles.navigateHome}>
          <div
            className={styles.button}
            style={{
              background: currTheme === 'darkBlue' ? buttonColor(2) : buttonColor(1),
            }}
          >
            <span className={currTheme === 'darkBlue' ? styles.prioBlue : styles.prioBrown}>
              去完成
            </span>
          </div>
        </div>
      );
    },
  },
];
