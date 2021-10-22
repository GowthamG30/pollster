import React, { useState, useEffect } from "react";
import axios from "axios";

const Polls = () => {

  useEffect(() => {
    axios
    .get("http://localhost:5000/polls")
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }, []);

  return (
    <h1>Polls</h1>
  );
}

export default Polls;
