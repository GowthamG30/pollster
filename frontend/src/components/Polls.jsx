import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

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
      {console.log(polls)}
      {
        polls.length ?
        polls.map((poll) => {
          return (
            <Link to={"/poll/"+poll._id}>
              {poll.question}
            </Link>
          );
        })
        : <h3>Oops... No polls !!</h3>
      }
    </div>
    
  );
}

export default Polls;
