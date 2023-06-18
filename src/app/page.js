"use client";
import Image from "next/image";
import "./home.css";
import hero from "../../public/heroSvg.svg";
import Link from "next/link";
import CourseList from "../../components/CourseList";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="svg-bg"></div>
        <div className="content">
          <div className="content-hero">
            <h1>Unlock the Power of Coding with Our Up-to-Date Courses</h1>
            <div className="content-secondary-text">
              <p>
                With our easy subscription model, you can get full access to all
                of our courses. No need to hassle; we offer a 7-day money-back
                guarantee.
              </p>
            </div>
            <div className="content-button">
              <Link href="#course">
                <button>Browse Our Courses</button>
              </Link>
            </div>
          </div>
          <div className="hero-img">
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
