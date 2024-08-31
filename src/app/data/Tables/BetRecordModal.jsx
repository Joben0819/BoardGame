import { useEffect, useState } from 'react';
import { cardsData } from 'src/app/components/Game/Baccarat/components/CardsSection/data';
import OnelineRecordDetail from '../../components/Fragments/OneLineRecordDetail';

import { useSelector } from 'react-redux';
import DiceFive from 'src/app/assets/commons/DiceImages/DiceFive.png';
import DiceFour from 'src/app/assets/commons/DiceImages/DiceFour.png';
import DiceOne from 'src/app/assets/commons/DiceImages/DiceOne.png';
import DiceSix from 'src/app/assets/commons/DiceImages/DiceSix.png';
import DiceThree from 'src/app/assets/commons/DiceImages/DiceThree.png';
import DiceTwo from 'src/app/assets/commons/DiceImages/DiceTwo.png';

export default function BetRecordModal({ brData, detOpen, detClose, codeJustSplit, lotteryId }) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  const [cardsplit, setCardSplit] = useState([]);
  useEffect(() => {
    setCardSplit(codeJustSplit[0]?.split(','));
  }, []);

  if (!detOpen) return null;
  return (
    <div className='overlay ' style={{ top: 0, left: 0, width: '200%' }}>
      <div
        className='BetRecordModal_mainWrapper '
        style={{ color: '#651D00' }}
        data-theme={currTheme}
      >
        <div className='betRecordBody'>
          <div className='betRecordHeader'>
            <div className='brModalTitle'>我的投注详情</div>
            <div onClick={detClose} className='xButton'>
              <img
                src={require(`../../assets/${currTheme}/other_modal/othermodal_xbtn.png`)}
                style={{ width: '0.2rem' }}
                alt='x'
              />
            </div>
          </div>
          <div className='betRecordContent' style={{ marginTop: '0.25rem' }}>
            <ul>
              <li>
                <OnelineRecordDetail
                  mykey={brData ? brData.issue : 'issue'}
                  myvalue={brData ? brData.winOrLoseResult : 'hi'}
                />
              </li>
              <li>
                <OnelineRecordDetail
                  mykey={'下注时间'}
                  width={3}
                  myvalue={brData ? brData.betTime : 'n/a'}
                  bg={1}
                />
              </li>
              <li>
                <OnelineRecordDetail mykey={'投注金额'} myvalue={brData ? brData.cost : 'n/a'} />
              </li>
              <li>
                <OnelineRecordDetail
                  mykey={'投注内容'}
                  width={3}
                  myvalue={brData ? brData.betSelect : 'n/a'}
                  bg={1}
                />
              </li>
              {/* <li>
                                <OnelineRecordDetail mykey={'开奖结果'} myvalue={"dicehere"} />
                            </li> */}
              <li>
                <div className='betRecordOneline '>
                  <div className='betRecordKey'>开奖结果</div>
                  <div className='betRecordValue' style={{ display: 'flex', width: '3.6rem' }}>
                    {lotteryId === 1003 ? (
                      <>
                        和:&nbsp;
                        {codeJustSplit?.map((Num, index) => {
                          return (
                            <div
                              style={{
                                width: '.15rem',
                                fontSize: '.1rem',
                                fontWeight: '500',
                                margin: '0.01rem 0.015rem !important ',
                                padding: '0.03rem 0.05rem 0.05rem !important',
                                letterSpacing: '-0.01rem',
                                height: '.15rem',
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center',
                                marginLeft: '0.05rem',
                              }}
                            >
                              <span className='importWhite'> {Num} </span>
                            </div>
                          );
                        })}
                      </>
                    ) : lotteryId === 1005 || lotteryId === 1001 ? (
                      <>
                        和:&nbsp;
                        {codeJustSplit.map((num) => {
                          return (
                            <>
                              <div>
                                <div
                                  className='lotteryChipsImage'
                                  style={{ margin: '0 0 0 .16rem' }}
                                >
                                  {' '}
                                  {num}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : lotteryId === 1004 ? (
                      <>
                        <span style={{ marginBottom: '0.05rem' }}> 和:</span>
                        {codeJustSplit.map((num, index, arr) => {
                          const arr1 = 0;
                          if (arr.length === arr1) {
                            return (
                              <>
                                <span
                                  style={{
                                    fontSize: '.2rem',
                                    color: '#FFFFFF70',
                                    marginLeft: '-.01rem',
                                    marginTop: '-.2rem',
                                    paddingTop: '0.1rem',
                                  }}
                                >
                                  {' '}
                                  和:
                                </span>
                              </>
                            );
                          } else if (arr.length - 1 === index) {
                            return (
                              <>
                                <span
                                  style={{
                                    fontSize: '.2rem',
                                    color: '#FFFFFF70',
                                    marginLeft: '-.01rem',
                                    marginTop: '-.2rem',
                                    paddingTop: '0.1rem',
                                  }}
                                >
                                  +
                                </span>

                                <div
                                  style={{
                                    display: 'inline-block',
                                    marginTop: '0rem',
                                    marginLeft: '-0.02rem',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '0.2rem',
                                      paddingBottom: '0.05rem',
                                      fontSize: '0.1rem',
                                    }}
                                    className='lotteryChipsImage'
                                  >
                                    {num}
                                  </div>
                                </div>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div
                                  style={{
                                    display: 'inline-block',
                                    marginLeft: '-0.01rem',
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '0.2rem',
                                      paddingBottom: '0.05rem',
                                      fontSize: '0.1rem',
                                    }}
                                    className='lotteryChipsImage'
                                  >
                                    {num}
                                  </div>
                                </div>
                              </>
                            );
                          }
                        })}
                      </>
                    ) : lotteryId === 2001 ? (
                      <>
                        <div
                          className='playerCards'
                          style={{
                            display: 'flex',
                            width: '.9rem',
                            marginLeft: cardsplit.length === 3 ? '1.35rem' : '1.6rem',
                            height: '0.4rem',
                            padding: '0.05rem 0',
                          }}
                        >
                          和:&nbsp;
                          {cardsplit.map((card, index) => {
                            return (
                              <div className='cardsContainer' style={{ display: 'inline-block' }}>
                                <img
                                  src={cardsData[cardsplit[index]].src}
                                  style={{
                                    width: '.18rem',
                                    marginLeft: '0.05rem',
                                    marginTop: '0.02rem',
                                    display: 'flex',
                                  }}
                                  alt='Card Split'
                                />
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : lotteryId === 1002 ? (
                      <div style={{ marginLeft: '1.06rem' }}>
                        {' '}
                        和:&nbsp;
                        {codeJustSplit.map((DiceNum) => {
                          return (
                            <img
                              src={
                                parseInt(DiceNum) === 1
                                  ? DiceOne
                                  : parseInt(DiceNum) === 2
                                  ? DiceTwo
                                  : parseInt(DiceNum) === 3
                                  ? DiceThree
                                  : parseInt(DiceNum) === 4
                                  ? DiceFour
                                  : parseInt(DiceNum) === 5
                                  ? DiceFive
                                  : parseInt(DiceNum) === 6
                                  ? DiceSix
                                  : ''
                              }
                              style={{
                                width: '.25rem',
                                height: '.25rem',
                                margin: '0.01rem .015rem',
                              }}
                              alt='Dice Number'
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
