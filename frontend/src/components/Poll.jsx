import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import Loader from "./Loader";

const Poll = () => {

  const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}]});
  const [location, setLocation] = useState(useLocation());

  useEffect(() => {
    let id = "";
    let i = location.pathname.length - 1;
    while(location.pathname[i] !== '/') {
      id = location.pathname[i] + id;
      i--;
    }

    axios
    .get("/api/poll/" + id)
    .then(res => setPoll(res.data))
    .catch(err => console.error(err));
  }, [location]);

  return (
    <div>
      {
        poll.question === "" && poll.options[0].name === "" && poll.options[0].count === 0 ?
        <Loader /> :
        <div className="poll">
          <h4>{poll.question}</h4>
          {
            poll.options.map((option) => {
              return <h5>{option.name} {option.count}</h5>;
            })
          }
        </div>
      }

    </div>
  );
}

export default Poll;
