import React, { useState, useEffect } from "react";
import axios from "axios";

function Polls() {

  useEffect(() => {
    axios
    .get("/polls")
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }, []);

  return (
    <h1>Polls</h1>
  );
}

export default Polls;
