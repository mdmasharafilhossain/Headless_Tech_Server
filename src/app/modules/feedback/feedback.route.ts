import {Router} from "express";
import * as controller from "./feedback.controller";
import { validateRequest } from "../../middlewares/validator";
import { feedbackSchema } from "./feedback.validation";

const router = Router();

router.post("/", validateRequest(feedbackSchema), controller.createFeedback);
router.get("/",controller.getFeedbacks);

export default router;