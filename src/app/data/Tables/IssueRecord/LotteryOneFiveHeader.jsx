import { useSelector } from 'react-redux';

export const LotteryOneFiveHeader = [
  {
    Header: 'time',
    accessor: 'issue', //name
    Cell: ({ value }) => {
      const { currTheme } = useSelector((state) => state.gameSettings);
      return (
        <span
          style={{
            background:
              currTheme === 'darkBlue'
                ? 'linear-gradient(to top,#FFE29B ,#FFF )'
                : currTheme === 'blackGold'
                ? 'linear-gradient(to top,#FFE29B ,#FFF )'
                : 'linear-gradient(to top,black,black)',
            WebkitBackgroundClip: 'text',
          }}
        >
          {value}
        </span>
      );
    },
  },
  {
    Header: 'result',
    accessor: 'code',
    Cell: ({ value }) => {
      let code = value;
      const myNum = code.split(' ');

      return (
        <>
          {myNum.map((num) => {
            return (
              <>
                <div style={{ display: 'inline-block' }}>
                  <div style={{ padding: '0.03rem 0 0 0' }} className='lotteryChipsImage'>
                    <span
                      className='importBlack'
                      style={{
                        background: 'linear-gradient(to top,black,black)',
                        WebkitBackgroundClip: 'text',
                      }}
                    >
                      {num}
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    },
  },
];
