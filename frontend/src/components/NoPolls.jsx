import React from "react";
import { Link } from "react-router-dom";

const NoPolls = () => {
  return (
    <div className="box">
      <p>Uh oh...No polls here, <Link to="/create">Create one</Link></p>
    </div>
  );
};

export default NoPolls;
