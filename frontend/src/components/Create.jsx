import React, { useState } from "react";
import axios from "axios";
// import { Redirect } from "react-router";

const Create = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleOptions = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  }

  const handleQuestion= (event) => {
    setQuestion(event.target.value);
  }
  
  const addOptions = () => {
    setOptions([...options, ""]);
  }
  
  const removeOptions = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  }
  
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
      .then(res => console.log(res))
      .catch(err => console.error(err));

    window.location.href = "../polls";

    // <Redirect
    //   to="/polls"
    // />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Question</label>
      <input type="text" name="question" value={question || ""} autocomplete="off" onChange={event => handleQuestion(event)} />
      {options.map((element, index) => (
        <div className="form-inline" key={index}>
          <input type="text" name="option" value={element || ""} autocomplete="off" onChange={event => handleOptions(index, event)} />
          {
            index ? 
              <button type="button"  className="button remove" onClick={() => removeOptions(index)}>Remove</button> 
            : null
          }
        </div>
      ))}
      <div className="button-section">
          <button className="button add" type="button" onClick={() => addOptions()}>Add</button>
          <button className="button submit" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Create;
