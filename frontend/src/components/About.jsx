import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const About = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    let headers = null;

    if(accessToken) {
      headers = {headers: {authorization: `Bearer ${accessToken}`}};
      JSON.stringify(headers);
    }

    axios
      .get("/api/verify", headers)
      .then()
      .catch(err => {
        // console.error("home err: " + err);
        setRedirect(true);
      });
  }, []);

  return (
    <div>
      Created by 2 CSE undergraduates of VNIT, Prabhav and Gowtham
    </div>
  );
};

export default About;
