import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { userReceivedMessage } from 'src/api/game/gamelist';
import { setMails } from 'src/reducers/userInfo';
import { isLoggedIn } from 'src/utils/helpers';
import mailIcon from '../../assets/blackGold/footer/Icon-message.png';
import AccordionComp from '../../components/Fragments/AccordionComp';
import NoData from '../../components/NoData';
import OtherHeader from '../../components/OtherHeader';
import soundFile from './../../data/audioData/message.mp3';
import styles from './index.module.scss';
export default function Mailbox() {
  const [sortedMails, setSortedMails] = useState([]);
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => state.userInfo);
  const [isRequested, setIsRequested] = useState(true);
  const [isRefreshed, setIsRefreshed] = useState(false);
  let resetIsRefreshedTimer;

  const audioFile = new Audio(soundFile);
  useEffect(() => {
    audioFile.play();
  }, []);

  useEffect(() => {
    isLoggedIn() &&
      !isRequested &&
      userReceivedMessage().then((res) => {
        setIsRequested(true);
        let transformedMails;
        if (mails?.length === 0) {
          transformedMails = res.data?.data
            ?.sort((a, b) => (a.createTime > b.createTime ? 1 : -1))
            ?.map((mail, idx) => {
              return { ...mail, isRead: false };
            });
          dispatch(setMails(transformedMails));
        }
      });
  }, []);

  useEffect(() => {
    if (mails?.length > 0) {
      let tempMails = [...mails];
      tempMails?.sort((a, b) => (a.isRead > b.isRead ? 1 : -1));
      setSortedMails(tempMails);
    }
  }, [mails?.length, isRefreshed]);

  const reloadData = async () => {
    userReceivedMessage().then((res) => {
      setIsRequested(true);
      setIsRefreshed(true);
      let transformedMails;
      if (mails?.length === 0) {
        transformedMails = res.data?.data
          ?.sort((a, b) => (a.createTime > b.createTime ? 1 : -1))
          ?.map((mail, idx) => {
            return { ...mail, isRead: false };
          });
        dispatch(setMails(transformedMails));
      }

      resetIsRefreshedTimer = setTimeout(() => {
        setIsRefreshed(false);
      }, 100);
    });
  };

  return (
    isLoggedIn() && (
      <>
        <div
          className='clearPage_wrapper d-flex'
          style={{ color: 'white', flexDirection: 'column' }}
        >
          <div className='hg-10'>
            <OtherHeader backshare={true} title={'邮箱'} />
          </div>
          {/* This is the mailbox part of the page */}
          <div className='mailBox_mainWrapper'>
            <PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
              <div className='userReceivedMailsContainer'>
                {sortedMails.length > 0 ? (
                  sortedMails.map((mail, index) => (
                    <div key={index}>
                      <AccordionComp
                        isRefreshed={isRefreshed}
                        dispatch={dispatch}
                        delay={index}
                        myImg={mailIcon}
                        title={mail.title}
                        content={mail.content}
                        mails={mails}
                        mail={mail}
                        key={mail}
                        createTime={mail.createTime}
                      />
                    </div>
                  ))
                ) : (
                  <NoData />
                )}
              </div>
            </PullToRefresh>
          </div>
        </div>
      </>
    )
  );
}
