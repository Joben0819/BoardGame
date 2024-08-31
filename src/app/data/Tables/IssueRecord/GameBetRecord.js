import { useSelector } from 'react-redux';
import DiceFive from 'src/app/assets/commons/DiceImages/DiceFive.png';
import DiceFour from 'src/app/assets/commons/DiceImages/DiceFour.png';
import DiceOne from 'src/app/assets/commons/DiceImages/DiceOne.png';
import DiceSix from 'src/app/assets/commons/DiceImages/DiceSix.png';
import DiceThree from 'src/app/assets/commons/DiceImages/DiceThree.png';
import DiceTwo from 'src/app/assets/commons/DiceImages/DiceTwo.png';
import styles from './index.module.scss';

// import LotteryDice from '../Component/Fragments/GameAssets/LotteryDice';

export const GameBetRecordTableHeader = [
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
    // Cell: ({value}) => {return <div className="agentLevel"> <span className="agentLevel">{value} </span> </div>}
  },
  {
    Header: 'result',
    accessor: 'code',
    Cell: ({ value }) => {
      let code = value;
      const myDice = code.split(' ');
      let one = myDice[1];

      const diceImages = {
        1: DiceOne,
        2: DiceTwo,
        3: DiceThree,
        4: DiceFour,
        5: DiceFive,
        6: DiceSix,
      };

      return (
        <>
          {myDice.map((diceNum, index) => {
            const diceImage = diceImages[parseInt(diceNum)] || '';
            return (
              <img
                key={index}
                src={diceImage}
                className={styles.diceImageContainer}
                alt={`Dice ${diceImage}`}
              />
            );
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
        <>
          <span style={{ margintop: '-0.2rem' }}> {value} </span>
        </>
      );
    },
  },
];
