import { useSelector } from 'react-redux';

export const boxNumberHeader = [
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
          {myNum.map((Num) => {
            return (
              <div
                style={{
                  width: '.14rem',
                  fontSize: '0.08rem',
                  display: 'inline-flex',
                  justifyItems: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  height: '.14rem',
                  color: 'white',
                  background:
                    parseInt(Num) === 1
                      ? '#FBC000'
                      : parseInt(Num) === 2
                      ? '#048DFF'
                      : parseInt(Num) === 3
                      ? '#4D4D4D'
                      : parseInt(Num) === 4
                      ? '#FD790D'
                      : parseInt(Num) === 5
                      ? '#01DAED'
                      : parseInt(Num) === 6
                      ? '#4E02FB'
                      : parseInt(Num) === 7
                      ? '#ABABAB'
                      : parseInt(Num) === 8
                      ? '#E10602'
                      : parseInt(Num) === 9
                      ? '#7B080B'
                      : parseInt(Num) === 10
                      ? '#2EC504'
                      : '',
                  textAlign: 'center',
                  marginLeft: '0.02rem',
                }}
              >
                <span className='importWhite'> {Num}</span>
              </div>
            );
          })}
        </>
      );
    },
  },
];
