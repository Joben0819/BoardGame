export const fundDetailsTableData = [
  {
    Header: '时间',
    accessor: 'createTime', //name
    Cell: ({ value }) => {
      return (
        <div className='agentLevel'>
          {' '}
          <span className='agentLevel'>{value} </span>{' '}
        </div>
      );
    },
  },
  {
    Header: '状态',
    accessor: 'des', //codeAmount
  },
  {
    Header: '支付',
    accessor: 'pay', //rateclean
    Cell: ({ value }) => {
      return value * -1;
    },
  },
];
