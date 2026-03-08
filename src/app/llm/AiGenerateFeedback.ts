import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {PromptTemplate} from "@langchain/core/prompts";
import { envVars } from "../config/env";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
  model: "gemini-2.5-flash",
  temperature: 0
});

export const AiGenerateFeedback = async(text:string)=>{

 const prompt = PromptTemplate.fromTemplate(`
Analyze this feedback and return JSON only:

category: bug | feature | ui | performance
priority: low | medium | high
sentiment: positive | neutral | negative
team: frontend | backend | support

Feedback:
{text}
`);

 const chain = prompt.pipe(model);

  const response = await chain.invoke({ text });

  const raw = response.content as string;

  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);

};