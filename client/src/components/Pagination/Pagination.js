import React from "react";
import styles from "./Pagination.module.scss";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  return (
    <div disabled={true} id={styles.container}>
      <button
        className={styles.btn_back}
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
      >
        &lt;
      </button>
      <span className={styles.num_current_page}>
        {page} / {numPages}
      </span>
      <button
        className={styles.btn_front}
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
