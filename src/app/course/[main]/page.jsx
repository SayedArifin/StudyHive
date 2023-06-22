"use client";

import { usePathname } from "next/navigation";
import CourseDropdown from "../../../../components/Course";
import useSubsState from "../../../../components/ActiveSubscription";
import Loading from "../../loading";
import {
  WebDevelopment,
  Coding,
  DigitalMarketing,
} from "../../../../api/arrow_api";
const MainCourse = () => {
  useEffect(() => {
    document.title = `${title}`;
  }, []);
  const CoursePage = () => {
    const subsState = useSubsState();
    const category = usePathname();

    let selectedArray = [];
    let title;

    if (category === "/course/web-development") {
      selectedArray = WebDevelopment;
      title = "Web Development";
    } else if (category === "/course/coding") {
      selectedArray = Coding;
      title = "Coding Bootstrap";
    } else if (category === "/course/Digital-marketing") {
      selectedArray = DigitalMarketing;
      title = "Digital Marketing";
    }

    if (subsState) {
      return (
        <div className="App">
          <h1>{title}</h1>
          <CourseDropdown questions={selectedArray} />
        </div>
      );
    } else {
      return <Loading />;
    }
  };

  return <CoursePage />;
};
export default MainCourse;
