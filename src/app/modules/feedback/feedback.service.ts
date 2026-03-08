import { teamEmails } from "../../config/teamEmail";
import { AiGenerateFeedback } from "../../llm/AiGenerateFeedback";
import { AppError } from "../../utilis/AppError";
import { sendEmail } from "../../utilis/sendEmail";
import Feedback from "./feedback.model";
import { FeedbackInput } from "./feedback.validation";

export const createFeedback = async (feedbackPayload: FeedbackInput) => {
  const { name, message,Email } = feedbackPayload;
  const aiAnalysisResult = await AiGenerateFeedback(message);

  if (!aiAnalysisResult){

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

      const assignedTeamEmail = Email

  if (assignedTeamEmail){
    await sendEmail(
      assignedTeamEmail as string,
      "New Feedback Received",
      `
        <h2>New Feedback Submitted</h2>
        <p><b>Name: </b>  ${name}</p>
        <p><b>Message: </b>   ${message}</p>
        <p><b>Category: </b>   ${aiAnalysisResult?.category}</p>
        <p><b>Priority: </b>  ${aiAnalysisResult?.priority}</p>
        <p><b>Sentiment: </b>  ${aiAnalysisResult?.sentiment}</p>
        <p><b>Assigned Team: </b>  ${aiAnalysisResult?.team}</p>
      `
    );

  }

  return createdFeedback;
};