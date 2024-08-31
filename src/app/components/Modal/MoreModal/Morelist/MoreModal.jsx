import { motion } from 'framer-motion';
import Morelist from './Morelist';

const MoreModal = ({ mLeft, showMore, setOpenAnnounceModal, setSafeBoxModal, notLogin }) => {
  if (!showMore) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0.2, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className='moreModal_overlay'
      >
        <div className='mm_background' style={{ marginLeft: mLeft, position: 'absolute' }}>
          <Morelist
            setOpenAnnounceModal={setOpenAnnounceModal}
            setSafeBoxModal={setSafeBoxModal}
            notLogin={notLogin}
          />
          {/* <img className="mm_background"src={MoreBalloon} alt="moreModal" style={{width:"2rem"}}/> */}
        </div>
      </motion.div>
    </>
  );
};

export default MoreModal;
