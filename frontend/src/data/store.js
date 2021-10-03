import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts.reducers";
import authReducer from "./reducers/auth.reducers";
import { loadingBarReducer } from "react-redux-loading-bar";

export const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
		loadingBar: loadingBarReducer,
	},
});
