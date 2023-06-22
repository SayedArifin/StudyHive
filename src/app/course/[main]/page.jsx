"use client";

import { usePathname, useRouter } from "next/navigation";
import CourseDropdown from "../../../../components/Course";
import useSubsState from "../../../../components/ActiveSubscription";

import {
  WebDevelopment,
  Coding,
  DigitalMarketing,
} from "../../../../api/arrow_api";
import { useEffect, useState } from "react";
const MainCourse = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();
  useEffect(() => {
    document.title = `${title}`;
  }, [title]);
  const CoursePage = () => {
    const subsState = useSubsState();
    const category = usePathname();

    let selectedArray = [];

    if (category === "/course/web-development") {
      selectedArray = WebDevelopment;
      setTitle("Web Development");
    } else if (category === "/course/coding") {
      selectedArray = Coding;
      setTitle("Coding Bootstrap");
    } else if (category === "/course/Digital-marketing") {
      selectedArray = DigitalMarketing;
      setTitle("Digital Marketing");
    }

    if (subsState) {
      return (
        <div className="App">
          <h1>{title}</h1>
          <CourseDropdown questions={selectedArray} />
        </div>
      );
    } else {
      router.push("/pricing");
    }
  };

  return <CoursePage />;
};
export default MainCourse;
