export const CollectionRecordTableHeader = [
  {
    Header: '时间',
    accessor: 'createTime', //createTime
  },
  {
    Header: '金额 ',
    accessor: 'commission', //Demand Coding
    Cell: ({ value }) => {
      if (value != null) return value;
      else return '0.00';
    },
  },
];
