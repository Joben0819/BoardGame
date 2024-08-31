import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { setMails } from 'src/reducers/userInfo';
import styles from './index.module.scss';

export default function AccordionComp(props) {
	const [expand, setExpand] = useState(false);
	const contentRef = useRef();
	const { mails } = useSelector((state) => state.userInfo);
	const { currTheme } = useSelector((state) => state.gameSettings);
	const [currMail, setCurrMail] = useState();
	const element = document.getElementById(`accordionBody_${props?.index + 1}`);

	useEffect(() => {
		setExpand(false);
	}, [props?.isRefreshed]);

	useEffect(() => {
		setCurrMail(mails?.find((mail) => mail?.id === props?.mail?.id));
	}, [mails, props?.isRefreshed]);

	const handleExpand = () => {
		setExpand((prev) => !prev);
		let newMails = mails.map((mail) =>
			mail?.id === props?.mail?.id ? { ...props.mail, isRead: true } : mail
		);
		props?.dispatch(setMails(newMails));
	};

	useEffect(() => {
		if (expand && element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
		}
	}, [expand, element]);

	return (
		<motion.div
			initial={{ x: -2000 }}
			animate={{ x: 0 }}
			transition={{ delay: props.delay * 0.05, duration: 0.7 }}
			className={styles.accordion}
			data-theme={currTheme}>
			<div className={`${expand ? 'accordionComp_wrapper' : 'accordionComp_wrapper'}`}>
				<div
					className={styles.accordionHeader}
					onClick={handleExpand}
					style={{ background: props.background }}>
					{props.myImg ? (
						<div className={styles.accordionImageHolder}>
							<div
								className={styles.acRedCircle}
								style={{ opacity: currMail?.isRead ? '0' : '1' }}></div>
							<img
								src={props.myImg}
								style={{ opacity: currMail?.isRead ? '.5' : '1' }}
								alt='Accordion Holder'
							/>
						</div>
					) : (
						<></>
					)}
					<div className={styles.accordionHeaderTitle}>
						<div className={styles.achTitleHolder}>{props.title}</div>
						<div className={styles.createTimeHolder}>
							<span className={styles.wht}>{props.createTime}</span>
						</div>
					</div>
					{props.symbol?.length > 0 && (
						<div className={styles.accordionHeaderSymbol}>
							<img
								src={props.symbol}
								alt='Symbol'
								style={{ transform: expand ? 'rotate(180deg)' : 'rotate(0deg)' }}
							/>
						</div>
					)}
				</div>
				<div
					ref={contentRef}
					id={`accordionBody_${props?.index + 1}`}
					className={styles.accordionBody}
					style={{
						height: expand ? `${contentRef.current.scrollHeight}px` : '0',
						marginTop: expand ? '-0.01rem' : '0',
					}}>
					<div className={styles.accordionBodyMessage}>{props.content}</div>
				</div>
			</div>
		</motion.div>
	);
}
