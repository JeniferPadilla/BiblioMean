import express from "express";
import bookController from "../controllers/bookControllers.js";
import userIdMidd from "../middleware/idUserValidate.js";

const router = express.Router();

router.post("/registerBook",
userIdMidd.existingUser,
bookController.registerBook);

router.get("/listBook", bookController.consultBook);
router.put("/delete/:_id", bookController.deleteBook),
router.put("/updateBook", bookController.updateBook);


export default router;