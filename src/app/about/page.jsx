"use client";
import styles from "./About.module.css";
import useSubsState from "../../../components/ActiveSubscription";
import Link from "next/link";
import { courses_list } from "../../../api/arrow_api";
const About = () => {
  const subsState = useSubsState();
  return (
    <div className={styles.container}>
      {courses_list.map((course) => (
        <div key={course.id} className={styles.course}>
          <h2 id={course.id}>{course.title}</h2>
          <p>Here are the topics covered in our course:</p>
          <ul>
            {course.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
          {subsState ? (
            <Link
              style={{
                position: "absolute",
                fontSize: "13px",
                fontWeight: "bold",
                cursor: "pointer",
                background: "#1404f3",
                border: "1px solid #0b07f9",
                color: "#fff",
                outline: "none",
                borderRadius: "0.5em 0 2em",
                padding: "1em 2em",
                transition: "background 0.2s ease-in-out",
                textDecoration: "none",
              }}
              href="/course"
            >
              Open this course
            </Link>
          ) : (
            <>
              <h3>Need a preview? Watch this:</h3>
              <iframe
                width="500em"
                height="300em"
                src={course.videoUrl}
                title="Preview Video"
                frameBorder="3"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default About;
