import express  from "express";
import userController from "../controllers/userControllers.js";
import userMidd from "../middleware/userValidate.js";
import roleMidd from  "../middleware/roleValidate.js";
import auth from "../middleware/auth.js";


const router = express.Router();

router.post("/registerUser",
userMidd.existingUser,
roleMidd.existingRole,
userController.registerUser);

router.get("/listUser", userController.listUser);
router.get("/listAdmin", userController.listAdmin);
router.post("/login",userController.login);
router.put("/delete/:_id", userController.deleteUser);
router.put("/updateUserAdmin",auth, userController.updateUserAdmin);



export default router;