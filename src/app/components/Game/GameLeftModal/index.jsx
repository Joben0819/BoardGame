import { useEffect, useState } from 'react';
import HtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { betRecord, issueRecord, rule } from 'src/api/game/gamelist';
import { DiceGameBRHeader } from 'src/app/data/Tables/betRecord/DiceGameBRHeader';
import BetRecordModal from 'src/app/data/Tables/BetRecordModal';
import { baccaratHeader } from 'src/app/data/Tables/IssueRecord/baccaratHeader';
import { boxNumberHeader } from 'src/app/data/Tables/IssueRecord/BoxNumberHeader';
import { GameBetRecordTableHeader } from 'src/app/data/Tables/IssueRecord/GameBetRecord';
import { LotteryFour } from 'src/app/data/Tables/IssueRecord/LotteryFour';
import { LotteryOneFiveHeader } from 'src/app/data/Tables/IssueRecord/LotteryOneFiveHeader';
import moreIcon from '../../../assets/blackGold/footer/Icon-more.png';
import redGoldMoreIcon from '../../../assets/redGold/footer/game_history_more.png';
import { BasicTable } from '../../../components/Tables/Basictable';
import styles from './index.module.scss';

export default function GameLeftModal({ openInfo, closeInfo, lotteryId, timeRepeater }) {
  //toggling the section of the header
  const [gameInfoSection, setGameInfoSection] = useState(1);
  const [instructions, setInstructions] = useState([]);
  const [betRecordTableData, setBetRecordTableData] = useState([]);
  const [hideHeader, setHideHeader] = useState(false);
  //for issueRecord
  const [issueRecordTableData, setIssueRecordTableData] = useState([]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedBet, setSelectedBet] = useState([]);
  //calling the rule api to get the instruction be displayed on the modal
  useEffect(() => {
    rule(lotteryId).then((res) => {
      setInstructions(res.data.data);
    });
  }, [lotteryId]);

  useEffect(() => {
    betRecord(lotteryId).then((res) => {
      setBetRecordTableData(res.data.data);
    });
  }, [lotteryId, timeRepeater]);

  useEffect(() => {
    issueRecord(lotteryId).then((res) => {
      setIssueRecordTableData(res.data.data);
    });
  }, [lotteryId]);

  const reloadData = async () => {
    issueRecord(lotteryId).then((res) => {
      setIssueRecordTableData(res.data.data);
    });
  };
  const reloadData2 = async () => {
    betRecord(lotteryId).then((res) => {
      setBetRecordTableData(res.data.data);
    });
  };

  useEffect(() => {}, [hideHeader]);

  const { currTheme } = useSelector((state) => state.gameSettings);
  if (!openInfo) return null;

  return (
    <div className={styles.overlay} onClick={closeInfo} style={{ top: 0 }} data-theme={currTheme}>
      <div className={styles.gameLeftModalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.GameLeftModalSwiperHeader}>
          <ul>
            <li
              style={{ paddingBottom: '0.04rem' }}
              onClick={() => {
                setGameInfoSection(1);
              }}
              className={gameInfoSection === 1 ? styles.activeGameHeaderSection : ''}
            >
              游戏规则
            </li>
            <li
              style={{ paddingBottom: '0.04rem' }}
              onClick={() => {
                setGameInfoSection(2);
                setHideHeader(true);
              }}
              className={gameInfoSection === 2 ? styles.activeGameHeaderSection : ''}
            >
              投注记录
            </li>
            <li
              style={{ paddingBottom: '0.04rem' }}
              onClick={() => {
                setGameInfoSection(3);
                setSelectedBet(betRecordTableData[0]);
              }}
              className={gameInfoSection === 3 ? styles.activeGameHeaderSection : ''}
            >
              下注记录
            </li>
          </ul>
        </div>

        <div className={styles.modalLeftGameBody}>
          {gameInfoSection === 1 ? (
            <>
              <div className={styles.GameModalInstruction}>
                <div className={styles.GameInstructionContainer}>
                  {instructions.map((sentences, index) => {
                    return (
                      <>
                        <div>{sentences.name}</div>
                        <br />
                        <div>{HtmlParser(sentences.des)}</div>
                        <br />
                      </>
                    );
                  })}
                  {/* 百家乐游戏规则： 
                        1.投注：游戏共有5个下注区域，分别为庄，庄对，困，对，和<br/><br/> 
                        2.发牌：双方都会收到两至三张牌，第三张牌即为牌，点数总和最接近9点者胜，总和超过10则只计算尾数。 <br/><br/> 
                        3.礼牌规则：庄困任意一方起手牌总和为8和9时为天生赢家"，双方都不牌；起手总和为7时，也不礼牌。 困方：起手牌总和为0,1,2,3,4,5需牌； <br/><br/> 
                        <br/><br/> 
                        庄方：  <br/><br/>  
                        ①：起手牌总和为：0,1,2需牌； <br/><br/> 
                        ②：总和为3时，当困家礼的第三张牌不为8时需礼牌；  <br/><br/> 
                        ③：总和为4时，当困家的第三张牌不为0.1.89需社牌； <br/><br/> 
                        ④：总和为5时，当困家的第三张牌不为0.1.2.389需牌； <br/><br/> 
                        ⑤：总和为6时，当困家的第三张牌为6或7点时，庄家礼牌。<br/><br/> 
                        困家牌为0,1,2,3,4,5,8或9点时，庄家不礼牌。 <br/><br/> 
                        4.点数：9&gt;8&gt;7&gt;6&gt;5&gt;4&gt;3&gt;2&gt;1&gt;0；10，J,QK为0点，A为1点。 <br/><br/> 
                        对子：与庄前两张牌发出相同的牌；例如红心8，方块8  <br/><br/> 
                        对子不比大小只比点数大小，点数也一致则为和，本金退回。 <br/><br/> 
                        5.和局：困庄本金退回且不计算有效打；对子不属于和局中奖， 
                        本金不予退回，计算有效打。 <br/><br/>  */}
                </div>
              </div>
            </>
          ) : gameInfoSection === 2 ? (
            <>
              <div className={styles.gameInfoTableWrapper}>
                <div className={styles.gameInfoTableContainer}>
                  <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
                    <BasicTable
                      noHeader={hideHeader}
                      noDataComp={true}
                      headerData={
                        //   gameInfo Section 2
                        lotteryId === 1002
                          ? GameBetRecordTableHeader
                          : lotteryId === 1003
                          ? boxNumberHeader
                          : lotteryId === 1001 || lotteryId === 1005
                          ? LotteryOneFiveHeader
                          : lotteryId === 1004
                          ? LotteryFour
                          : //gameInfo Section 3
                          lotteryId === 1002
                          ? DiceGameBRHeader
                          : lotteryId === 2001
                          ? baccaratHeader
                          : []
                        // DiceGameBRHeader
                      }
                      basicData={gameInfoSection === 2 ? issueRecordTableData : betRecordTableData}
                    />
                  </PullToRefresh>
                </div>
              </div>
            </>
          ) : gameInfoSection === 3 ? (
            <>
              <div className={styles.gameInfoTableWrapper}>
                {/* <div className={styles.gameInfoTableContainer2}>
                    <BasicTable
                      noHeader={true}
                      noDataComp={true}
                      headerData={DiceGameBRHeader}
                      basicData={
                        gameInfoSection === 2
                          ? issueRecordTableData
                          : betRecordTableData
                      }
                      Display="none"
                    ></BasicTable>
                  </div> */}
                <div className={styles.gameInfoTableContainer22}>
                  <BetRecordModal
                    codeJustSplit={
                      selectedBet?.code?.length > 0 ? selectedBet?.code?.split(' ') : []
                    }
                    lotteryId={lotteryId}
                    brData={selectedBet}
                    color='white'
                    detOpen={openDetails}
                    detClose={() => {
                      setOpenDetails(false);
                    }}
                  />
                  <PullToRefresh onRefresh={reloadData2} className={styles.pullToRefresh}>
                    {betRecordTableData?.map((data, index) => {
                      return (
                        <>
                          <div
                            className={styles.sidetablebutton}
                            key={index}
                            onClick={() => {
                              setOpenDetails(true);
                              setSelectedBet(data);
                            }}
                            style={{
                              display: 'inline-block',
                              height: '0.3rem',
                              width: '100%',
                            }}
                          >
                            <span
                              className={currTheme === 'darkBlue' ? styles.dbColor : ''}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                height: '0.3rem',
                                width: '40%',
                                background:
                                  currTheme === 'blackGold' &&
                                  'linear-gradient(to bottom, #FFFFFF, #FFE29B)',
                                WebkitBackgroundClip: currTheme === 'blackGold' && 'text',
                                WebkitTextFillColor: currTheme === 'blackGold' && 'transparent',
                              }}
                            >
                              {data.issue}
                            </span>
                            <span
                              className={styles.pAmount}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '0.3rem',
                                width: '20%',
                              }}
                            >
                              {parseFloat(data.cost.toFixed(4)) + '.00元'}
                            </span>
                            {data.status === 0 && (
                              <span
                                style={{
                                  color: 'gray',
                                  width: '25%',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                待开奖
                              </span>
                            )}
                            {data.status === 1 && (
                              <span
                                style={{
                                  color: '#11D38A',
                                  width: '25%',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {parseFloat(data.prize.toFixed(2)) + '元'}
                              </span>
                            )}
                            {data.status === 2 && (
                              <span
                                style={{
                                  color: '#FF3B3B',
                                  width: '25%',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                待开奖
                              </span>
                            )}
                            {data.status === 3 && (
                              <span
                                style={{
                                  color: '#FF3B3B',
                                  width: '25%',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                {'退本' + parseFloat(data.cost.toFixed(2)) + '.0元'}
                              </span>
                            )}
                            <span
                              style={{
                                padding: '0 0.2rem',
                                width: '10%;',
                                alignItems: 'center',
                                justifyItems: 'center',
                              }}
                            >
                              <img
                                src={currTheme === 'redGold' ? redGoldMoreIcon : moreIcon}
                                style={{
                                  display: 'inline-block',
                                  width: '0.15rem',
                                }}
                                alt='Icon'
                              />
                            </span>
                          </div>
                        </>
                      );
                    })}
                  </PullToRefresh>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
