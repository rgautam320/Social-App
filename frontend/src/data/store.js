import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/posts.reducers";

export const store = configureStore({
	reducer: {
		posts: reducer,
	},
});
