import express from "express";
import {
  createUser,
  getAllUser,
  signInUser,
} from "../controller/authControllter";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/sign-in").post(signInUser);
router.route("/all-user").get(getAllUser);

export default router;
