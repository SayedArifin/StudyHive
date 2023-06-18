import "./course.css";
import Link from "next/link";

const Course = ({
  imageSrc,
  altText,
  courseName,
  courseDescription,
  linkId,
}) => {
  return (
    <div className="slide-container">
      <div className="wrapper">
        <div className="course barbarian">
          <div className={`course__image course__image--barbarian ${imageSrc}`}>
            <img src={imageSrc} alt={altText} />
          </div>
          <div className="course__unit-name">{courseName}</div>
          <div className="course__unit-description">{courseDescription}</div>
          <div className="course__unit-stats course__unit-stats--barbarian clearfix">
            <Link href={`/about#${linkId}`}>
              <button className="animated-button">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const courses = [
    {
      imageSrc: "/web.png",
      altText: "web development",
      courseName: "Web Development",
      courseDescription:
        "Our web development course offers a structured curriculum, expert guidance, and practical projects that will empower you to thrive in the ever-evolving world of web development.",
      linkId: "web",
    },
    {
      imageSrc: "/code.png",
      altText: "code",
      courseName: "Coding Bootcamp",
      courseDescription:
        "Join our coding course to unlock the ability to solve complex problems through programming, gaining practical experience and a solid foundation in coding principles and more",
      linkId: "code",
    },
    {
      imageSrc: "/dm.png",
      altText: "digital marketing",
      courseName: "Digital Marketing",
      courseDescription:
        "Master digital marketing strategies and drive online success with our comprehensive course. Gain practical skills in SEO, social media, and analytics to excel in the digital marketing realm.",
      linkId: "dm",
    },
  ];

  return (
    <div>
      <div className="list">
        <h1 className="heading">Our All Courses</h1>
        <div className="card">
          {courses.map((course, index) => (
            <Course key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
