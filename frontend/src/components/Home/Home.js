import { Container, Grid, Grow, Paper, Button, TextField, AppBar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPostsBySearch } from "../../data/reducers/posts.reducers";
import { logout } from "../../data/reducers/auth.reducers";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";
import decode from "jwt-decode";
import Pagination from "../Pagination/Pagination";

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	const tagsQuery = query.get("tags");

	const [currentId, setCurrentId] = useState(0);
	const [editing, setEditing] = useState(false);
	const [search, setSearch] = useState(searchQuery || "");
	const [tags, setTags] = useState(tagsQuery?.split(",") || []);

	const token = JSON.parse(localStorage.getItem("token"));

	const searchPost = () => {
		if (search?.trim() || tags.length !== 0) {
			dispatch(getPostsBySearch({ search, tags }));
			history.push(`/posts/search?searchQuery=${search}&tags=${tags?.join(",")}`);
		} else {
			history.push("/posts");
		}
	};
	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

	useEffect(() => {
		if (token) {
			const decodedData = decode(token);
			if (decodedData?.exp * 1000 < new Date().getTime()) {
				dispatch(logout());
			}
		}
	}, [history, dispatch]);

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
					<Grid item xs={12} sm={6} md={8} lg={9}>
						<Posts setCurrentId={setCurrentId} setEditing={setEditing} editing={editing} />
						<center>
							<Grid item xs={12} sm={8} md={6}>
								<Paper style={{ margin: "1.25rem 0" }} elevation={3}>
									<Pagination page={page} search={search} tags={tags} />
								</Paper>
							</Grid>
						</center>
					</Grid>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<AppBar className={classes.appBarSearch} position="static" color="inherit">
							<TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Posts" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
							<ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined" />
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} editing={editing} setEditing={setEditing} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
