import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Loader from "./Loader";

const Polls = () => {

  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios
    .get("/api/polls")
    .then(res => setPolls(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {
        polls.length ?
        polls.map((poll) => {
          return (
            <Link to={"/poll/"+poll._id}>
              <h1>{poll.question}</h1>
            </Link>
          );
        }) :
        <Loader />
      }
    </div>
    
  );
}

export default Polls;
