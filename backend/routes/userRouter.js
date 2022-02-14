import express  from "express";
import userController from "../controllers/userControllers.js";

const router = express.Router();

router.post("/registerUser", userController.registerUser);

export default router;