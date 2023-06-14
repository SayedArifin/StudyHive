"use client";
import React, { useState } from "react";
import "./CourseDropdown.css"; // Import your CSS file for styling

const CourseDropdown = ({ questions }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="Course-dropdown">
      {questions.map((question, index) => (
        <div className="Course-item" key={index}>
          <div
            className={`Course-question ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleQuestion(index)}
          >
            {question.question}
            <span className="Course-icon">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          <div
            className={`Course-answer ${activeIndex === index ? "active" : ""}`}
          >
            {question.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDropdown;
