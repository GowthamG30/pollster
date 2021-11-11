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

// This component is used to render the appropriate page based on the switch condition of react routes.
// The footer is also rendered here.

const App = () => {
  return (
    <Router>
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
				<Route component={NotFound}/>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
