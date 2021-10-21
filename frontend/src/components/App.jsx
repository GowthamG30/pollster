import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Body from "./Body";
import axios from "axios";

function App() {
  return (
    <div>
      <Navbar />
			<Body />
      <Footer />
    </div>
  );
}

export default App;
