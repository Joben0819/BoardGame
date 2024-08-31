export const CodeWashRecordHeader = [
  {
    Header: '时间',
    accessor: 'washCodeTime', //cleanTime
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
    accessor: 'gameTypeName', //gameclass
    // Cell: ({ value }) => {
    //     return (<>
    //         <div >
    //             <span className={styles.prioGolden}>{parseFloat(value).toFixed(2)}</span>
    //         </div>
    //     </>)
    // }
  },
  {
    Header: '洗码比例',
    accessor: 'washCodeRate', //codingvol
    // Cell: ({value}) => {return parseFloat(value).toFixed(2)  }
  },
  {
    Header: '打码量',
    accessor: 'codeAmount', //cleanAmount
    // Cell: ({ value }) => {
    //     return (<>
    //         <div >
    //             <span className={styles.prioGolden}>{parseFloat(value).toFixed(2)}</span>
    //         </div>
    //     </>)
    // }
  },
  {
    Header: '洗码金额',
    accessor: 'washCodeAmount', //cleanAmount
    // Cell: ({ value }) => {

    //     // function alertMe(index) {
    //     //     alert('hi ' + index)
    //     // }

    //     return (
    //         <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    //             <div className={styles.button}>
    //                 <span className={styles.prioBrown} >去完成</span>
    //             </div>
    //         </div>
    //     )

    // }
  },
];
