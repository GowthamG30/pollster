import React, { useState } from "react";

const Create = () => {

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  let handleChange = (i, e) => {
    let newOptions = [...options];
    newOptions[i] = e.target.value;
    setOptions(newOptions);
  }

  let handleQuestion= (e) => {
    setQuestion(e.target.value);
  }
  
  let addOptions = () => {
    setOptions([...options, ""]);
  }
  
  let removeOptions = (i) => {
    let newOptions = [...options];
    newOptions.splice(i, 1);
    setOptions(newOptions);
  }
  
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(question);
    console.log(options);
    // alert(JSON.stringify(options));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Question</label>
      <input type="text" name="question" value={question || ""} onChange={e => handleQuestion(e)} />
      {options.map((element, index) => (
        <div className="form-inline" key={index}>
          
          <input type="text" name="option" value={element || ""} onChange={e => handleChange(index, e)} />
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