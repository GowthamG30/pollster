import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import Navbar from "./Navbar";
import Verify from "./Verify";

const Create = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [error, setError] = useState("");

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
		let errorBuffer = "";

    // Validation
		if(!question)
			errorBuffer += "Question should not be left empty\n";
		
		if(options.includes(""))
			errorBuffer += "No option should be left empty\n";

		if(errorBuffer) {
			setError(errorBuffer);			
			console.log("Error in validation" + errorBuffer);
			return;
		}

    const params = JSON.stringify({
			"question": question,
      "options": options
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
				// console.log(res)
			})
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <Verify />
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
        <span className="error">{error}</span>
        <button className="submit" type="submit">Create</button>
      </form>
    </>
  );
};

export default Create;
