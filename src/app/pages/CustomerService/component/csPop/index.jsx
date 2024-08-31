import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { PopCustomerService } from 'src/api/game/gamelist';
import AlertContainer from 'src/app/components/Modal/AlertContainer';
import { popSound } from 'src/utils/audio-player';
import styles from './index.module.scss';

const CsPop = (props) => {
  const [popCs, setPopCs] = useState(props?.csPopData);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [alertMe, setAlertMe] = useState(false);
  const { currTheme } = useSelector((state) => state.gameSettings);
  let resetIsRefreshedTimer;

  const reloadData = () => {
    PopCustomerService().then((res) => {
      setIsRefreshed(true);
      setPopCs(res?.data?.data);
      resetIsRefreshedTimer = setTimeout(() => {
        setIsRefreshed(false);
      }, 100);
    });
  };

  const AlertDelay = () => {
    setAlertMe(true);
    setTimeout(function () {
      setAlertMe(false);
    }, 1500);
  };

  return (
    <>
      <AlertContainer alertMe={alertMe} top={3.25} whatText={'POP专员账号'} />
      <div className={styles.csPop} data-theme={currTheme}>
        <div className={styles.csPop__headerText}>
          <span>POP客服 </span>
          <span>邀请好友即可成为代理 轻松月入百万</span>
        </div>
        <div className={styles.csLinksWrapper}>
          <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
            <ul>
              {popCs?.map((item, index) => {
                return (
                  <li key={index}>
                    <div className={styles.leftContent} data-theme={currTheme}>
                      <img src={item?.icon} alt='' />

                      <div>
                        <span>下载地址: {item?.title}</span>
                        <span>POP专员账号： {item?.details}</span>
                      </div>
                    </div>

                    <div className={styles.rightContent} data-theme={currTheme}>
                      <CopyToClipboard
                        text={item?.url}
                        onCopy={() => {
                          // setCopyUserNick(true);
                          AlertDelay();
                          popSound();
                        }}
                      >
                        <div>
                          <span>复制</span>
                        </div>
                      </CopyToClipboard>
                      <a
                        href={item?.url.includes('https') ? item?.url : `https://${item?.url}`}
                        rel='noreferrer'
                        target='_blank'
                      >
                        <span>打开微信</span>
                      </a>
                    </div>
                  </li>
                );
              })}
              {/* <li>
                <div className={styles.leftContent}>
                  <img src="https://kaiyuan.life/assets/8801/favicon.ico" />

                  <div>
                    <span>下载地址: {item?.url}</span>
                    <span>POP专员账号： {item?.details}</span>
                  </div>
                </div>

                <div className={styles.rightContent}>
                  <CopyToClipboard
                    text={item?.url}
                    onCopy={() => {
                      // setCopyUserNick(true);
                      AlertDelay();
                      popSound();
                    }}
                  >
                    <div>
                      <span>复制</span>
                    </div>
                  </CopyToClipboard>
                  <a href={item?.url} target="_blank">
                    <span>打开微信</span>
                  </a>
                </div>
              </li> */}
            </ul>
          </PullToRefresh>
        </div>
      </div>
    </>
  );
};

export default CsPop;
