import { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { getMessageCommonProblems } from 'src/api/game/gamelist';
import AccordionComp from '../../components/Fragments/AccordionComp';
import styles from './index.module.scss';
function FAQComponent() {
	const { currTheme } = useSelector((state) => state.gameSettings);
	const [faq, setFaq] = useState([]);
	const [isRefreshed, setIsRefreshed] = useState(false);
	let resetIsRefreshedTimer;

	useEffect(() => {
		getMessageCommonProblems().then((res) => {
			setFaq(res.data.data);
		});
	}, []);

	const reloadData = async () => {
		getMessageCommonProblems().then((res) => {
			setIsRefreshed(true);
			setFaq(res.data.data);
			resetIsRefreshedTimer = setTimeout(() => {
				setIsRefreshed(false);
			}, 100);
		});
	};

	return (
		<div className={styles.clearPage_wrapper} data-theme={currTheme}>
			{/* <div>
          <OtherHeader title={"常见问题"} />
        </div> */}
			<div className={styles.helpPage_wrapper}>
				<PullToRefresh onRefresh={reloadData} className={styles.pullToRefresh}>
					<ul>
						{faq?.map((question, index) => {
							return (
								<li key={index}>
									<AccordionComp
										index={index}
										isRefreshed={isRefreshed}
										title={question.title}
										content={ReactHtmlParser(question.content)}
										symbol={require(`../../assets/${currTheme}/fragments/arrow_down.png`)}
										delay={index}
										// background="C4A994"
									/>
								</li>
							);
						})}
					</ul>
				</PullToRefresh>
			</div>
		</div>
	);
}

export default FAQComponent;
