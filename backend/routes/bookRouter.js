import express from "express";
import bookController from "../controllers/bookControllers.js";
import userIdMidd from "../middleware/idBookValidate.js";
// import auth from "../package.json/auth";
import auth from '../middleware/auth.js';
const router = express.Router();

router.post("/registerBook",
auth,
userIdMidd.existingUser,
userIdMidd.existingBook,
bookController.registerBook);

router.get("/listBook",auth, bookController.consultBook);
router.get("/listBookUser/:_id?", bookController.listBookUser);
router.delete("/delete/:_id",auth, bookController.deleteBook),
router.put("/updateBook", auth, bookController.updateBook);


export default router;