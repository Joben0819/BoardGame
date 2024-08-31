import classnames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import { PromoteCommissionData } from '../../data/Tables/PromoteCommissionData';
import ButtonDesignTwo from '../OtherModalComponent/Fragment/ButtonDesignTwo';
import { BasicTable } from '../Tables/Basictable';
import styles from './index.module.scss';

export default function PromoteModal(props) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <AnimatePresence>
      {props.promoteOpen && (
        <div
          className={classnames(
            'ThisModalMainContainer_promote',
            styles.ThisModalMainContainer_promote
          )}
        >
          <motion.div
            variants={MODAL_BG_ANIMATION}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='overlay'
            style={{ zIndex: 14 }}
            onClick={props.backDrop}
          >
            <motion.div
              variants={MODAL_CONTENT_ANIMATION}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='promoteModalContainer'
              data-theme={currTheme}
            >
              <div
                className={classnames(
                  'promoteModal_body',
                  styles.promoteModal_body
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className='promoteModal_header'>
                  <center>
                    <span>返佣金额列表对照</span>
                  </center>
                  <img
                    src={require(`../../assets/${currTheme}/other_modal/othermodal_xbtn.png`)}
                    onClick={props.backDrop}
                    alt='close'
                    className='sb_xbtn'
                  />
                </div>
                <div className='promoteModal_tableContainer'>
                  <BasicTable
                    pbot={'0.015rem'}
                    fcolor={'white'}
                    rowfonts={'0.12rem'}
                    headerData={PromoteCommissionData}
                    basicData={props.basicData}
                    maxH='50%'
                  />
                </div>
                <center>
                  <div
                    className='promoteModal_buttonHolder'
                    // onClick={props.backDrop}
                  >
                    <ButtonDesignTwo
                      fwm={900}
                      clickMe={props.backDrop}
                      buttonName={'领取佣金'}
                      margin={0}
                      width={0.9}
                      brad={0}
                      height={0.35}
                      padding={0.05}
                    />
                  </div>
                </center>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
