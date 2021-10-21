import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Body from "./Body";
import Polls from "./Polls";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import axios from "axios";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route path="/polls" exact component={Polls} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
