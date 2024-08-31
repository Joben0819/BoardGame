import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { setBindCard } from 'src/api/game/gamelist'
import { popSound } from 'src/utils/audio-player'
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers'
import ButtonDesignTwo from '../../../../components/Fragments/Buttons/ButtonDesignTwo'
import AlertContainer from '../../../../components/Modal/AlertContainer'
import TemplatedInputForUser from '../../../../components/TemplatedInputForUser'
import styles from './index.module.scss'

const AddUSDTModal = ({ showMe, onClose, onSuccess }) => {
	const [realName, setRealName] = useState()
	const [usdtAddress, setUsdtAddress] = useState()
	const [alertBind, setAlertBind] = useState(false)
	const [bindCardMsg, setBindCardMsg] = useState('')
	const { currTheme } = useSelector(state => state.gameSettings)

	function BindMyCard() {
		let message = ''

		if (!realName) {
			message = '请输入您的姓名'
		} else if (!usdtAddress) {
			message = '请输入您的 USDT 地址'
		} else if (usdtAddress.length < 16) {
			message = '请输入正确的 USDT 地址'
		}

		if (message) {
			setBindCardMsg(message)
			setAlertBind(true)
			setTimeout(() => {
				setAlertBind(false)
			}, 1000)
			return
		}
		setBindCard(realName, usdtAddress, 'USDT-TRC20', 139).then(res => {
			if (res.data.code === 200) {
				onSuccess()
			}
			setBindCardMsg(res.data.msg)
			setAlertBind(true)
		})
		setTimeout(() => {
			setAlertBind(false)
			onClose()
		}, 3000)
	}

	function HandleBindData(e, v) {
		if (v === 1) {
			setRealName(e.target.value)
		}
		if (v === 2) {
			setUsdtAddress(e.target.value)
		}
	}

	return (
		<AnimatePresence>
			{showMe && (
				<>
					<AlertContainer alertMe={alertBind} top={2.2} left={1.45} notify={bindCardMsg} />
					<motion.div
						variants={MODAL_BG_ANIMATION}
						initial='hidden'
						animate='visible'
						exit='exit'
						className={styles.overlay}
						onClick={() => {
							onClose()
						}}
					>
						<motion.div
							variants={MODAL_CONTENT_ANIMATION}
							initial='hidden'
							animate='visible'
							exit='exit'
							className={styles.wrapper}
							onClick={e => {
								e.stopPropagation()
							}}
							data-theme={currTheme}
						>
							<div className={styles.header}>
								<div className={styles.headerTitle}>绑定USDT</div>
								<span
									onClick={() => {
										onClose()
										popSound()
									}}
									className={styles.closeBtn}
								></span>
							</div>
							<div className={styles.addCardContainer}>
								<div className={styles.bodyContainer}>
									<div className={styles.inputFields}>
										<ul>
											<li>
												<TemplatedInputForUser
													bgColor={currTheme === 'blackGold' ? '#000' : ''}
													changeMe={e => HandleBindData(e, 1)}
													label='真实姓名:'
													placeholder='请输入您的姓名'
												/>
											</li>
											<li
												style={{
													marginBlock: '0.15rem'
												}}
											>
												<TemplatedInputForUser
													bgColor={currTheme === 'blackGold' ? '#000' : ''}
													label='链名称: '
													placeholder={''}
													myValue='USDT-TRC20'
													changeMe={e => e}
													readOnly
												/>
											</li>
											<li>
												<TemplatedInputForUser
													bgColor={currTheme === 'blackGold' ? '#000' : ''}
													changeMe={e => HandleBindData(e, 2)}
													label='钱包地址:'
													placeholder='请输入USDT钱包地址'
												/>
											</li>
										</ul>
									</div>
									<div
										className={styles.buttonHolder}
										onClick={() => {
											BindMyCard()
										}}
									>
										<ButtonDesignTwo
											bradius={0}
											buttonName='确认绑定'
											height={0.3}
											width={0.8}
											padding={'0.035rem 0'}
										/>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default AddUSDTModal
