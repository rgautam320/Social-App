import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUser } from "./data/reducers/auth.reducers";

const App = () => {
	const user = JSON.parse(localStorage.getItem("profile"));
	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	useEffect(() => {
		if (user && token) {
			dispatch(setUser(user));
		}
	}, [dispatch, user, token]);

	return (
		<>
			<BrowserRouter>
				<Container maxWidth="lg">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/auth" component={Auth} />
					</Switch>
				</Container>
			</BrowserRouter>
		</>
	);
};

export default App;
