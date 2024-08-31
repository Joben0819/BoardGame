export const CleanCodeColumns = [
  {
    Header: '全部游戏',
    accessor: 'name', //name
  },
  {
    Header: '游戏洗码量',
    accessor: 'codeAmount', //codeAmount
    Cell: ({ value }) => {
      return parseFloat(value).toFixed(2);
    },
  },
  {
    Header: '洗码比例',
    accessor: 'rateClean', //rateclean
    Cell: ({ value }) => {
      return (value * 100).toFixed(2) + '%';
    },
  },
  {
    Header: '洗码金额',
    accessor: 'cleanAmount', //cleanAmount,
    Cell: ({ value }) => {
      return parseFloat(value).toFixed(2);
    },
  },
];
