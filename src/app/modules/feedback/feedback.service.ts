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

      

  if (Email) {
  await sendEmail(
    Email as string,
    "New Feedback Received",
    `
      <h3>New Feedback Submitted</h3>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Category:</strong> ${aiAnalysisResult.category}</p>
      <p><strong>Priority:</strong> ${aiAnalysisResult.priority}</p>
      <p><strong>Sentiment:</strong> ${aiAnalysisResult.sentiment}</p>
      <p><strong>Assigned Team:</strong> ${aiAnalysisResult.team}</p>

      <p>Please review and take necessary action.</p>
    `
  );
}
  return createdFeedback;
};