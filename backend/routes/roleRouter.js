import express from "express";
import roleControllers from "../controllers/roleControllers.js";
import rolController from "../controllers/roleControllers.js";

const router = express.Router();

router.post("/registerRole",
rolController.registerRole);
router.get("/listRole", rolController.consultRole);
router.put("/delete/:_id", rolController.deleteRol);
router.put("/updateRole", roleControllers.updateRole);

export default router;