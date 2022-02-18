import express from "express";
import bookController from "../controllers/bookControllers.js";

const router = express.Router();

router.post("/registerBook", bookController.registerBook);
router.get("/listBook", bookController.consultBook);

export default router;