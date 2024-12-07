import {Router} from "express"
import {
    createMeeting,
    deleteMeeting,
    getAllMeetings,
} from "../controllers/meeting.controllers.js"

const router = Router();

router.route("/").post(createMeeting).get(getAllMeetings);

router.route("/:id").delete(deleteMeeting)

export default router