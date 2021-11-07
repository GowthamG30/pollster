import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Poll = () => {
  const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}], author: "", voters: []});
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		
		let accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
			requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
    }
		JSON.stringify(requestOptions);

    axios
      .get("/api/poll/" + id, requestOptions)
      .then(res => {
        setCurrentUserName(res.data.currentUserName);
        setPoll(res.data.poll);
        setLoaded(true);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
		let errorBuffer = "";

    if(index !== -1) {
      const params = JSON.stringify({
        "poll": poll,
        "index": index
      });

      if(!poll.voters.includes(currentUserName)) {
        let requestOptions = {headers: {}};
        requestOptions.headers["content-type"] = "application/json";
        
        let accessToken = localStorage.getItem("accessToken");
        if(accessToken) {
          requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
        }
        JSON.stringify(requestOptions);
        
        axios
          .post("/api/vote/" + id, params, requestOptions)
          .then(res => console.log(res))
          .catch(err => console.error(err));
        
        // success msg

        setTimeout(() => {
          window.location.href = "../poll/" + id + "/stats"; // path check and later use redirect
        }, 1000);
        
      }
      else {
        // you have already voted
        errorBuffer += "You can only vote once! \n"
      }
    }
    else {
			errorBuffer += "Select atleast one option\n"
    }
      setError(errorBuffer);
  }

  const onValueChange = (event) => {
    setIndex(event.target.value);
  };

  return (
    <>
      <Navbar />
      {
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
              <span className="error">{error}</span>
              <button className="button submit" type="submit">Submit</button>
            </form>
          </div>
        )
        :
        <Loader />
      }
    </>
  );
};

export default Poll;
