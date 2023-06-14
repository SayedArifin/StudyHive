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
        <h2>{title}</h2>
        <p>{description}</p>
        {subsState ? (
          <Link
            href={href}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: " #000099",
              color: "#fff",
              textDecoration: "none",
              borderRadius: ".5em 0 1.5em 0",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#000099";
            }}
          >
            Enroll Now
          </Link>
        ) : (
          <Link
            href="/pricing"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#000099",
              color: "#fff",
              textDecoration: "none",
              borderRadius: ".5em 0 1.5em 0",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#000099";
            }}
          >
            Subscribe Now
          </Link>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
