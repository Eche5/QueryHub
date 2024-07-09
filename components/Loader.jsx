import styles from "./Loader.module.css";
import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    const spans = document.querySelectorAll(`.${styles.word} span`);

    spans.forEach((span, idx) => {
      span.addEventListener("click", (e) => {
        e.target.classList.add(styles.active);
      });

      span.addEventListener("animationend", (e) => {
        e.target.classList.remove(styles.active);
      });

      // Initial animation
      setTimeout(() => {
        span.classList.add(styles.active);
      }, 750 * (idx + 1));
    });
  }, []);
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className={styles.container}>
        <div className={styles.word}>
          <span className=" text-[#FF3131]">Q</span>
          <span className=" text-[#FF3131]">u</span>
          <span className=" text-[#FF3131]">e</span>
          <span className=" text-[#FF3131]">r</span>
          <span className=" text-[#FF3131]">y</span>
          <span>H</span>
          <span>u</span>
          <span>b</span>
        </div>
      </div>
    </section>
  );
};

export default Loader;
