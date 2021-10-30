import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const Poll = () => {
  const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}]});
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
    .get("/api/poll/" + id)
    .then(res => {
      setPoll(res.data);
      setLoaded(true);
    })
    .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(index !== -1) {
      const params = JSON.stringify({
        "poll": poll,
        "index": index
      });
      
      axios
        .post("/api/vote/" + id, params, { 
          "headers": {
            "content-type": "application/json",
          },})
        .then(res => console.log(res))
        .catch(err => console.error(err));
  
      window.location.href = "../poll/" + id + "/stats"; // path check
      // or use redirect
    }
    else {
      // tell user to select something
    }
  };

  const onValueChange = (event) => {
    setIndex(event.target.value);
  };

  return (
    loaded ?
    (
      poll.question === "" && poll.options[0].name === "" && poll.options[0].count === 0 ?
      <h5>Empty poll...</h5> :
      <div className="poll">
        <Link to={"/poll/"+id+"/stats"}>
          <p>Stats</p>
        </Link>
        <form onSubmit={handleSubmit}>
          <p className="poll-label">{poll.question}</p>
          {
            poll.options.map((option, index) => {
              return (
                <label className="option">
                  <input
                    type="radio"
                    value={index}
                    onChange={onValueChange}
                    name={id}
                  />
                  <p>{option.name}</p>
                </label>
              );
            })
          }
          <button className="button submit" type="submit">Submit</button>
        </form>
      </div>
    )
    :
    <Loader />
  );
};

export default Poll;
