import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useMobileDetect from 'use-mobile-detect-hook';
import { useAuth } from '../Modal/LoginAuth';
import OtherHeader from '../OtherHeader';
import styles from './index.module.scss';

function WebViewPage(props) {
  const web = useLocation();
  const auth = useAuth();
  const data = `${web.state.url}`;
  const detectMobile = useMobileDetect();
  const isDesktop = detectMobile.isDesktop();
  const isMobile = detectMobile.isMobile();
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  function pxToRem(px) {
    return px / rootFontSize;
  }
  const [innerHeight, setInnerHeight] = useState(0);
  const [computedHeight, setComputedHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [computedWidth, setComputedWidth] = useState(0);
  const [isPortrait, setIsPortrait] = useState(window.orientation === 0 ? true : false);

  useEffect(() => {
    // function Data(){
    // if( data.startsWith("http:")){
    //   window.open(data, '_blank');
    // }

    handleResize();
  }, []);

  const handleResize = useCallback(() => {
    setInnerHeight(window.innerHeight);
    setComputedHeight(pxToRem(window.innerHeight) - 0.4);
    setInnerWidth(window.innerWidth);
    setComputedWidth(pxToRem(window.innerWidth) - 0.4);
    setIsPortrait(window.orientation === 0 ? true : false);
  }, []);

  useEffect(() => {
    webViewSize();
    window.addEventListener('orientationchange', () => {
      webViewSize();
    });

    return () => {
      if (isMobile) {
        setAppSize();
        document.getElementById('root').style.transform =
          window.orientation === 0 ? 'rotate(90deg)' : 'rotate(0deg)';
        window.removeEventListener('orientationchange', webViewSize);
      }
    };
  }, []);

  const webViewSize = () => {
    document.getElementById('root').style.height = 100 + '%';
    document.getElementById('root').style.width = 100 + '%';
    document.getElementById('root').style.transform = 'rotate(0deg)';
  };

  const setAppSize = () => {
    document.getElementById('root').style.height =
      (window.orientation === 0 ? window.innerWidth : window.innerHeight) + 'px';
    document.getElementById('root').style.width =
      (window.orientation === 0 ? window.innerHeight : window.innerWidth) + 'px';
  };

  useEffect(() => {
    let debounceId;

    function handleDebouncedResize() {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(() => {
        handleResize();
      }, 500);
    }

    window.addEventListener('resize', handleDebouncedResize);
    window.addEventListener('orientationchange', handleDebouncedResize);
    window.addEventListener('pageshow', handleDebouncedResize);

    return () => {
      window.removeEventListener('resize', handleDebouncedResize);
      window.removeEventListener('orientationchange', handleDebouncedResize);
      window.removeEventListener('pageshow', handleDebouncedResize);
    };
  }, [handleResize]);

  return (
    <div
      style={
        data === 'null'
          ? { color: 'black', height: '100%', 'background-color': 'white' }
          : { color: 'white', height: '100%' }
      }
    >
      <OtherHeader
        title={'VipPay'}
        amount={web.state.amount}
        backUrl={web.state.backUrl}
        webView={true}
        accountNow={auth?.user?.accountNow}
        nopurse={true}
      />
      <div className={styles.iframeWrapper}>
        <iframe
          title='WebView'
          className={classnames({
            [styles.iframeDesktop]: isDesktop,
            [styles.iframeMobile]: isMobile,
          })}
          style={{
            height: isMobile && (isPortrait ? computedHeight + 'rem' : innerWidth),
            width: isMobile && (isPortrait ? innerWidth : computedHeight + 'rem'),
            transform: isMobile && (isPortrait ? 'rotate(0deg)' : 'rotate(-90deg)'),
          }}
          src={data}
        ></iframe>
      </div>
    </div>
  );
}

export default WebViewPage;
