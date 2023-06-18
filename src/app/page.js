"use client";
import Image from "next/image";
import styles from "./Home.module.css";
import hero from "../../public/heroSvg.svg";
import Link from "next/link";
import CourseList from "../../components/CourseList";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.svgBg}></div>
        <div className={styles.content}>
          <div className={styles.contentHero}>
            <h1>Unlock the Power of Coding with Our Up-to-Date Courses</h1>
            <div className={styles.contentSecondaryText}>
              <p>
                With our easy subscription model, you can get full access to all
                of our courses. No need to hassle; we offer a 7-day money-back
                guarantee.
              </p>
            </div>
            <div className={styles.contentButton}>
              <Link href="#course">
                <button>Browse Our Courses</button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImg}>
            <Image src={hero} alt="hero" />
          </div>
        </div>
      </div>
      <div id="course">
        <CourseList />
      </div>
    </>
  );
}
