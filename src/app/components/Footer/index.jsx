import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Svga } from 'react-svga';
import { boxPassIsOpen, getAccountInfo, userReceivedMessage } from 'src/api/game/gamelist';
import {
	setShowAnnouncementModal,
	setShowBindWithdrawModal,
	setShowLoginModal,
	setShowOtherModalComp,
} from 'src/reducers/gameSettings';
import { resetUserInfoState, setBoxPassIsSet, setMails } from 'src/reducers/userInfo';
import { isLoggedIn, logoutUser } from 'src/utils/helpers';
import SafeBoxModal from '../../components/Modal/Vault';
import { useAuth } from '../Modal/LoginAuth';
import MoreModal from '../Modal/MoreModal/index';
import useModal from '../Modal/useModal/index';
import { default as GiftBoxModal, default as MegaphoneModal } from '../OtherModalComponent';
import UserAuthModal from '../UserAuthModal/UserAuthModal';
import styles from './index.module.scss';

// Audio
import { giftSound, popSound } from 'src/utils/audio-player';
import ccSoundFile from './../../data/audioData/cleancode.mp3';
import cusSoundFile from './../../data/audioData/customer.mp3';
import mailSoundFile from './../../data/audioData/message.mp3';
import rSoundFile from './../../data/audioData/recharge.mp3';
import wSoundFile from './../../data/audioData/withdraw.mp3';
const withdrawSvga = require(`src/variants/${process.env.REACT_APP_SITE}/withdraw.svga`);
const rechargeSvga = require(`src/variants/${process.env.REACT_APP_SITE}/recharge.svga`);

