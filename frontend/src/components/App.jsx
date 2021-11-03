import React from "react";
import About from "./About";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Poll from "./Poll";
import Polls from "./Polls";
import Register from "./Register";
import Stats from "./Stats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/polls" exact component={Polls} />
        <Route path="/about" exact component={About} />
        <Route path="/create" exact component={Create} />
        <Route path="/poll/:id" exact component={Poll} />
        <Route path="/poll/:id/stats" exact component={Stats} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
