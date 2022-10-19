import React from "react";
import styles from "./Pagination.module.scss";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  return (
    <div disabled={true} className={styles["pagination"]}>
      <button
        className={styles["pagination__back-btn"]}
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        &lt;
      </button>
      <span className={styles["pagination__current-num"]}>
        {page} / {numPages}
      </span>
      <button
        className={styles["pagination__front-btn"]}
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default Pagination;
