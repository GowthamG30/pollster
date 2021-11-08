import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Create = () => {
  const [error, setError] = useState([]);
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState("");

  const handleOptions = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleQuestion = (event) => {
    setQuestion(event.target.value);
  };

  const addOptions = () => {
    setOptions([...options, ""]);
  };

  const removeOptions = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
		let errorBuffer = [];

    // Validate Inputs
		if(!question)
			errorBuffer.push("Question should not be left empty");
		
		if(options.includes(""))
			errorBuffer.push("No option should be left empty");

		if(errorBuffer.length) {
			setError(errorBuffer);
			console.log("Error in validation" + errorBuffer);
			return;
		}

    const params = JSON.stringify({
			question: question,
      options: options
    });

    let requestOptions = {headers: {}};
		requestOptions.headers["content-type"] = "application/json";
		
		let accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
			requestOptions.headers["authorization"] = `Bearer ${accessToken}`;
    }
		JSON.stringify(requestOptions);
    
    axios
      .post("/api/create", params, requestOptions)
      .then(res => {
        setSuccess("Poll created!");
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
  };

  if(redirect) {
    return <Redirect to="/polls"/>;
  }

  return (
    <>
      <Navbar />
      <form className="create-form" onSubmit={handleSubmit}>
        <p className="create-label">Question:</p>
        <input type="text" value={question || ""} placeholder="Enter question..." autoComplete="off" onChange={event => handleQuestion(event)} />
        
        <p className="create-label">Options:</p>
        {options.map((element, index) => (
          <div className="option" key={index}>
            <input type="text" value={element || ""} placeholder={"Enter option "+(index+1)} autoComplete="off" onChange={event => handleOptions(index, event)} />
            {
              index ? 
                <button type="button" className="remove" onClick={() => removeOptions(index)}>
                  <span className="material-icons">delete_outline</span>
                </button> 
              : null
            }
          </div>
        ))}

        <button className="add" type="button" onClick={() => addOptions()}>Add Option</button><br/>
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
        <button className="submit" type="submit">Create</button>
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
    </>
  );
};

export default Create;
