export const VIPAccountDetailsTableHeader = [
  {
    Header: '时间',
    accessor: 'createTime', //name
    // Cell: ({value}) => {return <div className="agentLevel"> <span className="agentLevel">{value} </span> </div>}
  },
  {
    Header: '交易类型',
    accessor: 'des', //codeAmount
  },
  {
    Header: '支出',
    accessor: 'pay', //rateclean
    // Cell: ({value}) => {return   value * -1}
  },
  {
    Header: '收入',
    accessor: 'income', //rateclean
    // Cell: ({value}) => {return   value * -1}
  },
  {
    Header: '余额',
    accessor: 'total', //rateclean
    // Cell: ({value}) => {return   value * -1}
  },
];
