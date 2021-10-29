import React from "react";
import About from "./About";
import Body from "./Body";
import Create from "./Create";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Poll from "./Poll";
import Polls from "./Polls";
import Stats from "./Stats";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"; 

const App = () => {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Body} />
          <Route path="/polls" exact component={Polls} />
          <Route path="/about" exact component={About} />
          <Route path="/create" exact component={Create} />
          <Route path="/poll/:id" exact component={Poll}/>
          <Route path="/poll/:id/stats" exact component={Stats}/>
        </Switch>
        <Footer />
    </Router>
  );
};

export default App;
