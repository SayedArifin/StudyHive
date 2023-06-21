import React from "react";
import style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={style.body}>
      <div className={style.loading}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
