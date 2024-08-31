import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Folder_env } from 'src/utils/helpers';
import customer from '../../assets/blackGold/footer/cs_icon.png';
const BackgroundImg = require('src/variants/' + process.env.REACT_APP_SITE + '/loading_bg.webp');

function LoadingScreen({ loading }) {
  return (
    <div
      className={'loadingScreen'}
      style={{
        background: `url(${BackgroundImg})`,
      }}
    >
      <div className='loading1'>
        <div>
          <Link to='/Customer' className='loadingCustomerContainer'>
            <img src={customer} alt='customerIcon' />
            <div>
              <span>客服</span>
            </div>
          </Link>
        </div>
        <div
          className='load-content'
          style={window.screen.width < 1000 ? { height: '42%' } : { height: '32%' }}
        >
          <div></div>
          <div className='loading-content'>
            {/* This is the progress text of the loading screen */}
            <div
              className='loadBarText'
              style={{
                color: Folder_env('8802') ? '#000' : '',
              }}
            >
              游戏正在加载中...
            </div>

            <div className='gradBorder'>
              <div className='loading_wrapper'>
                <div
                  className={classnames('loading', {
                    initialDataLoaded: !loading.initialDatasLoading,
                    urlDomainLoaded: !loading.urlDomainLoading,
                  })}
                  style={window.screen.width < 1000 ? { height: '15px' } : { height: '24px' }}
                />
              </div>
            </div>
            {/* This displays the version info while loading */}
            <div
              className='loadBarVer'
              style={{
                color: Folder_env('8802') ? '#000' : '',
              }}
            >
              当前版本: V {process.env.REACT_APP_VERSION}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
