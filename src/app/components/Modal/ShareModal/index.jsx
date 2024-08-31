import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  MailruShareButton,
  OKShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
} from 'react-share';
import copyIcon from '../../../assets/blackGold/header/copyIcon.png';
import styles from './index.module.scss';

import {
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  MailruIcon,
  OKIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
} from 'react-share';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import ButtonDesignTwo from '../../Fragments/Buttons/ButtonDesignTwo';
import AlertContainer from '../../Modal/AlertContainer';

const ShareModal = ({ shareModalOpen, shareModalClose, shareUrl }) => {
  const [shareHasCopy, setShareHasCopy] = useState(false);
  function copyClicked() {
    setShareHasCopy(true);
    setTimeout(function () {
      setShareHasCopy(false);
    }, 2500);
  }

  return (
    <AnimatePresence>
      {shareModalOpen && (
        <motion.div
          variants={MODAL_BG_ANIMATION}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='overlay'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={shareModalClose}
        >
          <AlertContainer alertMe={shareHasCopy} notify={shareUrl} top={2.8} left={3} centered />
          <motion.div
            variants={MODAL_CONTENT_ANIMATION}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className={styles.shareModalContainer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.copyOption}>
                <div className={styles.shareUrlContainer}>
                  <span>{shareUrl}</span>
                </div>
                <CopyToClipboard text={shareUrl}>
                  <div className={styles.copyIcon} onClick={copyClicked}>
                    <div>
                      <img src={copyIcon} alt='copy'></img>
                    </div>
                  </div>
                </CopyToClipboard>
              </div>
              <div className={styles.platformContainer}>
                <EmailShareButton url={shareUrl}>
                  <EmailIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </EmailShareButton>

                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </FacebookShareButton>

                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </WhatsappShareButton>

                <VKShareButton url={shareUrl}>
                  <VKIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </VKShareButton>

                <HatenaShareButton url={shareUrl}>
                  <HatenaIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </HatenaShareButton>

                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </LinkedinShareButton>

                <InstapaperShareButton url={shareUrl}>
                  <InstapaperIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </InstapaperShareButton>

                <LineShareButton url={shareUrl}>
                  <LineIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </LineShareButton>

                <MailruShareButton url={shareUrl}>
                  <MailruIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </MailruShareButton>

                <OKShareButton url={shareUrl}>
                  <OKIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </OKShareButton>

                <TelegramShareButton url={shareUrl}>
                  <TelegramIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </TelegramShareButton>

                <PocketShareButton url={shareUrl}>
                  <PocketIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </PocketShareButton>

                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </TwitterShareButton>

                <ViberShareButton url={shareUrl}>
                  <ViberIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </ViberShareButton>

                <RedditShareButton url={shareUrl}>
                  <RedditIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </RedditShareButton>

                <TumblrShareButton url={shareUrl}>
                  <TumblrIcon size={'.23rem'} borderRadius={'0.04rem'} />
                </TumblrShareButton>

                {/* <WorkplaceShareButton url={shareUrl}>
                <WorkplaceIcon size={".15rem"} borderRadius={"0.04rem"} />
              </WorkplaceShareButton> */}
              </div>
              <div className={styles.Button}>
                <ButtonDesignTwo
                  clickMe={shareModalClose}
                  buttonName={'關閉'}
                  width={0.55}
                  // height={0.17}
                  // padding={"0.03rem 0.1"}
                  // margin={"0.1rem 0rem 0.1rem 0.03"}
                  fs={0.07}
                  fw={900}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
