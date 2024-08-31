import { deviceDetect } from 'react-device-detect';

export const Folder_env = (data) => {
  return process.env.REACT_APP_SITE === data;
};

export const playAudio = () => {
  const audio = document.getElementById('play');
  audio && audio.play();
};

export const pauseAudio = () => {
  const audio = document.getElementById('play');
  audio && audio.pause();
};

export const logoutUser = () => {
  localStorage.removeItem('loginNow');
  localStorage.removeItem('recentVipPayRecharge');
  sessionStorage.removeItem('pass');
};

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('loginNow');
};

export const isIOS = () => {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(
      navigator.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};

export const isWindows = () => {
  return navigator.platform.includes('Win32');
};

export const isMac = () => {
  return navigator.platform.includes('MacIntel');
};

const {
  isMobile,
  os,
  osVersion,
  vendor,
  model,
  isBrowser,
  osName,
  browserName,
  browserFullVersion,
} = deviceDetect();

export const getDeviceModel = () => {
  if (isMobile) {
    return `${os} ${osVersion} ${vendor} ${model}`;
  } else if (isBrowser) {
    return `${osName} ${osVersion} ${browserName} ${browserFullVersion}`;
  }
  return null;
};

export const MODAL_BG_ANIMATION = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
};

export const MODAL_CONTENT_ANIMATION = {
  hidden: {
    scale: 0.9,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
