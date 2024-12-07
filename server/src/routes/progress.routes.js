import {Router} from "express"

const router = Router();


router.route("/").post().get();
router.route("/:id").get().patch().delete();

export default router 