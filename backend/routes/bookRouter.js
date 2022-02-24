import express from "express";
import bookController from "../controllers/bookControllers.js";
import userIdMidd from "../middleware/idBookValidate.js";

const router = express.Router();

router.post("/registerBook",
userIdMidd.existingUser,
userIdMidd.existingBook,
bookController.registerBook);

router.get("/listBook", bookController.consultBook);
router.get("/listBookUser/:_id?", bookController.listBookUser);
router.put("/delete/:_id", bookController.deleteBook),
router.put("/updateBook", bookController.updateBook);


export default router;