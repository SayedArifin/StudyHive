import CourseCard from "../../../components/CourseCard";

import { courses } from "../../../api/arrow_api";

const Course = () => {
  return (
    <div style={{ height: "75vh" }}>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          title={course.title}
          description={course.description}
          thumbnail={course.thumbnail}
          href={course.href}
        />
      ))}
    </div>
  );
};

export default Course;
