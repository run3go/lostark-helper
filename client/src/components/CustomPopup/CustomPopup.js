import React, { useState, useEffect } from "react";
import styles from "./CustomPopup.module.scss";

function CustomPopup(props) {
  const [show, setShow] = useState(false);
  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };
  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={styles.overlay}
    >
      <div className={styles.popup}>
        <span className={styles.close} onClick={closeHandler}>
          &times;
        </span>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
}

export default CustomPopup;
