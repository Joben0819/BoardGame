import { Fragment, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactHtmlParser from 'react-html-parser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  bankRecharge,
  onlineRecharge,
  payChannelList,
  rechargeBankList,
  rechargeUsdt,
  rechargeUsdtList,
  vipPayDeposit,
  vipPayLogin,
} from 'src/api/game/gamelist';
import AlertContainer from 'src/app/components/Modal/AlertContainer';
import PanelHeader from '../../../../components/PanelHeader';
import ValueItem from './components/ValueItem';
import styles from './index.module.scss';

const RechargeContent = ({
  activeSidebarItem,
  setShowSuccessModal,
  credPaymentSuccess,
  setCredPaymentSuccess,
}) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  const { ipAddress } = useSelector((state) => state.userInfo);
  const [rechargeBankListData, setRechargeBankListData] = useState();
  const [payChannels, setPayChannels] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [rechargeLimit, setRechargeLimit] = useState();
  const [selectedValueItem, setSelectedValueItem] = useState();
  const [amountToRecharge, setAmountToRecharge] = useState('');
  const [recentVipPayRecharge, setRecentVipPayRecharge] = useState(0);
  const [remittanceName, setRemittanceName] = useState('');
  // const location = useLocation();
  const takeMe = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState('');
  const [gotPressed, setGotPressed] = useState(false);
  const [usdtRechargeTypeList, setUsdtRechargeTypeList] = useState();
  const [activeUsdtType, setActiveUsdtType] = useState();
  const [usdtTransId, setUsdtTransId] = useState('');
  const [usdtRechargeAmount, setUsdtRechargeAmount] = useState(0);
  const { tex1, tex2, tex3, tex4, tex5 } = activeSidebarItem;
  const [activePanelTab, setActivePanelTab] = useState(0);

  function handleCopyAlert(msg) {
    setShowAlert(true);
    setGotPressed(true);
    if (activeSidebarItem?.id === 2) {
      setShowAlertMsg(msg);
    } else {
      setShowAlertMsg(!credPaymentSuccess ? '请您先提单 再复制' : msg);
    }
    setTimeout(function () {
      setGotPressed(false);
      setShowAlert(false);
    }, 1000);
  }

  useEffect(() => {
    activeSidebarItem?.id === 1 &&
      rechargeBankList().then((res) => {
        // { bankName: "支付渠道", id: 0, discountBill: 0 },
        const bankList = [...res?.data?.data];
        setRechargeBankListData(
          bankList.map((item) => {
            return {
              ...item,
              tabName: item?.bankName,
            };
          })
        );

        setRechargeLimit(
          getRechargeLimit(
            res.data?.data[0]?.bankChargeLimit ? res.data?.data[0]?.bankChargeLimit : '0,0'
          )
        );

        setSelectedItem(res.data?.data[0]);
        setActivePanelTab(res.data?.data[0]?.id);
      });
  }, []);

  useEffect(() => {
    setRechargeLimit(
      getRechargeLimit(selectedItem?.bankChargeLimit ? selectedItem?.bankChargeLimit : '0,0')
    );
  }, [selectedItem]);

  useEffect(() => {
    if (activeSidebarItem?.id !== 1 && activeSidebarItem?.id !== 3 && activeSidebarItem?.id !== 2) {
      payChannelList(activeSidebarItem?.id).then((res) => {
        const result = res?.data?.data?.map((item) => {
          return { ...item, tabName: item?.name };
        });
        setPayChannels(result);

        setRechargeLimit(
          getRechargeLimit(
            res.data?.data[0]?.bankChargeLimit ? res.data?.data[0]?.bankChargeLimit : '0,0'
          )
        );
        setSelectedItem(res?.data?.data[0]);
        setActivePanelTab(res?.data?.data[0]?.id);
      });
    }
    if (activeSidebarItem?.id === 2) {
      rechargeUsdtList().then((res) => {
        if (res.data?.code === 200) {
          // setUsdtRechargeTypeList(res.data?.data);
          const result = res?.data?.data?.map((item) => {
            return { ...item, tabName: item?.channelName };
          });
          setUsdtRechargeTypeList(result);
          setActiveUsdtType(res.data?.data[0]);
          setActivePanelTab(res?.data?.data[0]?.id);
        }
      });
    }
  }, [activeSidebarItem]);

  const getRechargeLimit = (value) => {
    let splittedValue = [];
    if (value) {
      splittedValue = value.toString().split(',');
    }
    return `${splittedValue[0]} - ${splittedValue[1]}`;
  };

  const rechargeClickHandler = () => {
    bankRecharge(amountToRecharge, remittanceName, selectedItem?.id, ipAddress).then((res) => {
      if (res.data?.code === 200) {
        if (activeSidebarItem?.id === 1) {
          localStorage.setItem('credPaymentSuccess', true);
          setCredPaymentSuccess(true);
        }
        setAmountToRecharge('');
        setRemittanceName('');
        setShowSuccessModal(true);
      } else {
        alert(res.data?.msg);
      }
    });
  };

  const rechargeVipPayHandler = () => {
    vipPayDeposit(amountToRecharge).then((res) => {
      if (res.data?.code === 200) {
        setRecentVipPayRecharge(amountToRecharge);
        localStorage.setItem('recentVipPayRecharge', amountToRecharge);
        takeMe('/webView', {
          state: {
            url: res.data?.data,
            setAmount: amountToRecharge, //for display only in the box
            backUrl: 'vippay',
            amount: amountToRecharge,
          },
        });
      } else {
        alert(res.data?.msg);
      }
    });
  };

  const vipPayWalletManagementHandler = () => {
    vipPayLogin().then((res) => {
      takeMe('/webView/', { state: { url: res.data?.data?.url } });
    });
  };

  const onlineRechargeHandler = () => {
    onlineRecharge(selectedItem?.id, selectedValueItem, ipAddress).then((res) => {
      if (res.data?.code === 200) {
        // takeMe("/webView", { state: { url: res.data?.data } });
        var g = res.data.data;
        if (g.startsWith('https:')) {
          takeMe('/webView', { state: { url: res.data?.data } });
        } else {
          window.open(g, '_blank');
        }
      } else {
        alert(res.data?.msg);
      }
    });
  };

  const handleUsdtSubmit = () => {
    if (!usdtTransId || !usdtRechargeAmount) {
      let message = '';
      if (!usdtTransId && !usdtRechargeAmount) {
        message = '请输入交易ID和充值USDT数量';
      } else if (!usdtTransId) {
        message = '请输入交易ID';
      } else {
        message = '请输入充值USDT数量';
      }

      setShowAlertMsg(message);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return;
    }

    rechargeUsdt({
      id: activeUsdtType?.id,
      transactionId: usdtTransId,
      rechargeNumber: usdtRechargeAmount,
    })
      .then((res) => {
        setShowAlertMsg(res.data?.msg);
        setShowAlert(true);
        setGotPressed(true);

        setTimeout(() => {
          setShowAlert(false);
          setGotPressed(false);
        }, 1000);
      })
      .catch((error) => {
        console.error('Error during USDT recharge:', error);
      });
  };

  // function Size(){
  //   if(navigator.platform === ''){
  //     return "margin" : "11px"
  //   }
  // }

  const formatContent = (content) => {
    return content?.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  };

  const censorString = (str, showCount) => {
    const string = String(str);
    const firstTwoChars = string.slice(0, showCount);
    const remainingChars = string.slice(showCount);
    const censoredChars = remainingChars.replace(/./g, '*');
    return firstTwoChars + censoredChars;
  };

  const handleClickTab = (id) => {
    let active;

    if (activeSidebarItem?.id === 1) {
      active = rechargeBankListData?.find((item) => item.id === id);
      console.log('active', active);
      console.log('selected', selectedItem);
      setSelectedItem(active);
    } else if (activeSidebarItem?.id === 2) {
      active = usdtRechargeTypeList?.find((item) => item.id === id);
      setActiveUsdtType(active);
    } else {
      active = payChannels?.find((item) => item.id === id);
      setSelectedItem(active);
    }
    setActivePanelTab(id);
  };

  const displayContent = () => {
    if (activeSidebarItem?.id === 1) {
      return (
        <>
          <PanelHeader
            type='tab'
            tabs={rechargeBankListData}
            active={activePanelTab}
            onClick={handleClickTab}
            {...(selectedItem?.discountBill > 0 && {
              badge: `+${selectedItem.discountBill}`,
            })}
          />
          <div className={styles.panelRow}>
            <div className={styles.panel}>
              <div className={styles.form}>
                <div className={styles.inputContainer}>
                  <span>汇款金额:</span>
                  <input
                    type='number'
                    value={amountToRecharge}
                    onChange={(e) => setAmountToRecharge(e.target.value)}
                    placeholder={
                      activeSidebarItem?.tex2
                        ? activeSidebarItem?.tex2
                        : `可充值区间 ${rechargeLimit} 元`
                    }
                  />
                </div>
                <div className={styles.inputContainer}>
                  <span>汇款姓名:</span>
                  <input
                    type='text'
                    value={remittanceName}
                    onChange={(e) => setRemittanceName(e.target.value)}
                    placeholder='请输入汇款姓名'
                  />
                </div>
                <div className={styles.inputContainer}>
                  <div
                    style={{ paddingBottom: '0.03rem', fontWeight: 600 }}
                    className={styles.button}
                    onClick={() => {
                      if (!amountToRecharge) {
                        alert('请输入正确金额');
                      } else {
                        rechargeClickHandler();
                      }
                    }}
                  >
                    <span>立即充值</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.depositDetailsWrapper}>
                <div
                  className={styles.detailsContainer}
                  style={
                    navigator.platform === '' ? { marginBottom: '11px' } : { marginBottom: '13px' }
                  }
                >
                  <div className={styles.details}>
                    <span>收款银行:</span>
                    <span>
                      {credPaymentSuccess
                        ? selectedItem?.bankName
                        : censorString(selectedItem?.bankName, 1)}
                    </span>
                  </div>
                  <CopyToClipboard
                    text={!credPaymentSuccess ? '请您先提单 再复制' : selectedItem?.bankName}
                  >
                    <div
                      className={styles.copyButton}
                      style={{ paddingBottom: '0.01rem', fontWeight: 400 }}
                      onClick={() => {
                        !gotPressed && handleCopyAlert(selectedItem?.bankName);
                      }}
                    >
                      <span>复制</span>
                    </div>
                  </CopyToClipboard>
                </div>
                <div
                  className={styles.detailsContainer}
                  style={
                    navigator.platform === '' ? { marginBottom: '11px' } : { marginBottom: '13px' }
                  }
                >
                  <div className={styles.details}>
                    <span>收款名称:</span>
                    <span>
                      {credPaymentSuccess
                        ? selectedItem?.accountName
                        : censorString(selectedItem?.accountName, 1)}
                    </span>
                  </div>
                  <CopyToClipboard
                    text={!credPaymentSuccess ? '请您先提单 再复制' : selectedItem?.accountName}
                  >
                    <div
                      style={{ paddingBottom: '0.01rem', fontWeight: 400 }}
                      className={styles.copyButton}
                      onClick={() => {
                        !gotPressed && handleCopyAlert(selectedItem?.accountName);
                      }}
                    >
                      <span>复制</span>
                    </div>
                  </CopyToClipboard>
                </div>
                <div
                  className={styles.detailsContainer}
                  style={
                    navigator.platform === '' ? { marginBottom: '11px' } : { marginBottom: '13px' }
                  }
                >
                  <div className={styles.details}>
                    <span>收款账户:</span>
                    <span>
                      {credPaymentSuccess
                        ? selectedItem?.bankAccount
                        : censorString(selectedItem?.bankAccount, 2)}
                    </span>
                  </div>
                  <CopyToClipboard
                    text={!credPaymentSuccess ? '请您先提单 再复制' : selectedItem?.bankAccount}
                  >
                    <div
                      style={{ paddingBottom: '0.01rem', fontWeight: 400 }}
                      className={styles.copyButton}
                      onClick={() => {
                        !gotPressed && handleCopyAlert(selectedItem?.bankAccount);
                      }}
                    >
                      <span>复制</span>
                    </div>
                  </CopyToClipboard>
                </div>
                <div className={styles.detailsContainer}>
                  <div className={styles.details}>
                    <span>开户地点:</span>
                    <span>
                      {credPaymentSuccess
                        ? selectedItem?.bankAddress
                        : censorString(selectedItem?.bankAddress, 1)}
                    </span>
                  </div>
                  <CopyToClipboard
                    text={!credPaymentSuccess ? '请您先提单 再复制' : selectedItem?.bankAddress}
                  >
                    <div
                      style={{ paddingBottom: '0.01rem', fontWeight: 400 }}
                      className={styles.copyButton}
                      onClick={() => {
                        !gotPressed && handleCopyAlert(selectedItem?.bankAddress);
                      }}
                    >
                      <span>复制</span>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.insctructionsWrapper}>
              <p>{ReactHtmlParser(activeSidebarItem?.tex4?.replace(/\n/g, '<br/>'))}</p>
              <br />
              <p>{activeSidebarItem?.tex5}</p>
            </div>
            <AlertContainer alertMe={showAlert} top={-1} left={2.6} notify={showAlertMsg} />
          </div>
        </>
      );
    } else if (activeSidebarItem?.id === 3) {
      return (
        <>
          <div className={styles.panel}>
            <PanelHeader title={'支付渠道'} />
            <div className={styles.vipPayWrapper}>
              <div className={styles.walletBox}>
                <div>
                  <span>钱包余额</span>
                </div>
                <div>
                  <span>
                    {localStorage.getItem('recentVipPayRecharge') ? recentVipPayRecharge : 0}
                  </span>
                </div>
                <div>
                  <div
                    className={styles.walletManagementButton}
                    onClick={vipPayWalletManagementHandler}
                    style={{ paddingBottom: '0.06rem' }}
                  >
                    钱包管理
                  </div>
                </div>
              </div>
              <div className={styles.vipPayInputField}>
                <span>充值金额:</span>
                <input
                  type='number'
                  onChange={(e) => setAmountToRecharge(e.target.value)}
                  placeholder={activeSidebarItem?.tex1}
                />
                <div
                  className={styles.button}
                  onClick={() => {
                    if (!amountToRecharge) {
                      alert('请输入正确金额');
                    } else {
                      rechargeVipPayHandler();
                    }
                  }}
                >
                  <span
                    style={{
                      marginBottom: '0.02rem',
                      fontWeight: 600,
                      paddingBottom: '0.01rem',
                    }}
                  >
                    立即充值
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.insctructionsWrapper}>
              <p>请仔细阅读充值步骤:</p>
              <br />
              <p>{ReactHtmlParser(activeSidebarItem?.tex2?.replace(/\n/g, '<br/>'))}</p>
            </div>
          </div>
        </>
      );
    } else if (activeSidebarItem?.id === 2) {
      return (
        <>
          <div className={styles.panel}>
            <PanelHeader
              tabs={usdtRechargeTypeList}
              type='tab'
              active={activePanelTab}
              onClick={handleClickTab}
              {...(activeUsdtType?.discountBill > 0 && {
                badge: `+${activeUsdtType.discountBill}`,
              })}
            />
            <div className={styles.panelRow} data-active='3'>
              <div className={styles.USDTWrapper}>
                <div className={styles.inputSection}>
                  <div className={styles.inputFieldsContainer} data-theme={currTheme}>
                    <div className={styles.inputContainer}>
                      <span>链名称</span>
                      <input
                        type='text'
                        placeholder='公司所有游戏主播即将暂停'
                        value={activeUsdtType?.chainName}
                        readOnly
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <span>汇款金额:</span>
                      <input
                        type='text'
                        placeholder='请输入汇款姓名'
                        value={activeUsdtType?.rechargeAddress}
                        readOnly
                      />
                      <CopyToClipboard text={activeUsdtType?.rechargeAddress ?? ''}>
                        <div
                          className={styles.cloneButton}
                          style={{ paddingBottom: '0.01rem', fontWeight: 400 }}
                          onClick={() => {
                            !gotPressed && handleCopyAlert(activeUsdtType?.rechargeAddress);
                          }}
                        >
                          <span>复制</span>
                        </div>
                      </CopyToClipboard>
                      {/* <div className={styles.cloneButton}>
                      <span>复制</span>
                    </div> */}
                    </div>
                    <div className={styles.inputContainer}>
                      <span>交易ID</span>
                      <input
                        type='text'
                        placeholder='请输入交易ID'
                        value={usdtTransId}
                        onChange={(e) => {
                          setUsdtTransId(e.target.value);
                        }}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <span>充值数量</span>
                      <input
                        type='text'
                        placeholder='请输入充值USDT数量'
                        value={usdtRechargeAmount}
                        onChange={(e) => {
                          setUsdtRechargeAmount(e.target.value.replace(/[^0-9]/g, ''));
                        }}
                      />
                    </div>
                    <span className={styles.tips}>
                      最终充值到账金额为:{' '}
                      {((usdtRechargeAmount ?? 0) * activeUsdtType?.exchangeRate)?.toFixed(2)} (
                      {!!usdtRechargeAmount ? usdtRechargeAmount : 0}
                      USDT*当前汇率
                      {activeUsdtType?.exchangeRate}元)
                    </span>
                  </div>
                </div>
                <div className={styles.button} onClick={handleUsdtSubmit}>
                  <span>立即充值</span>
                </div>
                <AlertContainer alertMe={showAlert} top={-1} left={2.6} notify={showAlertMsg} />
              </div>
              <div className={styles.insctructionsWrapper} data-active='3' data-theme={currTheme}>
                <span>请仔细阅读充值步骤：</span>
                <br />
                {tex1 !== '' && formatContent(tex1)}
                {tex2 !== '' && formatContent(tex2)}
                {tex3 !== '' && formatContent(tex3)}
                {tex4 !== '' && formatContent(tex4)}
                {tex5 !== '' && formatContent(tex5)}
                <br />
                <br />
                <span>温馨提示：我司充值地址会不定期更新，请注意查看</span>
              </div>
            </div>
          </div>

          <AlertContainer alertMe={showAlert} top={-1} left={2.6} notify={showAlertMsg} />
        </>
      );
    } else {
      return (
        <>
          <div className={styles.panel} data-height='full'>
            <PanelHeader
              tabs={payChannels}
              type='tab'
              active={activePanelTab}
              onClick={handleClickTab}
            />
            <div className={styles.channelSelectValueWrapper}>
              <div
                className={styles.payChannelValues}
                data-align={selectedItem?.quickAmount?.split(',')?.length > 3 ? 'grid' : 'flex'}
              >
                {selectedItem?.quickAmount?.split(',')?.map((value, index) => {
                  return (
                    <ValueItem
                      key={index}
                      amount={value}
                      selectedValueItem={selectedValueItem}
                      setSelectedValueItem={setSelectedValueItem}
                    />
                  );
                })}
              </div>

              <div className={selectedItem?.id === undefined ? styles.HELLO : ''}>
                <div
                  className={styles.button}
                  onClick={() => {
                    if (!selectedValueItem) {
                      alert('请输入正确金额');
                    } else {
                      if (selectedItem?.id !== undefined) {
                        onlineRechargeHandler();
                      } else {
                      }
                    }
                  }}
                >
                  <span>立即充值</span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className={styles.contentWrapper} data-theme={currTheme}>
      {displayContent()}
    </div>
  );
};

export default RechargeContent;
