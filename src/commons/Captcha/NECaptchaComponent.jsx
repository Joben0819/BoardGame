import React, { useEffect, useRef } from "react";
import styles from "./NECaptchaComponent.module.scss"

const NECaptchaComponent = ({
  onSuccess,
  onFailure,
  captchaId,
  isCaptchaOpen,
  setIsCaptchaOpen,
}) => {
  const captchaContainerRef = useRef(null);
  let captchaInstance = null;

  useEffect(() => {
    if (captchaId && isCaptchaOpen) {
      window.initNECaptcha(
        {
          captchaId: captchaId,
          element: "#captchaContainer",
          mode: "embed",
          width: "2rem",
          apiVersion: 2,
          customStyles: {
            imagePanel: {
              borderRadius: 10
            },
            controlBar: {
              textColor: '#8e91aa',
              borderColor: '#dfe1ea',
              borderColorMoving: '#dfe1ea',
              borderColorSuccess: '#dfe1ea',
              borderColorError: '#dfe1ea',
              background: '#f0f2f4',
              backgroundMoving: 'linear-gradient(270deg, rgba(55, 73, 233, 0.48) 0%, rgba(55, 73, 233, 0.08) 100%)',
              backgroundSuccess: 'linear-gradient(270deg, rgba(35, 196, 148, 0.48) 14.18%, rgba(35, 196, 148, 0.08) 100%)',
              backgroundError: 'linear-gradient(270deg, rgba(215, 80, 80, 0.48) 0%, rgba(215, 80, 80, 0.08) 100%)',
              height: 40,
              borderRadius: 10,
              slideIcon: 'https://yidunfe.nos-jd.163yun.com/moving1669028036380.png',
              slideIconMoving: 'https://yidunfe.nos-jd.163yun.com/moving1669028036380.png',
              slideIconSuccess: 'https://yidunfe.nos-jd.163yun.com/success1669028036503.png',
              slideIconError: 'https://yidunfe.nos-jd.163yun.com/error1669028036362.png'
            }
          },
          onVerify: (err, data) => {
            if (err) return
            onSuccess(data);
          },
        },
        function onload(instance) {
          console.log("NECaptcha initialized:", instance);
          captchaInstance = instance;
        },
        function onerror(err) {
          console.error("NECaptcha initialization failed:", err);
          onFailure(err);
        }
      );
    }

    // Cleanup function
    return () => {
      setIsCaptchaOpen(false);
      if (captchaInstance) {
        captchaInstance.destroy();
        captchaInstance = null;
      }
    };
  }, [onSuccess, onFailure, captchaId, isCaptchaOpen, setIsCaptchaOpen]);

  return (
    <div className={styles.captchaWrapper}>
      <div
        className={styles.backdrop}
        onClick={() => setIsCaptchaOpen(false)}
      />
      <div id="captchaContainer" ref={captchaContainerRef}></div>
    </div>
  );
};

export default NECaptchaComponent;
