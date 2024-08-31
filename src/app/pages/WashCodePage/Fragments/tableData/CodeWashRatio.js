export const CodeWashRatioHeader = [
  {
    Header: '时间',
    accessor: 'codeInterval', //cleanTime
    // Cell: ({ value }) => {
    //     return (<>
    //         <div >
    //             <span style={{ fontWeight: 700 }} >{value}</span>
    //         </div>
    //     </>)
    // }
  },
  {
    Header: '游戏分类',
    accessor: 'washRate', //gameclass
    // Cell: ({ value }) => {
    //     return (<>
    //         <div >
    //             <span className={styles.prioGolden}>{parseFloat(value).toFixed(2)}</span>
    //         </div>
    //     </>)
    // }
  },
  {
    Header: '打码量',
    accessor: 'beat', //codingvol
    // Cell: ({value}) => {return parseFloat(value).toFixed(2)  }
  },
];
