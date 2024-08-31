import { useSelector } from 'react-redux';

function CheckVersionModal({ cvmOpen, cmvClose }) {
  const { currTheme } = useSelector((state) => state.gameSettings);

  if (!cvmOpen) return null;

  return (
    <>
      <div className='checkVersion_wrapper' onClick={cmvClose}>
        <div className='checkVersionBg' onClick={(e) => e.stopPropagation()} data-theme={currTheme}>
          <div>i</div> <span>当前版本是最新版本</span>
        </div>
      </div>
    </>
  );
}

export default CheckVersionModal;
