import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Test from "./Test";

// This component is used to render the appropriate page based on the switch condition of react routes.
// The footer is also rendered here.

const App = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Dashboard />} />
				<Route exact path="/home" element={<Home />} />
				<Route exact path="/register" element={<Register />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/polls" element={<Polls />} />
				<Route exact path="/about" element={<About />} />
				<Route exact path="/create" element={<Create />} />
				<Route exact path="/poll/:id" element={<Poll />} />
				<Route exact path="/poll/:id/stats" element={<Stats />} />
				{/* <Route exact path="/test" element={<Test />} /> */}
				<Route element={<NotFound />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
