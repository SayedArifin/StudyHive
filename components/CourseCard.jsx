"use client";
import React from "react";
import "./CourseCard.css";
import Link from "next/link";
import useSubsState from "./ActiveSubscription";
const CourseCard = ({ title, description, thumbnail, href }) => {
  const subsState = useSubsState();
  return (
    <div className="course-card">
      <div className="thumbnail-container">
        <img src={thumbnail} alt="Course Thumbnail" />
      </div>
      <div className="content">
        <h2 className="CourseCard-h2">{title}</h2>
        <p className="CourseCard-p">{description}</p>
        {subsState ? (
          <Link href={href} className="course-card-link">
            Enroll Now
          </Link>
        ) : (
          <Link href="/pricing" className="course-card-link">
            Subscribe Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
