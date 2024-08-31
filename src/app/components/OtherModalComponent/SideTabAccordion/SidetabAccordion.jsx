import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonDesignOne from '../../Fragments/Buttons/ButtonDesignOne';
import ClearButton from '../../Fragments/Buttons/ClearButton';
import styles from './index.module.scss';

export default function SidetabAccordion({
  getReward,
  taskId,
  icon,
  title,
  myStatus,
  myTarget,
  reward,
  content,
  claim,
  Switched,
  handleSwitch,
  clicker,
}) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const isMissionClicked = (index) => {
    setIsAccordionOpen(isAccordionOpen !== index ? index : null);
  };

  useEffect(() => {
    return () => {
      setIsAccordionOpen(false);
    };
  }, []);

  return (
    <div className={styles.s2accordion_wrapper} data-theme={currTheme}>
      <div className={styles.s2accordion_item}>
        <section
          className={styles.accordion_container}
          style={
            isAccordionOpen === 1 && Switched === false
              ? {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  paddingTop: ' 0.025rem',
                }
              : { paddingTop: ' 0.025rem' }
          }
        >
          <div className={styles.accordion_displayImg}>
            <img
              key={icon}
              style={{ borderRadius: '100%' }}
              alt='accordion'
              src={icon}
              className={styles.accordionContainer_image}
            />
          </div>
          <div className={styles.accordionContainer_details}>
            <div className={styles.title}>
              {title}
              <img
                style={{ float: 'right' }}
                src={require(`../../../assets/${currTheme}/other_modal/helpIconRound.png`)}
                onClick={() => {
                  isMissionClicked(clicker ? clicker : 1);
                  handleSwitch();
                }}
                alt='Help Icon'
              />
            </div>
            <div className={styles.brief_info}>
              <span>{content}</span>
            </div>

            <div className={styles.taskbarBorder}>
              <div className={styles.progressNum} style={{ marginTop: '-0.004rem' }}>
                {myStatus}/{myTarget}
              </div>
              <div className={styles.taskbar} style={{ width: (myStatus / myTarget) * 100 + '%' }}>
                &nbsp;
              </div>
            </div>
          </div>

          <div className={styles.greenPlus} style={{ paddingTop: ' 0.035rem' }}>
            <center>
              <p>
                +{reward}.00
                <br /> 现金
              </p>
            </center>
          </div>

          <div className={styles.s2task_button} style={{ marginTop: '0.065rem' }}>
            {claim === 1 && (
              <ButtonDesignOne
                clickMe={() => getReward(taskId)}
                margin={0.15}
                padding={0.03}
                width={0.4}
                height={0.2}
                buttonName={'去完成'}
                fontSize={0.08}
                textColor='#757575'
                bbottom='none'
              />
            )}
            {claim !== 1 && (
              <ClearButton
                clickMe={() => getReward(taskId)}
                margin={0.15}
                padding={0.03}
                width={0.4}
                height={0.2}
                buttonName={claim === 2 ? '已领取' : '去完成'}
                fontSize={0.08}
                textColor='#757575'
                bbottom='none'
              />
            )}

            {/* <button>去完成</button> */}
          </div>
        </section>
        <section
          className={
            isAccordionOpen === 1 && Switched === false
              ? styles.accordion_details_show
              : styles.accordion_details_hide
          }
        >
          <center>
            <div className={styles.accordionDetails_title}>任务详情</div>
          </center>
          <section>
            {/* <p>任务简介【赛车闯关】<br/><br/></p>
                            <p>任务有效时间 <br/> 每日任务,北京时间00:00:00-23:59:59 (每日更新,及时领取任务奖励)<br/><br/></p> */}
            <p>
              任务范围 <br />
              {content}
              <br />
              <br />
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
