import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendDetail } from 'src/api/game/gamelist';
import { isLoggedIn } from 'src/utils/helpers';
import ShareModal from '../../components/Modal/ShareModal';
import OtherHeader from '../../components/OtherHeader';

function ShareQR() {
  const ThisPage = useLocation();
  const takeMe = useNavigate();
  if (!isLoggedIn()) {
    takeMe('/');
  }
  const [openReactShare, setOpenReactShare] = useState(false);
  const [shareUrl, setShareUrl] = useState();

  useEffect(() => {
    getRecommendDetail().then((res) => {
      setShareUrl(res.data.data.url);
    });
  }, []);

  return (
    isLoggedIn() && (
      <>
        <div
          className='clearPage_wrapper hg-100 d-flex'
          style={{ color: 'white', flexDirection: 'column' }}
        >
          <OtherHeader title={'推广代理'} />
          <div className='sharePage_wrapper'>
            <div
              className='sharePage_container'
              style={{
                background: `url(${JSON.stringify(ThisPage.state?.imageBackground)}) no-repeat `,
                backgroundSize: ThisPage.state?.shareId ? 'cover' : 'contain',
                // backgroundPosition: "center",
                backgroundColor: ThisPage.state?.shareId ? '#C1A6A9' : '#181832',
              }}
            >
              <ShareModal
                shareUrl={shareUrl}
                shareModalOpen={openReactShare}
                shareModalClose={() => {
                  setOpenReactShare(false);
                }}
              />

              {ThisPage.state?.shareId ? (
                <div className='qrContainer'>
                  <div className='qrCodeScan'>
                    {shareUrl && (
                      <div className='qrCodeScanner'>
                        <QRCode value={shareUrl} size={'1.3rem'} />
                      </div>
                    )}
                  </div>

                  <div className='qrShareBtn_container'>
                    <div className='shareIdContainer'>会员ID:{ThisPage.state?.shareId}</div>
                    <div
                      onClick={() => {
                        setOpenReactShare(true);
                      }}
                      className='clickShareContainer'
                    ></div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ShareQR;
