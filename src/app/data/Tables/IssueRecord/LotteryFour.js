import { useSelector } from 'react-redux';

export const LotteryFour = [
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
          {myNum.map((num, index, arr) => {
            if (arr.length - 1 === index) {
              return (
                <>
                  <span
                    className='importWhite'
                    style={{
                      height: '0.1rem',
                      background: '',
                      fontSize: '.1rem',
                      color: '#FFFFFF60',
                      marginLeft: ' ',
                      paddingTop: '1rem',
                      opacity: 0.4,
                    }}
                  >
                    +
                  </span>

                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: '0.05rem',
                      marginLeft: ' ',
                    }}
                  >
                    <div
                      className='lotteryChipsImage'
                      style={{
                        width: '.12rem',
                        height: '0.12rem',
                        fontSize: '.08rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span className='importBlack'>{num}</span>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div style={{ display: 'inline-block', marginTop: '0.05rem' }}>
                    <div
                      className='lotteryChipsImage'
                      style={{
                        width: '.12rem',
                        height: '0.12rem',
                        fontSize: '.08rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span className='importBlack'>{num}</span>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </>
      );
    },
  },
  {
    Header: 'analyse',
    accessor: 'analyse', //rateclean
    Cell: ({ value }) => {
      return (
        <span
          style={{
            fontWeight: '500',
            fontSize: '.18rem',
            marginRight: '0.1rem',
          }}
        >
          {value}
        </span>
      );
    },
  },
];
