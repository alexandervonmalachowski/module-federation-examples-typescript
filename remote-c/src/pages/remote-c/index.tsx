import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCountContext } from "remote_a/count_provider";

import styles from "./_remote_c.module.css";

const Page = () => {
  const { pathname } = useLocation();
  const { count, setCount } = useCountContext();
  return (
    <div className={styles["remote-c-home"]}>
      <h1>Home Remote C</h1>
      <span>Count is {count}</span>
      <button
        onClick={() => {
          setCount?.(1);
        }}
        type="button"
        className={styles.add}
      >
        Add count
      </button>
      {pathname === "/remote-c" && <Link to="/">To Host</Link>}
      {pathname === "/" && <Link to="/remote-c">To Remote C</Link>}
    </div>
  );
};

export default Page;
