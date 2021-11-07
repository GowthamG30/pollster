import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      {/*add contact us*/}
      Copyright © {date.getFullYear()}
    </footer>
  );
};

export default Footer;
