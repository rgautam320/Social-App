import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Paper, Grid, Typography, Container, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
// import { GoogleLogin } from "react-google-login";
// import Icon from "./Icon";
// import { googleSignin, signin, signup } from "../../data/reducers/auth.reducers";
import { signin, signup } from "../../data/reducers/auth.reducers";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const SignUp = () => {
    const { user, loading } = useSelector((state) => state.auth);

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(form));
        } else {
            dispatch(signin(form));
        }
    };

    // const googleSuccess = async (res) => {
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;

    //     try {
    //         dispatch(googleSignin({ result, token }));
    //         console.log(token);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const googleError = (e) => console.log(e);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        if (user) {
            history.push("/");
        }
    }, [history, user]);

    return (
        <Container component="main" maxWidth="xs">
            {!loading ? (
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isSignup ? "Sign up" : "Sign in"}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignup && (
                                <>
                                    <Input
                                        name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                            <Input
                                name="password"
                                label="Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                            {isSignup && (
                                <Input
                                    name="confirmPassword"
                                    label="Repeat Password"
                                    handleChange={handleChange}
                                    type="password"
                                />
                            )}
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignup ? "Sign Up" : "Sign In"}
                        </Button>
                        {/* <GoogleLogin
                            clientId="842564676314-h91qhqs006bv18uclg69cjss9p4r3b5g.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        /> */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            ) : (
                <CircularProgress />
            )}
        </Container>
    );
};

export default SignUp;
