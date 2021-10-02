import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import logo from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../data/reducers/auth.reducers";

const Navbar = () => {
	const user = useSelector((state) => state.auth).user;
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const logoutFunction = () => {
		dispatch(logout());
		history.push("/auth");
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link className={classes.brandContainer} to="/posts">
				<Typography className={classes.heading} variant="h2" align="center">
					Social App
				</Typography>
				<img className={classes.image} src={logo} alt="icon" height="60" />
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}>
							{user?.name?.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user?.name}
						</Typography>
						<Button variant="contained" className={classes.logout} color="secondary" onClick={logoutFunction}>
							Logout
						</Button>
					</div>
				) : (
					<Button component={Link} to="/auth" variant="contained" color="primary">
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
