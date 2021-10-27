import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import Loader from "./Loader";
import { Link, useParams } from "react-router-dom";

const Poll = () => {

  const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}]});
  const [index, setIndex] = useState(-1);
  const [location, setLocation] = useState(useLocation());
  let { id } = useParams();

  useEffect(() => {
    // let id = "";
    // let i = location.pathname.length - 1;
    // while(location.pathname[i] !== '/') {
    //   id = location.pathname[i] + id;
    //   i--;
    // }

    axios
    .get("/api/poll/" + id)
    .then(res => setPoll(res.data))
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
        .post('/api/vote/' + id, params, {
          "headers": {
            "content-type": "application/json",
          },})
        .then(res => console.log(res))
        .catch(err => console.error(err));
  
      window.location.href = '../poll/' + id + '/stats'; // path check
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
    <div>
      {
        poll.question === "" && poll.options[0].name === "" && poll.options[0].count === 0 ?
        <Loader /> :
        <div className="poll">
          <form onSubmit={handleSubmit}>
            <h4>{poll.question}</h4>
            {
              poll.options.map((option, index) => {
                return (
                  <label>
                    <input
                      type="radio"
                      value={index}
                      onChange={onValueChange}
                      name={id}
                    />
                    {option.name}
                  </label>
                );
              })
            }
            <button className="button submit" type="submit">Submit</button>
          </form>

          <Link to={"/poll/"+id+"/stats"} params={{id: id}}>
            Stats
          </Link>
        </div>
      }
    </div>
  );
}

export default Poll;
