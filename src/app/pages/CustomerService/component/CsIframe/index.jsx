import { useEffect, useState } from 'react';
import { BrowseInit } from 'src/api/game/gamelist';
import styles from './index.module.scss';

const CsIframe = () => {
  const [custom, setcustom] = useState('');

  useEffect(() => {
    BrowseInit().then((res) => {
      setcustom(res.data.data.customerUrl);
    });
  }, []);

  function zoomOutContent(iframe) {
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    var styles = `
        <style>
          html, body {
            zoom: 0.8; /* Adjust the value to zoom in or out */
            -moz-transform: scale(0.8); /* For Firefox */
            -webkit-transform: scale(0.8); /* For Chrome, Safari, and Opera */
            transform: scale(0.8);
            transform-origin: 0 0;
          }
        </style>
      `;
    iframeDoc.head.insertAdjacentHTML('beforeend', styles);
  }

  return (
    <div className={styles.csIframe}>
      <iframe
        onLoad={() => zoomOutContent(this)}
        scrolling='auto'
        style={{
          width: '100%',
          height: '100%',
        }}
        src={!custom ? 'https://yangxianli1.cn?groupid=bd901135e6b1fe631dd7e40e506b38d4' : custom}
        // {!custom ? 'https://direct.lc.chat/14792511/' : custom}
        title='Customer Services'
      ></iframe>
    </div>
  );
};

export default CsIframe;
