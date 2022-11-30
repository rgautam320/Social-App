import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId, editing, setEditing }) => {
    const { post, loading } = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        <>
            {loading ? (
                <center style={{ marginTop: "1rem" }}>
                    <CircularProgress size="5em" />
                </center>
            ) : (
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {post?.map((val) => (
                        <Grid key={val._id} item xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Post post={val} setCurrentId={setCurrentId} setEditing={setEditing} editing={editing} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Posts;
