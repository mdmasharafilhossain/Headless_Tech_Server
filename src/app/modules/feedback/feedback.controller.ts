import { Request, Response, NextFunction } from "express";
import Feedback from "./feedback.model";
import * as feedbackService from "./feedback.service";
import { AppError } from "../../utilis/AppError";

export const createFeedback = async (req: Request,res: Response,next: NextFunction)=>{
  try { const feedbackPayload = req.body;
    if (!feedbackPayload){

      throw AppError.badRequest("Feedback payload is required");
    }
    const createdFeedback = await feedbackService.createFeedback(

      feedbackPayload

    );

    res.status(201).json({
      success: true,
      data: createdFeedback,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbacks = async (req: Request,res: Response,next: NextFunction) =>{
  try { const { name, category, priority } = req.query;
 const feedbackFilter: Record<string, unknown> = {};

    if (name) {

      feedbackFilter.name = {
        $regex: String(name),
        $options: "i",
      };

    }
  if (category) {
      feedbackFilter.category = String(category);
    }
 if (priority) {
      feedbackFilter.priority = String(priority);
    }
  const feedbackList = await Feedback.find(feedbackFilter).sort({

      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: feedbackList,

    });
  } catch (error){
    next(error);
  }
};