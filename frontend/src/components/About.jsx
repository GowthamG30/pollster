import React from "react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="box">
          This is a simple polling web application to help people to create polls and take surveys, vote for polls and view statistics. This project is created by 2 CSE undergraduates of VNIT, Gowtham and Prabhav.
        </div>
      </div>
    </>
  );
};

export default About;