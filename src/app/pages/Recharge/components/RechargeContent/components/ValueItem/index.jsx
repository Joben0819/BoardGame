import React from "react";
import styles from "./index.module.scss";
import classnames from "classnames";
import { useSelector } from "react-redux";

const ValueItem = ({ amount, selectedValueItem, setSelectedValueItem }) => {
  const { currTheme } = useSelector(state => state.gameSettings);
  return (
    <span
      className={classnames(styles.valueItem, {
        [styles.selectedValueItem]: amount === selectedValueItem,
      })}
      onClick={() => setSelectedValueItem(amount)}
      data-theme={currTheme}
    >
      <span>{amount}</span>
    </span>
  );
};

export default ValueItem;
