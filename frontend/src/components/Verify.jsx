import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

const Verify = () => {
  // const [redirect, setRedirect] = useState(false);
  // const [newPath, setNewPath] = useState("/");

	// useEffect(() => {
  //   let accessToken = localStorage.getItem("accessToken");
  //   let requestOptions = null;

  //   if(accessToken) {
  //     requestOptions = {headers: {authorization: `Bearer ${accessToken}`}};
  //     JSON.stringify(requestOptions);
  //   }

  //   // Paths for which authentication is NOT required
  //   const excludePaths = ["/", "/login", "/register", "/about"];

  //   const currentPath = window.location.pathname;
  //   if(!excludePaths.includes(currentPath)) {
  //     // console.log(currentPath);
  //     axios
  //       .get("/api/verify", requestOptions)
  //       .then()
  //       .catch(err => {
  //         setNewPath("/login");
  //         setRedirect(true);
  //       });
  //   }
  // }, []);

  // if(redirect) {
  //   return <Redirect to={newPath}/>;
  // }

  return (<></>);
};

export default Verify;
