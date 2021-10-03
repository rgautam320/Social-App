import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	appBarSearch: {
		borderRadius: 4,
		marginBottom: "0.6rem",
		display: "flex",
		padding: "16px",
	},
	pagination: {
		borderRadius: 4,
		marginTop: "0.6rem",
		padding: "4px",
	},
	gridContainer: {
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column-reverse",
		},
	},
}));
