import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { envVars } from "../config/env";
import { AppError } from "../utilis/AppError";

const model = new ChatGoogleGenerativeAI({

    apiKey: envVars.GEMINI_API_KEY!,
    model: "gemini-2.5-flash",
    temperature: 0

});

export const AiGenerateFeedback = async (text: string) => {
    const prompt = PromptTemplate.fromTemplate(`


Analyze the feedback and return ONLY valid JSON.

{{
 "category": "bug | feature | ui | performance",
 "priority": "low | medium | high",
 "sentiment": "positive | neutral | negative",
 "team": "frontend | backend | support"
}}

Feedback:
{text}


`);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({ text });

    if (!response || !response.content) {
        throw AppError.internalError("AI did not return any response");
    }

    const rawResponse = response.content as string;

    const cleanedResponse = rawResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    try {
        return JSON.parse(cleanedResponse);
    } catch {
        throw AppError.internalError("Failed to parse AI response");
    }
};