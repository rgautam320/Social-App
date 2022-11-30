import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../data/reducers/posts.reducers";
import useStyles from "./styles";

const Paginate = ({ page, search, tags }) => {
    const history = useHistory();
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (tags?.length || search) {
            dispatch(getPostsBySearch({ search, tags, page }));
            history.push(`/posts/search?page=${page}&searchQuery=${search}&tags=${tags?.join(",")}`);
        } else if (tags?.length === 0 && !search) {
            history.push("/");
            dispatch(getPosts(page));
        } else {
            dispatch(getPosts(page));
        }
    }, [dispatch, page, tags?.length, search, history, tags]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts/search?page=${item?.page}&searchQuery=${search}&tags=${tags?.join(",")}`}
                />
            )}
        />
    );
};

export default Paginate;
