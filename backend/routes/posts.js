import express from "express";
import auth from "../middleware/auth.js";
import { getPosts, createPost, deletePost, updatePost, likePost } from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/like", auth, likePost);

export default router;
