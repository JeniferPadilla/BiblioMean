import express from "express";
import rolController from "../controllers/roleControllers.js";

const router = express.Router();

router.post("/registerRole", rolController.registerRole);
router.get("/listRole", rolController.consultRole);

export default router;