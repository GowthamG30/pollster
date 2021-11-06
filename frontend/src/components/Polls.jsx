import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Verify from "./Verify";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [myPolls, setMyPolls] = useState([]);
  const [allPolls, setAllPolls] = useState([]);

  useEffect(() => {
    // const params = JSON.stringify({
    //   "username": username ////////////
    // });

    axios
    .get("/api/polls")
    .then(res => {
      setPolls(res.data);
      setLoaded(true);
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <Verify />
      {
        loaded ?
          polls.length ?
          <div className="polls">
            {polls.map((poll) => {
              return (
                <Link to={"/poll/" + poll._id}>
                  <p>{poll.question === "" ? "Empty question" : (poll.question.length<=100 ? poll.question : poll.question.substr(0, 100)+"...")}</p>
                </Link>
              );
            })}
          </div> :
          <h5>Oops no polls...</h5> :
        <Loader />
      }
    </>
  );
};

export default Polls;
