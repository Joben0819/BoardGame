export const BettingRecordData = [
  {
    Header: '派彩时间',
    accessor: 'createTime', //name
    // Cell: ({value}) => {return <div className="agentLevel"> <span className="agentLevel">{value} </span> </div>}
  },
  {
    Header: '游戏-注单号',
    accessor: 'gameId', //codeAmount
  },
  {
    Header: '投注金额',
    accessor: 'allBet', //rateclean
    // Cell: ({value}) => {return   value * -1}
  },
  {
    Header: '盈利金额',
    accessor: 'profit', //rateclean
    // Cell: ({value}) => {return   value * -1}
  },
];
