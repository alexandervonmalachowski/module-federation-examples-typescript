import React from "react";
import RemoteB from "remote_b/remote_b";

import styles from "./_home.module.css";

const Page = () => {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1>Home Host</h1>
      </div>
      <RemoteB />
    </div>
  );
};

export default Page;
