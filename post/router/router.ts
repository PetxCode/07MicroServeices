import express from "express";
import { createPost, getAllPost } from "../controller/postControllter";
import { verified } from "../utils/verified";

const router = express.Router();

router.route("/create-post").post(verified, createPost);
router.route("/all-post").get(getAllPost);

export default router;
