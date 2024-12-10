import {Router} from "express"
import {conversation} from "../controllers/AIChatBot.controllers.js"

import {verfifyAdmin} from "../middlewares/AdminAuth.middleware.js"
import {verifyTeacher} from "../middlewares/teacherAuth.middleware.js"
import {verfityStudent} from "../middlewares/studentAuth.middleware.js"
import {verifyParent} from "../middlewares/parentAuth.middleware.js"

const router = Router();

router.route("/admin").post(verfifyAdmin,conversation);
router.route("/teacher").post(verifyTeacher,conversation);
router.route("/student").post(verfityStudent,conversation);
router.route("/parent").post(verifyParent,conversation)

export default router