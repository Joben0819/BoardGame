import React, { useState } from "react";
import Select from "react-select";
import TemplatedInputforUser from "../../../../Fragment/TemplatedInputforUser";
import ButtonDesignTwo from "../../../../Fragment/ButtonDesignTwo";
import { setBindCard } from "src/api/game/gamelist";
import styles from "./style.module.scss";

const WalletSlot = ({ setAlertBind, setBindCardMsg, myBankList }) => {
  const [bindBankId, setBindBankId] = useState();
  const [bindRealName, setBindRealName] = useState("");
  const [bindBankAddress, setBindBankAddress] = useState("");
  const [bindBankAccount, setBindBankAccount] = useState("");

  const bindMyCard = () => {
    setBindCard(bindRealName, bindBankAccount, bindBankAddress, bindBankId)
      .then((res) => {
        const data = res.data.data;
        const msg = res.data.msg;
        if (data === null) {
          alert(msg);
        } else {
          setBindCardMsg(msg);
          setAlertBind(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setAlertBind(false);
      });
  };

  const changeBankIdSelect = (selected) => {
    setBindBankId(selected.value);
  };

  const handleBindData = (e, v) => {
    if (v === 1) setBindRealName(e.target.value);
    if (v === 2) setBindBankAccount(e.target.value);
    if (v === 3) setBindBankAddress(e.target.value);
  };

  return (
    <div className={styles.walletContainer}>
      <div className={styles.inputFields}>
        <ul>
          <li>
            <TemplatedInputforUser
              changeMe={(e) => handleBindData(e, 1)}
              label="真实姓名:"
              placeholder="请输入您的姓名"
            />
          </li>
          <li>
            <span
              style={{
                fontSize: ".15rem",
                width: "0.4rem",
                display: "inline-block",
                position: "absolute",
              }}
              className={styles.settings}
            >
              那图:
            </span>
            <div style={{ marginLeft: "0.8rem" }}>
              <Select
                options={myBankList}
                className="react-select"
                isClearable={false}
                defaultValue={myBankList[0]}
                classNamePrefix="mySelect"
                onChange={changeBankIdSelect}
              />
            </div>
          </li>
          <li>
            <TemplatedInputforUser
              changeMe={(e) => handleBindData(e, 2)}
              label="银行卡号:"
              placeholder="请输入开户行卡号"
            />
          </li>
          <li>
            <TemplatedInputforUser
              changeMe={(e) => handleBindData(e, 3)}
              label="开户地址:"
              placeholder="请输入开户行地址"
            />
          </li>
        </ul>
      </div>
      <div className={styles.buttonHolder}>
        <ButtonDesignTwo
          bradius={0}
          clickMe={bindMyCard}
          buttonName="确认修改"
          height={0.3}
          width={0.8}
          padding="0.035rem 0"
        />
      </div>
    </div>
  );
};

export default WalletSlot;
