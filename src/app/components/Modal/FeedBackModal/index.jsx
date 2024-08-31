import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { setShowFeedbackModal } from 'src/reducers/gameSettings';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import styles from './index.module.scss';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const FeedBackModal = () => {
  const dispatch = useDispatch();
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <motion.div
      variants={MODAL_BG_ANIMATION}
      initial='hidden'
      animate='visible'
      exit='exit'
      className={styles.overlay}
    >
      <motion.div
        variants={MODAL_CONTENT_ANIMATION}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={styles.modalContainer}
        data-theme={currTheme}
      >
        <div className={styles.modalHeader}>
          <span>意见反馈箱</span>
          <img
            src={require(`../../../assets/${currTheme}/other_modal/othermodal_xbtn.png`)}
            onClick={() => dispatch(setShowFeedbackModal(false))}
            alt='close'
          />
        </div>
        <div className={styles.modalBody}>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder='在此输入您的建议...'
            className={styles.selectDropdown}
            // styles={customStyles}
            classNamePrefix={'feedbackSuggestion'}
          />
          <textarea
            className={styles.textArea}
            name='comments'
            rows='3'
            // cols="40"
            placeholder='请输入您的宝贵意见...'
          ></textarea>
          <div className={styles.contactInfo}>
            <span>联系方式（以便我们有需要的时候联系到里处理问题）</span>
            <input type='text' placeholder='请输入手机号码' />
          </div>

          <div className={styles.button}>
            <span>提交</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedBackModal;
