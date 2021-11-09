import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Navbar from "./Navbar";

const Poll = () => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [error, setError] = useState([]);
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const [poll, setPoll] = useState({question: "", options: [{name: "", count: 0}], author: "", voters: []});
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState("");
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
      .catch(err => {
        if(err.response.status === 403) {
          alert("Session expired");
          window.location.reload();
        }
        else if(err.response.status === 500) {
          alert("Internal server error");
        }
        else {
          alert("Something went wrong");
        }
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
		let errorBuffer = [];

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
          .then(res => {
            setSuccess("Vote submitted successfully!");
            setTimeout(() => {
              setRedirect(true);
            }, 750);
          })
          .catch(err => {
            if(err.response.status === 403) {
              alert("Session expired");
              window.location.reload();
            }
            else if(err.response.status === 500) {
              alert("Internal server error");
            }
            else {
              alert("Something went wrong");
            }
          });
      }
      else {
        errorBuffer.push("You can only vote once!");
      }
    }
    else {
			errorBuffer.push("Select atleast one option");
    }
    setError(errorBuffer);
  }

  if(redirect) {
    return <Redirect to={"../poll/" + id + "/stats"}/>;
  }

  const onValueChange = (event) => {
    setIndex(event.target.value);
  };

  return (
    <>
      <Navbar />
			<div className="container">
				{
					loaded ?
						<>
							<div className="btn-group">
								<Link to={"/poll/"+id+"/stats"} className="stats-btn">
									Stats
							  </Link>
              </div>
							{
              poll.question === "" && poll.options[0].name === "" && poll.options[0].count === 0 ?
                <h5>Empty poll...</h5> :
								<form onSubmit={handleSubmit}>
									<div className="form-body">
										<p className="poll-question">{poll.question}</p>
										{
											poll.options.map((option, index) => {
												return (
													<label className="poll-option-label">
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
									</div>
									{
										error.length ?
											<div className="error">
												{error.map((err) => 
													<p>
														<span class="material-icons warning">warning_amber</span>
														{err}
													</p>
												)}
											</div>
										: null
									}
									<button className="button submit" type="submit">Submit</button>
									{
										success.length ?
											<div className="success">
												<p>
													<span class="material-icons tick">check_circle_outline</span>
													{success}
												</p>
											</div>
										: null
									}
								</form>
							}
						</>
					: <Loader />
				}
			</div>
    </>
  );
};

export default Poll;
