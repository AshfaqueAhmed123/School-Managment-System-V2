import {Router} from "express"
import {
    create,
    getOne,
    getAll,
    remove
} from "../controllers/resource.controllers.js"

const router = Router();


router.route("/").post(create).get(getAll);
router.route("/:id").get(getOne).patch().delete(remove);

export default router 