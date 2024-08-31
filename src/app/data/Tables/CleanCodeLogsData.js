export const CleanCodeLogsData = [
  {
    Header: '洗码时间',
    accessor: 'cleanTime', //cleanTime
    Cell: ({ value }) => {
      return (
        <div className='agentLevel'>
          {' '}
          <span className='agentLevel'>{value}</span>
        </div>
      );
    },
  },
  {
    Header: '游戏洗码量',
    accessor: 'codeAmount', //codeAmount
    // Cell: ({value}) => {return parseFloat(value).toFixed(2)  }
  },
  {
    Header: '洗码金额',
    accessor: 'cleanAmount', //cleanAmount
    // Cell: ({value}) => {return parseFloat(value).toFixed(2)  }
  },
];
