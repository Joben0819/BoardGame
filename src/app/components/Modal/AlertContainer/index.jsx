import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import alertIcon from './../../../assets/commons/logo_icon.png';
import styles from './index.module.scss';

export default function AlertContainer(props) {
  let timer;
  useEffect(() => {
    timer = setTimeout(() => props?.setCopy && props?.setCopy(false), 1500);

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
            transition={{ duration: 1.5 }}
            className={styles.alertContainer_wrapper}
            style={props.centered && { left: '50%' }}
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
                  alt='alert'
                  className={styles.alertIcon}
                  style={{
                    height: '.15rem',
                    width: '.15rem',
                  }}
                ></img>
              </div>
              {props.whatText ? (
                <span className={styles.alertMess}>
                  {props.link ? '复制链接:' : '复制:'} {props.whatText}
                </span>
              ) : props.notify ? (
                <span className={styles.alertMess}>{props.notify}</span>
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
