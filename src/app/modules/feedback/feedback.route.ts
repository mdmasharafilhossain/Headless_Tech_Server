import {Router} from "express";
import * as controller from "./feedback.controller";

const router = Router();

router.post("/",  controller.createFeedback);
router.get("/",controller.getFeedbacks);

export default router;