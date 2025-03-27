import React from "react";
import { Link } from "react-router-dom";
import styles from "./PathInfo.module.css";

const PathInfo = ({ pages }) => {
  return (
    <nav>
      <ul className={styles.pathInfoList}>
        {pages.map((page, index) => (
          <li key={page.path}>
            {index !== 0 && <span className={styles.pathInfoSeparator}>/</span>}
            {index < pages.length - 1 ? (
              <Link to={page.path} className={styles.pathInfoLink}>
                {page.name}
              </Link>
            ) : (
              <span className={styles.pathInfoCurrent}>{page.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PathInfo;
