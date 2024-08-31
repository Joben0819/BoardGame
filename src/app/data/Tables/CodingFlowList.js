export const CodingFlowList = [
  {
    Header: '流水时间',
    accessor: 'createTime', //createTime
  },
  {
    Header: '需求打码',
    accessor: 'income', //Demand Coding
    Cell: ({ value }) => {
      return parseFloat(value).toFixed(2);
    },
  },
  {
    Header: '实际打码',
    accessor: 'cur', //ActualCoding
    Cell: ({ value }) => {
      return parseFloat(value).toFixed(2);
    },
  },
  {
    Header: '流水状态',
    accessor: 'status', //status
    Cell: ({ value }) => {
      return (
        <>
          <img
            src={require(`../../assets/commons/${value === 1 ? 'check' : 'close'}.png`)}
            style={{ width: '0.1rem' }}
            alt='Checking'
          />
        </>
      );
    },
  },
];
