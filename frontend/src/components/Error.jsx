import React from "react";

const Error = (props) => {
  return (
    <>
    {
      props.error.length ?
        <div className="msg error">
          {props.error.map((err, index) => 
            <p key={index}>
              <span class="material-icons warning">warning_amber</span>
              {err}
            </p>
          )}
        </div>
      : null
    }
    </>
  );
};

export default Error;
