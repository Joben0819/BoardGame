import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { bankList, setBindCard } from 'src/api/game/gamelist';
import { popSound } from 'src/utils/audio-player';
import { MODAL_BG_ANIMATION, MODAL_CONTENT_ANIMATION } from 'src/utils/helpers';
import ButtonDesignTwo from '../../../../components/Fragments/Buttons/ButtonDesignTwo';
import AlertContainer from '../../../../components/Modal/AlertContainer';
import TemplatedInputForUser from '../../../../components/TemplatedInputForUser';
import styles from './index.module.scss';

const AddCardModal = ({ showMe, onClose, onSuccess }) => {
  //binding the user Card bank
  const [bindBankId, setBindBankId] = useState(139);
  const [bindRealName, setBindRealName] = useState();
  const [bindBankAddress, setBindBankAddress] = useState();
  const [bindBankAccount, setBindBankAccount] = useState();
  const [alertBind, setAlertBind] = useState(false);
  const [bindCardMsg, setBindCardMsg] = useState('');
  const [listofBanks, setListofBanks] = useState([]);
  const { currTheme } = useSelector((state) => state.gameSettings);
  const [myBankList, setMyBankList] = useState([]);

  useEffect(() => {
    bankList().then((res) => {
      setListofBanks(res.data.data);
    });
  }, []);

  useEffect(() => {
    listofBanks?.map((data) => {
      setMyBankList((prevState) => [
        ...prevState,
        {
          value: data.id,
          label: (
            <span style={{ fontSize: '0.2rem' }}>
              <img style={{ width: '0.2rem' }} src={data.bankIcon} alt='' /> &nbsp;{data.bankName}
            </span>
          ),
        },
      ]);
    });
  }, [listofBanks]);

  function ChangeBankIdSelect(selected) {
    setBindBankId(selected.value);
  }

  function BindMyCard() {
    let message = '';

    if (!bindRealName) {
      message = '请输入您的姓名';
    } else if (!bindBankAccount) {
      message = '请输入户行卡号';
    } else if (!bindBankAddress) {
      message = '请输入开户地址';
    } else if (bindBankAccount.length < 16) {
      message = '请输入超过16个银行卡号';
    }

    if (message) {
      setBindCardMsg(message);
      setAlertBind(true);
      setTimeout(() => {
        setAlertBind(false);
      }, 1000);
      return;
    }
    setBindCard(
      bindRealName,
      bindBankAccount,
      bindBankAddress,
      bindBankId
    ).then((res) => {
      if (res.data.code === 200) {
        onSuccess();
      }
      setBindCardMsg(res.data.msg);
      setAlertBind(true);
    });
    setTimeout(() => {
      setAlertBind(false);
      handleClose();
    }, 3000);
  }

  function HandleBindData(e, v) {
    if (v === 1) {
      setBindRealName(e.target.value);
    }
    if (v === 2) {
      setBindBankAccount(e.target.value);
    }
    if (v === 3) {
      setBindBankAddress(e.target.value);
    }
  }
  function handleClose(activesideTab) {
    onClose();
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

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
              onClose();
            }}
          >
            <motion.div
              variants={MODAL_CONTENT_ANIMATION}
              initial='hidden'
              animate='visible'
              exit='exit'
              className={styles.wrapper}
              onClick={(e) => {
                e.stopPropagation();
              }}
              data-theme={currTheme}
            >
              <div className={styles.header}>
                <div className={styles.headerTitle}>
                  绑定银行卡
                </div>
                <span
                  onClick={() => {
                    handleClose();
                    popSound();
                  }}
                  className={styles.closeBtn}
                ></span>
              </div>
              <div className={styles.addCardContainer}>
                <div className={styles.bodyContainer}>
                  <div className={styles.inputFields}>
                    <ul>
                      <li
                        style={{
                          marginBottom: '0.1rem',
                        }}
                      >
                        <TemplatedInputForUser
                          bgColor={currTheme === 'blackGold' ? '#000' : ''}
                          changeMe={(e) => HandleBindData(e, 1)}
                          label='真实姓名:'
                          placeholder='请输入您的姓名'
                        />
                      </li>
                      <li>
                        <span style={{ fontSize: '.15rem' }}>那图: </span>
                        <div className={styles.selectContainer}>
                          <Select
                            options={myBankList}
                            default={myBankList[1]}
                            isClearable={false}
                            // menuIsOpen={true}
                            defaultValue={myBankList[0]}
                            classNamePrefix={'bindCardSelect'}
                            onChange={(selected) => ChangeBankIdSelect(selected)}
                            isSearchable={false}
                          />
                        </div>
                      </li>
                      <li
                        style={{
                          marginBottom: '0.15rem',
                          marginTop: '0.1rem',
                        }}
                      >
                        <TemplatedInputForUser
                          bgColor={currTheme === 'blackGold' ? '#000' : ''}
                          changeMe={(e) => HandleBindData(e, 2)}
                          label='银行卡号:'
                          placeholder='请输入开户行卡号'
                        />
                      </li>
                        <li>
                          <TemplatedInputForUser
                            bgColor={currTheme === 'blackGold' ? '#000' : ''}
                            changeMe={(e) => HandleBindData(e, 3)}
                            label='开户地址:'
                            placeholder='请输入开户行地址'
                          />
                        </li>
                    </ul>
                  </div>
                  {/* <div className="walletSlot_fadedText">
              温馨提示:选择正确的开户行、填写真实姓名,持卡人与真实姓名不一致将无法到账成功。绑定成功后,会员自己无法修改；如需要修改，请您联系在线客服!
              </div> */}
                  <div
                    className={styles.buttonHolder}
                    onClick={() => {
                      BindMyCard();
                    }}
                  >
                    <ButtonDesignTwo
                      bradius={0}
                      // clickMe={BindMyCard  handleClose}
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
  );
};

export default AddCardModal;
