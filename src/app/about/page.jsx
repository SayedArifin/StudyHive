"use client";
import React from "react";
import styles from "./About.module.css";
import useSubsState from "../../../components/ActiveSubscription";
import Link from "next/link";
const courses = [
  {
    id: "web",
    title: "Fullstack Web Development",
    topics: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "next JS",
      "Node.js",
      "Express.js",
      "Databases (SQL and NoSQL)",
      "API Development",
      "Web Design Principles",
      "User Experience (UX) Design",
      "Progressive Web Apps (PWA)",
      "Single Page Applications (SPA)",
      "Mobile App Development (using web technologies)",
      "Web Accessibility",
      "Search Engine Optimization (SEO)",
      "Web Performance Optimization",
      "Content Management Systems (CMS)",
      "Web Security",
      "RESTful APIs",
      "Serverless Architecture",
      "Microservices",
      "Web Scraping",
      "Web Analytics",
      "Payment Gateway Integration",
      "Authentication and Authorization",
      "Cross-platform Development",
      "Web Deployment and DevOps",
      "Cloud Computing for Web Development",
      "Deployment",
    ],
    videoUrl: "https://www.youtube.com/embed/AjWfY7SnMBI",
  },
  {
    id: "code",
    title: "Programming Language Courses",
    topics: [
      "Python",
      "Java",
      "C++",
      "C#",
      "JavaScript",
      "Ruby",
      "PHP",
      "Swift",
      "Go",
    ],
    videoUrl: "https://www.youtube.com/embed/AjWfY7SnMBI",
  },
  {
    id: "dm",
    title: "Digital Marketing Courses",
    topics: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Pay-Per-Click (PPC) Advertising",
      "Google Analytics",
      "Conversion Rate Optimization",
      "Online Advertising",
      "Marketing Analytics",
    ],
    videoUrl: "https://www.youtube.com/embed/AjWfY7SnMBI",
  },
];

const About = () => {
  const subsState = useSubsState();
  return (
    <div className={styles.container}>
      {courses.map((course) => (
        <div key={course.id} className={styles.course}>
          <h2 id={course.id}>{course.title}</h2>
          <p>Here are the topics covered in our course:</p>
          <ul>
            {course.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
          {subsState ? (
            <Link href="/course">Open this course</Link>
          ) : (
            <>
              <h3>Need a preview? Watch this:</h3>
              <iframe
                width="928"
                height="522"
                src={course.videoUrl}
                title="Preview Video"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
