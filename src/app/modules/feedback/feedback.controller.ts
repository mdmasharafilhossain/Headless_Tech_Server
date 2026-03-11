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
export const getFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, priority, page = "1", limit = "6" } = req.query
    const feedbackFilter: Record<string, unknown> = {}
    if(name){
       feedbackFilter.name = {
           $regex: String(name),
          $options: "i",
       }
     }
    if (category){
         feedbackFilter.category = String(category)

    }
    if (priority) {
        feedbackFilter.priority = String(priority)
    }

    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const skip = (pageNumber - 1) * limitNumber
    const total = await Feedback.countDocuments(feedbackFilter)
    const feedbackList = await Feedback.find(feedbackFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)

    res.status(200).json({
        success: true,
        data: feedbackList,
         pagination: {
           total,
          page: pageNumber,
          limit: limitNumber,
           totalPages: Math.ceil(total / limitNumber)
      }
    })
  }catch(error){
       next(error)
  }
}
