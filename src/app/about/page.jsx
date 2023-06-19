"use client";
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
    videoUrl:
      "https://media.istockphoto.com/id/1411419125/video/over-shoulder-person-using-laptop-computer-online-shopping-for-electronics-wireless-hi-fi.mp4?s=mp4-640x640-is&k=20&c=tHhTF-wZ3Dl7Ix85TMDV0u3_-ESQUEEe5MOoULLc9qg=",
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
    videoUrl:
      "https://media.istockphoto.com/id/1421083158/video/animated-developer-flat-character.mp4?s=mp4-640x640-is&k=20&c=IpsbbDViceSYSOA8hwcTIsvbXHNFEYkvK2SFF9T9fQs=",
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
    videoUrl:
      "https://media.istockphoto.com/id/1405993999/video/vfx-animated-background-with-virtual-social-media-reality-interconnected-by-internet-into.mp4?s=mp4-640x640-is&k=20&c=Q3nrs4Qg5FKhGlp2cvh25cTZW-PJsVZ79LvtExk_4XA=",
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
