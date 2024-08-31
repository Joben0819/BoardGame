export const PromoteCommissionData = [
  {
    Header: '代理级别',
    accessor: 'level', //level
    Cell: ({ value }) => {
      return (
        <div className='agentLevel'>
          {' '}
          <span className='agentLevel'>{value}级代理 </span>{' '}
        </div>
      );
    },
  },
  {
    Header: '返佣比例',
    accessor: 'bill', //bill
    Cell: ({ value }) => {
      return parseFloat(value) + '0';
    },
  },
];
