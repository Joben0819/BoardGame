import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch } from 'react-redux';
import IMG from 'src/commons/ImgWithFallback';
import { setShowLoginModal } from 'src/reducers/gameSettings';
import { isLoggedIn } from 'src/utils/helpers';
import fallbackImg from '../../../assets/commons/reusable/ImgWithFallback/onErrorImg.png';
import loadingIcon from '../../../assets/commons/reusable/ImgWithFallback/square-load2.gif';

export default function ImageAccordionComp({
  handleSwitched,
  icon,
  content,
  showContent,
  Switched,
  url,
}) {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const handleExpand = () => {
    if (url) {
      window.open(url, '_blank');
    }
    handleSwitched();
    if (!isLoggedIn()) {
      dispatch(setShowLoginModal(true));
    } else {
      setExpand((prev) => !prev);
    }
  };

  return (
    <div className='imageAccordionContainer'>
      <div className='imageAccordionHeader' onClick={handleExpand}>
        <IMG
          fallback={fallbackImg}
          loadingIcon={loadingIcon}
          src={icon}
          alt='hi'
          className='s1_photoEventBanner'
        />
      </div>
      <div
        className='imageAccordionBody'
        style={expand && Switched === false ? { display: 'block' } : { display: 'none' }}
      >
        <div>{ReactHtmlParser(content)}</div>
      </div>
    </div>
  );
}
