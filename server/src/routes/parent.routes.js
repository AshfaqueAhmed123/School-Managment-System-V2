import {Router} from "express"
import {
    register,
    login,
    logout,
    updateAccountDetails,
    refreshAccessToken,
    changePassword
} from "../controllers/parent.controllers.js"
import {verifyParent} from "../middlewares/parentAuth.middleware.js"

const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyParent,logout);
router.route("/updateAccount").patch(verifyParent,updateAccountDetails);
router.route("/changePassword").patch(verifyParent,changePassword);

// children 
router.route("/children").get();
router.route("/children/:id").get();



export default router