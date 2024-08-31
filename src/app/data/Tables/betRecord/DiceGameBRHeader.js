// 未中奖 did not win the prize
export const DiceGameBRHeader = [
  {
    Header: 'time',
    accessor: 'issue', //name
    // Cell: ({value}) => {return <div className="agentLevel"> <span className="agentLevel">{value} </span> </div>}
  },
  {
    Header: 'result',
    accessor: 'cost',
    Cell: ({ value }) => {
      return parseFloat(value.toFixed(4)) + '.00元';
    },
  },
  {
    Header: 'analyse',
    accessor: 'status', //rateclean
    Cell: ({ row, value }) => {
      if (value === 0) {
        return '待开奖';
      } else if (value === 1) {
        return '中奖' + parseFloat(row.original.prize.toFixed(2)) + '元';
      } else if (value === 3) {
        return '未中奖';
      }
    },
  },
];