function Footer() {
	const [showMore, setShowMore] = useModal();
	const footerNav = useNavigate();
	const [omOpen, setOmOpen] = useState(false);
	const [omMegaphone, setOmMegaphone] = useState(false);
	const [userAuthModal, setUserAuthModal] = useState(false);
	const [unreadMsgs, setUnreadMsgs] = useState();
	const [activeSideLoggedIn, setActiveSideLoggedIn] = useState(3);
	const auth = useAuth();

	const dispatch = useDispatch();
	const { mails, userData } = useSelector((state) => state.userInfo);
	const { currTheme, showAnnouncementModal } = useSelector((state) => state.gameSettings);

	const [safeBoxModalOpen, setSafeBoxModalOpen] = useState(false);

	const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
	const ccAudioFile = new Audio(ccSoundFile);
	const wAudioFile = new Audio(wSoundFile);
	const rAudioFile = new Audio(rSoundFile);
	const mailAudioFile = new Audio(mailSoundFile);
	const cusAudioFile = new Audio(cusSoundFile);

	const gotoWithdraw = () => {
		// footerNav("/InternalSidebarPage", {
		//   state: { page: "withdraw", section: "selfwithdraw", sideActive: 1 },
		// });
		if (isIOS) {
			wAudioFile.play();
		}
		const loginNow = JSON.parse(localStorage.getItem('loginNow'));
		localStorage.setItem('withdrawModal', 'true');
		if (!isLoggedIn()) {
			dispatch(setShowBindWithdrawModal(true));
		} else {
			footerNav('/Withdraw');
			dispatch(setShowBindWithdrawModal(false));
		}
	};

	const gotoWashCode = () => {
		// footerNav("/InternalClearPage", {
		//   state: { page: "washCode", sideActive: 1 },
		// });
		if (isIOS) {
			ccAudioFile.play();
		}
		footerNav('/CodeWashing');
	};

	const gotoRecharge = () => {
		// footerNav("/InternalSidebarPage", {
		//   state: { page: "recharge", section: "companyDeposit", sideActive: 1 },
		// });
		if (isIOS) {
			rAudioFile.play();
		}
		footerNav('/Recharge');
	};

	const gotoUserReceivedMail = () => {
		if (isIOS) {
			mailAudioFile.play();
		}
		footerNav('/Mailbox');
	};

	const handleActivity = (fn, params) => {
		fn(params);
	};

	const handleLoginRequired = async (fn, params) => {
		const res = await getAccountInfo();
		if (res.data.code === 401) {
			auth?.logout();
			logoutUser();
			dispatch(resetUserInfoState());
			dispatch(setShowLoginModal(true));
		} else {
			fn(params);
		}
	};

	const handleClick = ({ fn, params, isActivity = false }) => {
		if (isActivity) {
			handleActivity(fn, params);
		} else if (!isLoggedIn()) {
			dispatch(setShowLoginModal(true));
		} else {
			handleLoginRequired(fn, params);
		}
	};

	useEffect(() => {
		if (isLoggedIn()) {
			userReceivedMessage().then((res) => {
				if (mails?.length === 0) {
					const transformedMails = res.data?.data
						?.sort((a, b) => (a.createTime > b.createTime ? 1 : -1))
						?.map((mail) => ({ ...mail, isRead: false }));
					dispatch(setMails(transformedMails));
				}
			});
		}
	}, []);

	useEffect(() => {
		if (mails?.length > 0) {
			setUnreadMsgs(mails?.filter((mail) => mail?.isRead === false));
		}
	}, [mails]);

	useEffect(() => {
		if (showAnnouncementModal) {
			setOmMegaphone(showAnnouncementModal);
			dispatch(setShowAnnouncementModal(false));
		}
	}, [showAnnouncementModal]);

	useEffect(() => {
		boxPassIsOpen().then((res) => {
			dispatch(setBoxPassIsSet(res.data?.data));
		});
	}, [userData]);

	return (
		<>
			<UserAuthModal
				open={userAuthModal}
				onLog={() => setUserAuthModal(false)}
				backDrop={() => setUserAuthModal(false)}
				inputBox={() => setUserAuthModal(true)}
			/>

			<GiftBoxModal
				open={omOpen}
				onClose={() => setOmOpen(!omOpen)}
				activesideTab={activeSideLoggedIn}
				isSettings={false}
			/>

			<MegaphoneModal
				open={omMegaphone}
				onClose={() => setOmMegaphone(!omMegaphone)}
				activesideTab={3}
			/>

			<SafeBoxModal
				safeBoxOpen={safeBoxModalOpen}
				safeBoxClose={() => setSafeBoxModalOpen(false)}
			/>

			<motion.div
				initial={{ y: 100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.15 }}
				className={styles.img3}>
				<ul className={styles.footerlists}>
					<li>
						<div>
							<Link to='/Customer'>
								<img alt='' src={require(`../../assets/${currTheme}/footer/Icon-support.png`)} />
							</Link>
							<p className={styles.text}>客服</p>
						</div>
					</li>
					<li onClick={() => handleClick({ fn: gotoWashCode })}>
						<div>
							<div>
								<img alt='' src={require(`../../assets/${currTheme}/footer/Icon-chip.png`)} />
							</div>
							<p className={styles.text}>洗码</p>
						</div>
					</li>
					<li
						onClick={() => {
							if (userData?.id) setActiveSideLoggedIn(1);
							if (!userData?.id) setActiveSideLoggedIn(3);
							dispatch(setShowOtherModalComp(true));
							giftSound();
							handleClick({ fn: setOmOpen, params: true, isActivity: true });
						}}>
						<div>
							<img alt='' src={require(`../../assets/${currTheme}/footer/Icon-gift.png`)} />
							<p className={styles.text}>活动</p>
						</div>
					</li>
					<li onClick={() => handleClick({ fn: gotoUserReceivedMail })}>
						<div>
							{!isLoggedIn() ||
								(unreadMsgs?.length > 0 && (
									<center className='alertIcon'>{unreadMsgs.length}</center>
								))}
							<img alt='' src={require(`../../assets/${currTheme}/footer/Icon-message.png`)} />
							<p className={styles.text}>消息</p>
						</div>
					</li>
					<li onClick={() => setShowMore(!setShowMore)}>
						<div>
							<MoreModal
								showMore={showMore}
								setShowMore={setShowMore}
								setOpenAnnounceModal={() => {
									setOmMegaphone(true);
									setShowMore(false);
								}}
								setSafeBoxModal={() => {
									setShowMore(false);
									setSafeBoxModalOpen(true);
								}}
							/>
							<img
								alt=''
								src={require(`../../assets/${currTheme}/footer/Icon-more.png`)}
								onClick={() => {
									popSound();
									setShowMore(!setShowMore);
								}}
							/>
							<p className={styles.text}>更多</p>
						</div>
					</li>
				</ul>

				<div className='headerButtonsWrapper'>
					<div className={styles.Buttons}>
						<div className={styles.withdraw} onClick={() => handleClick({ fn: gotoWithdraw })}>
							<Svga src={withdrawSvga} className={styles.greenBtn} option={{ loop: true }} />
						</div>
						<div className={styles.other} onClick={() => handleClick({ fn: gotoRecharge })}>
							<Svga src={rechargeSvga} className={styles.yellowBtn} option={{ loop: true }} />
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}

export default Footer;
