import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Morelist from './Morelist';

const MoreModal = ({ mLeft, showMore, setOpenAnnounceModal, setSafeBoxModal, setShowMore }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <AnimatePresence>
      {showMore && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5, scale: 0.7 }}
          className='moreModal_overlay'
          style={{ position: 'absolute' }}
        >
          <div className='mm_background' style={{ marginLeft: mLeft }} data-theme={currTheme}>
            <Morelist
              setOpenAnnounceModal={setOpenAnnounceModal}
              setShowMore={setShowMore}
              setSafeBoxModal={setSafeBoxModal}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoreModal;
