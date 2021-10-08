import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
		},
	},
	paper: {
		padding: theme.spacing(2),
	},
	form: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
	},
	fileInput: {
		width: "100%",
		margin: "10px",
	},
	buttonSubmit: {
		marginBottom: 10,
	},
	error: {
		color: "red",
		fontSize: "0.8rem",
	},
}));
