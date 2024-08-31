import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SMS, bindPhone } from 'src/api/game/gamelist';
import { Folder_env } from 'src/utils/helpers';
import AlertContainer from '../../../components/Modal/AlertContainer';
import styles from './index.module.scss';

let cooldownInterval;

export default function BindPhone() {
	const { currTheme } = useSelector((state) => state.gameSettings);
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [verify, setVerify] = useState('');
	const [alertBindShow, setAlertBindShow] = useState(false);
	const [alertBindMsg, setAlertBindMsg] = useState('');
	const [canSendCode, setCanSendCode] = useState(true);
	const [count, setCount] = useState(60);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (count === 0) {
			setCanSendCode(true);
			clearInterval(cooldownInterval);
			setCount(60);
		}
	}, [count]);

	const showAlert = (message, duration = 1500) => {
		setAlertBindMsg(message);
		setAlertBindShow(true);
		setTimeout(() => {
			setAlertBindShow(false);
		}, duration);
	};

	const handleBind = () => {
		if (!phone) {
			showAlert('请输入中国大陆手机号');
			return;
		}
		if (Folder_env('8803') && password?.length < 6) {
			showAlert('请输入6-16位数字与字母的组合');
			return;
		}
		if (verify?.length < 6) {
			showAlert('请输入6位数字的验证码');
			return;
		}
		bindPhone(phone, password, verify).then((res) => {
			showAlert(res.data.msg);
		});
	};

	const handleSms = () => {
		if (!phone) {
			showAlert('请输入手机号码');
			return;
		}

		if (canSendCode) {
			SMS(phone)
				.then((res) => {
					if (res?.data?.code === 200) {
						showAlert(res?.data?.msg);
						setCanSendCode(false);
						cooldownInterval = setInterval(() => {
							setCount((prevCount) => prevCount - 1);
						}, 1000);
					}

					if (res?.data?.code === 500) {
						showAlert(res?.data?.msg);
						return;
					}
				})
				.catch((error) => {
					console.error('Error', error);
				});
		}
	};

	const handleVerifyChange = (e) => {
		const newValue = e.target.value.slice(0, 6);
		setVerify(newValue);
	};

	const isAllowedKey = ({ key, isMetaKey }) => {
		if (isMetaKey) return true;
		const allowedKeys = [
			'0',
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'Backspace',
			'Meta',
			'Control',
			'Enter',
			'ArrowLeft',
			'ArrowRight',
		];
		return allowedKeys.includes(key);
	};

	const onlyAllowDigits = (e) => {
		if (
			!isAllowedKey({
				key: e.key,
				isMetaKey: e.metaKey,
			})
		)
			return e.preventDefault();
	};

	const handleChange = (e) => {
		setPassword(e.target.value);
		if (e.target.value === '') {
			setShowPassword(false);
		}
	};

	return (
		<div className={styles.container} data-theme={currTheme}>
			<AlertContainer top={2.7} left={4.1} alertMe={alertBindShow} notify={alertBindMsg} />
			<div className={styles.inputFields} style={{ marginLeft: '10.5%' }}>
				<ul>
					<li>
						<input
							type='number'
							placeholder='请输入中国大陆手机号'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							onWheel={(e) => {
								e.currentTarget.blur();
								e.stopPropagation();
							}}
							onKeyDown={onlyAllowDigits}
						/>
					</li>
					<li>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder='请输入密码'
							onChange={(e) => handleChange(e)}
							value={password}
						/>
						<div className={styles.eyePatch}>
							<img
								onClick={() => setShowPassword(!showPassword)}
								src={
									showPassword
										? require(`src/app/assets/${currTheme}/login_register/eye-show.png`)
										: require(`src/app/assets/${currTheme}/login_register/eye-hide.png`)
								}
								alt='Eye Icon'
								className={styles.eye}
							/>
						</div>
					</li>
					<li>
						<div className={styles.withButton}>
							<input
								type='number'
								placeholder='请输入验证码'
								value={verify}
								max={6}
								onChange={handleVerifyChange}
							/>
							<div className={styles.buttonHolder} data-theme={currTheme}>
								<button onClick={handleSms}>{canSendCode ? '获取验证码' : `${count}s`}</button>
							</div>
						</div>
					</li>
				</ul>
				<div className={styles.yellowText}>
					温馨提示:实名认证手机号码可用手机号登入,账户安全更有保障。
				</div>
				<div className={styles.buttonHolder} style={{ marginTop: '0.1rem' }}>
					<div className={styles.buttonBind} data-theme={currTheme} onClick={handleBind}>
						绑定
					</div>
				</div>
			</div>
		</div>
	);
}
