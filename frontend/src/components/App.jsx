import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Body from "./Body";
import Polls from "./Polls";
import About from "./About";
import Create from "./Create";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import axios from "axios";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route path="/publicPolls" exact component={Polls} />
          <Route path="/about" exact component={About} />
          <Route path="/create" exact component={Create} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
