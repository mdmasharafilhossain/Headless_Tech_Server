import { AiGenerateFeedback } from "../../llm/AiGenerateFeedback";
import { AppError } from "../../utilis/AppError";
import Feedback from "./feedback.model";
import { FeedbackInput } from "./feedback.validation";

export const createFeedback = async (feedbackPayload: FeedbackInput) => {
    const { name, message } = feedbackPayload;
    const aiAnalysisResult = await AiGenerateFeedback(message);

    if (!aiAnalysisResult) {

        throw AppError.internalError("Failed to analyze feedback");

    }

    const createdFeedback = await Feedback.create({

        name,

        message,

        category: aiAnalysisResult.category,
        priority: aiAnalysisResult.priority,
        sentiment: aiAnalysisResult.sentiment,
        team: aiAnalysisResult.team,


    });
    return createdFeedback;
};