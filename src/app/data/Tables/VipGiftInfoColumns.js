import { useSelector } from 'react-redux';

export const VipGiftInfoColumn = [
  {
    Header: 'VIP级别',
    accessor: 'level', //name
    Cell: ({ value }) => {
      const { currTheme } = useSelector((state) => state.gameSettings);
      return (
        <span
          style={{
            fontWeight: 600,
            background: `linear-gradient(to bottom, ${
              currTheme === 'greenYellow'
                ? '#FACD12, #FACD12'
                : currTheme === 'brownGold'
                ? '#000,#000'
                : currTheme === 'darkBlue'
                ? '#8AEAFF ,#fff'
                : currTheme === 'yellowWhite'
                ? '#A11300,#A11300'
                : currTheme === 'whiteGold'
                ? '#435689,#435689'
                : currTheme === 'skyBlue'
                ? '#000000,#000000'
                : currTheme === 'redGold'
                ? '#47100F,#6A1211'
                : ' #fff,#FACD12'
            }`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.001rem',
          }}
        >
          VIP{value}
        </span>
      );
    },
  },
  {
    Header: '总打码量范围',
    accessor: 'bcode', //codeAmount
    Cell: ({ value }) => {
      return parseFloat(value).toFixed(2) + '+';
    },
  },
  {
    Header: '晋级礼金',
    accessor: 'levelBonus', //rateclean
    Cell: ({ value }) => {
      return value.toFixed(2) + '元';
    },
  },
  {
    Header: '周俸禄',
    accessor: 'weekBonus', //cleanAmount,
    Cell: ({ value }) => {
      return parseFloat(value).toFixed(2) + '元';
    },
  },
];
