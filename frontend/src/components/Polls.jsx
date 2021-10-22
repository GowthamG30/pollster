import React, { useState, useEffect } from "react";
import axios from "axios";
import Poll from "./Poll";

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
          return <Poll
            key={poll._id}
            id={poll._id}
            question={poll.question}
            options={poll.options}
          />;
        })
        : <h3>Oops... No polls !!</h3>
      }
    </div>
    
  );
}

export default Polls;
