import RedPocketContainer from './RedPoctketContainer';

export default function DailyBonus({ openMe, closeOpenMe }) {
  // const [openMe,setOpenMe] =  useState(null);

  if (!openMe) {
    return null;
  }

  // const img_cont =`${process.env.REACT_APP_DOMAIN}/img/f438/08d4/98163c550b734dc7f54677617a87e772?Expires=1673827200&Signature=n9J3JjAKkdTjQPENJhO3umt8XIynOIXHACn03sxL~EKYTsLsiYPOaJzfzvzfpS6QfH0Dx~r1iFmpUtX8lZknUCvvjCXvTgX4fToXCYq24i6JXqOnHUQvNkNMh8~q4~tc-Liwza9n7yHfeUl8fMeAp-QrkYqXfLV3pE~9L2SSWfPBD6HuUTqckVUIyANHx1Th1mIZkR1jo8e2AaG-hYRzJ6lUMl7D8oI460JSUhmD67Wrgk4MrCA~M2yfdV9hJVTWBWOjNK~1QjA8LB3DSIjlQrmOGH~q-8tj6BpDXaovfMdAo7kUYiihFOBjErDSPMNYGOMivfkjc5bqEGURIP61Hw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4`
  // console.log(img_cont);
  return (
    <div className='overlay' onClick={closeOpenMe} style={{ width: '' }}>
      <div className='bonusContainer_wrapper'>
        <div className='bonusContainer' onClick={(e) => e.stopPropagation()}>
          {/* <img src={img_cont} alt=""/> */}
          <div className='openDailyCloseButton' onClick={closeOpenMe}></div>
          <RedPocketContainer />
          <div className='redPocketDaily_wrapper '>
            <div className='redPocketTitle'>累计金额</div>
            <div className='redPocketAmount'>0.00</div>
            <div className='redPocketButton'>
              <span> 领 取</span>
            </div>
          </div>
          <div className='dailyBonus_information'>
            <p>
              7天签到累积满50元以上,即可马上提现
              <br />
              未满50元则会折算为等价积分,积分可抽8888元大奖
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
