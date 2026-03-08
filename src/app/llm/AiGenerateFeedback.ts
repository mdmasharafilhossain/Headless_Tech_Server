import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {PromptTemplate} from "@langchain/core/prompts";
import { envVars } from "../config/env";

const model = new ChatGoogleGenerativeAI({

 apiKey:envVars.GEMINI_API_KEY,
 model:"gemini-pro"

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

 const response = await chain.invoke({
  text
 });

 const result = JSON.parse(response.content as string);

 return result;

};