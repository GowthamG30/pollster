import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router";

const Create = () => {

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleChange = (i, e) => {
    const newOptions = [...options];
    newOptions[i] = e.target.value;
    setOptions(newOptions);
  }

  const handleQuestion= (e) => {
    setQuestion(e.target.value);
  }
  
  const addOptions = () => {
    setOptions([...options, ""]);
  }
  
  const removeOptions = (i) => {
    const newOptions = [...options];
    newOptions.splice(i, 1);
    setOptions(newOptions);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const params = JSON.stringify({
      "question": question,
      "options": options
    });
    
    axios
      .post('/api/create', params, {
        "headers": {
          "content-type": "application/json",
        },})
      .then(res => console.log(res))
      .catch(err => console.error(err));

    window.location.href = '../polls';

    // these below ones didn't work 

    // <Redirect
    //   to="/polls"
    // />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Question</label>
      <input type="text" name="question" value={question || ""} autocomplete="off" onChange={e => handleQuestion(e)} />
      {options.map((element, index) => (
        <div className="form-inline" key={index}>
          
          <input type="text" name="option" value={element || ""} autocomplete="off" onChange={e => handleChange(index, e)} />
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
}

export default Create;