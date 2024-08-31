import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import alertIcon from '../../../../assets/commons/logo_icon.png';
import styles from './alert-container.module.scss';

export default function AlertContainer(props) {
  // const [isVisible,setIsVisible] = useState(props.isVisible);
  let timer;
  useEffect(() => {
    timer = setTimeout(() => props?.setCopy && props?.setCopy(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  if (!props.alertMe) return null;

  return (
    <>
      <AnimatePresence>
        {
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            className={styles.alertContainer_wrapper}
          >
            <div
              className={styles.alertTextContainer}
              style={{
                // position: "absolute",
                // top: props.top + "rem",
                // left: props.left + "rem",
                // padding: props.padding ? props.padding + "rem" : "",
                zIndex: 10,
              }}
            >
              <div className={styles.alertIconImageCont}>
                <img
                  src={alertIcon}
                  className={styles.alertIcon}
                  style={{
                    height: '.15rem',
                    width: '.15rem',
                  }}
                  alt='Alert Icon'
                />
              </div>
              {props.whatText ? (
                <span
                  className={styles.alertMess}
                  style={
                    {
                      // marginTop: props.spanMarg ? props.spanMarg + "rem" : "",
                    }
                  }
                >
                  {props.link ? '复制链接:' : '复制:'} {props.whatText}
                </span>
              ) : props.notify ? (
                <span
                  className={styles.alertMess}
                  style={
                    {
                      // marginTop: props.spanMarg ? props.spanMarg + "rem" : "",
                    }
                  }
                >
                  {props.notify}
                </span>
              ) : (
                <></>
              )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  );
}
