import React from "react";

const Success = (props) => {
  return (
    <>
    {
      props.success.length ?
        <div className="success">
          <p>
            <span class="material-icons tick">check_circle_outline</span>
            {props.success}
          </p>
        </div>
      : null
    }
    </>
  );
};

export default Success;
