import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";

const Create = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
	const [redirect, setRedirect] = useState(false);
  const [newPath, setNewPath] = useState("/");

	useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    let headers = null;

    if(accessToken) {
      headers = {headers: {authorization: `Bearer ${accessToken}`}};
      JSON.stringify(headers);
    }

    axios
      .get("/api/verify", headers)
      .then()
      .catch(err => {
        // console.error("home err: " + err);
				setNewPath("/login");
        setRedirect(true);
      });
  }, []);

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
    
    const params = JSON.stringify({
      "question": question,
      "options": options
    });
    
    axios
      .post("/api/create", params, {
        "headers": {
          "content-type": "application/json",
        },})
      .then(res => {
				// console.log(res)
        setNewPath("/polls");
				setRedirect(true);
			})
      .catch(err => {
        // console.error(err);
        setNewPath("/login");
        setRedirect(true);
      });
  };

	if(redirect) {
		console.log(newPath);
    return <Redirect to={newPath}/>;
  }

  return (
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
			<button className="submit" type="submit">Create</button>
    </form>
  );
};

export default Create;
