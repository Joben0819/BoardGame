import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowLoginModal, setShowOtherModalComp } from 'src/reducers/gameSettings';
import { popSound } from 'src/utils/audio-player';
import { isLoggedIn } from 'src/utils/helpers';

function Morelist({ setOpenAnnounceModal, setShowMore, setSafeBoxModal }) {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const dispatch = useDispatch();
  const moreNavigate = useNavigate();

  function gotoNewData() {
    moreNavigate('/PersonalInfo');
  }

  const closeShowMore = (e) => {
    e.stopPropagation();
    setShowMore(false);
  };

  return (
    <>
      <div className='moreListBackground' onClick={closeShowMore} />
      <div className='moreList_container' onClick={(e) => e.stopPropagation()}>
        <ul>
          <li
            onClick={() => {
              dispatch(setShowOtherModalComp(true));
              setOpenAnnounceModal();
              popSound();
            }}
          >
            <div className='moreImg'>
              <img
                src={require(`../../../../assets/${currTheme}/footer/megaphone.png`)}
                alt='Megaphone'
              />
            </div>

            <div className='moreText'>
              <p>公告</p>
            </div>
          </li>
          <li
            onClick={() => (isLoggedIn() ? setSafeBoxModal() : dispatch(setShowLoginModal(true)))}
          >
            <div
              className='moreImg'
              onClick={() => {
                popSound();
              }}
            >
              <img src={require(`../../../../assets/${currTheme}/footer/vault.png`)} alt='Vault' />
            </div>

            <div className='moreText'>
              <p>保险箱</p>
            </div>
          </li>
          <li onClick={() => (isLoggedIn() ? gotoNewData() : dispatch(setShowLoginModal(true)))}>
            <div className='moreImg'>
              <img src={require(`../../../../assets/${currTheme}/footer/user.png`)} alt='User' />
            </div>

            <div className='moreText'>
              <p>个人信息</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Morelist;
