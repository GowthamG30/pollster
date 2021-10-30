import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
    .get("/api/polls")
    .then(res => {
      setPolls(res.data);
      setLoaded(true);
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {
        loaded ?
        (
          polls.length ?
          polls.map((poll) => {
            return (
              <Link to={"/poll/" + poll._id}>
                <h1>{poll.question === "" ? "Empty question" : poll.question}</h1>
              </Link>
            );
          }) :
          <h5>Oops no polls...</h5>
        ) :
        <Loader />
      }
    </div>
  );
};

export default Polls;
