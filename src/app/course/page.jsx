import CourseCard from "../../../components/CourseCard";

const courses = [
  {
    title: "Web Development",
    description:
      "Our web development course offers a structured curriculum, expert guidance, and practical projects that will empower you to thrive in the ever-evolving world of web development.",
    thumbnail:
      "https://th.bing.com/th/id/OIP.OeW08hIabM0cXqA3RM2HjAHaHk?pid=ImgDet&rs=1",
    href: "/course/web-development",
  },
  {
    title: "Coding Bootcamp",
    description:
      "Join our coding course to unlock the ability to solve complex problems through programming, gaining practical experience and a solid foundation in coding principles and more.",
    thumbnail:
      "https://th.bing.com/th/id/OIP.0eaVvfLitkBd1-ZhzYP_8AHaDt?pid=ImgDet&w=1000&h=500&rs=1",
    href: "/course/coding",
  },
  {
    title: "Digital Marketing",
    description:
      "Master digital marketing strategies and drive online success with our comprehensive course. Gain practical skills in SEO, social media, and analytics to excel in the digital marketing realm..",
    thumbnail: "https://13designstreet.com/img/seo-reporting.png",
    href: "/course/Digital-marketing",
  },
  // Add more courses here...
];

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
