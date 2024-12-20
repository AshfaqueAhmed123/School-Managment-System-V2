import {Router} from "express"
import {

    register,
    login,
    logout,
    changePassword,
    getAllTeachers,
    deleteTeacher
} from "../controllers/teacher.controllers.js"
import { verifyTeacher } from "../middlewares/teacherAuth.middleware.js";
import {verfifyAdmin} from "../middlewares/AdminAuth.middleware.js"
import { Teacher } from "../model/Teacher.model.js";

const router = Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyTeacher,logout);
router.route("account-details").get();
router.route("/updateAccount").patch();
router.route("/changePassword").patch(verifyTeacher,changePassword);
router.route("/deleteTeacher/:id").delete(verfifyAdmin,deleteTeacher)

// assignment routes
router.route("/assignment").post().patch().delete();

// meeting routes
router.route("/meeting").post();
router.route("/all-meeting").get();
router.route("/meeting/:id").get();
router.route("/meeting/:id").patch();
router.route("/meeting/:id").delete();

// admin will get this data
router.route("/allTeachers").get(async(req,res)=>{
    let allTeachersCount = await Teacher.find();
    allTeachersCount = allTeachersCount.length
    res.json({
        num : allTeachersCount
    })
})

router.route("/allTeachersList").get(verfifyAdmin,getAllTeachers)



export default router
