import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import About from "./About";
import Create from "./Create";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Poll from "./Poll";
import Polls from "./Polls";
import Register from "./Register";
import Stats from "./Stats";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/polls" component={Polls} />
        <Route exact path="/about" component={About} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/poll/:id" component={Poll} />
        <Route exact path="/poll/:id/stats" component={Stats} />
				<Route component={NotFound}/>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
