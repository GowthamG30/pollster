import React, { useState, useEffect } from "react";

const Poll = (props) => {

  return (
    <div className="poll">
      <h4>{props.question}</h4>
      {
        props.options.map((option) => {
          return <h5>{option.name} {option.count}</h5>;
        })
      }
    </div>
  );
}

export default Poll;
