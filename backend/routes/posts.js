import express from "express";
import auth from "../middleware/auth.js";
import { getPosts, getPost, createPost, deletePost, updatePost, likePost, commentPost, getPostsBySearch } from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/single/:id", getPost);
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.delete("/:id", auth, deletePost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

export default router;
