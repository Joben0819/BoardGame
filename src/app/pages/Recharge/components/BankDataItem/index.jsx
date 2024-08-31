import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import { useSelector } from "react-redux";

const BankDataItem = ({ item, selectedItem, setSelectedItem, isUsdt }) => {
  const { currTheme } = useSelector((state) => state.gameSettings);
  return (
    <div className="d-flex just-space-cent ">
      <span
        className={classnames(styles.bankDataItem, {
          [styles.selectedBankItem]: item?.id === selectedItem?.id,
        })}
        onClick={() => setSelectedItem(item)}
        data-theme={currTheme}
      >
        {item?.bankName && (
          <span style={{ marginBottom: "0.01rem" }}>{item?.bankName}</span>
        )}
        {item?.name && <span>{item?.name}</span>}
        {isUsdt && item?.chainName && <span>{item?.chainName}</span>}
        {item?.discountBill > 0 && (
          <span className={styles.discount}>+{item?.discountBill}%</span>
        )}
      </span>
    </div>
  );
};

export default BankDataItem;
