export const PerfomanceInquiryTableHeader = [
  {
    Header: 'ID',
    accessor: 'code', //createTime
  },
  {
    Header: '时间',
    accessor: 'createTime', //createTime
  },
  {
    Header: '领取金额',
    accessor: 'commission', //Demand Coding
    // Cell: ({value}) => {return parseFloat(value).toFixed(2)  }
  },
  {
    Header: '推广级别',
    accessor: 'level', //ActualCoding
    Cell: ({ value }) => {
      return parseFloat(value) + '级代理';
    },
  },
];
