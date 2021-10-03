import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/posts.reducers";
import authReducer from "./reducers/auth.reducers";
import loadingReducer from "./reducers/loading.reducers";

export const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
		loading: loadingReducer,
	},
});
