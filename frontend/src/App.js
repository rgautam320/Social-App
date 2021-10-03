import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setUser } from "./data/reducers/auth.reducers";
import PostDetails from "./components/PostDetails/PostDetails";

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
				<Container maxWidth="xl">
					<Navbar />
					<Switch>
						<Route exact path="/" component={() => <Redirect to="/posts" />} />
						<Route exact path="/posts" component={Home} />
						<Route exact path="/posts/search" component={Home} />
						<Route exact path="/posts/:slug/:id" component={PostDetails} />
						<Route exact path="/auth" component={() => (user ? <Redirect to="/posts" /> : <Auth />)} />
					</Switch>
				</Container>
			</BrowserRouter>
		</>
	);
};

export default App;
