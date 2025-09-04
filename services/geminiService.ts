
import { GoogleGenAI } from "@google/genai";
import type { LetterData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveLetter = async (data: LetterData): Promise<string> => {
  const { recipientName, eyeColor, favoriteFood, favoritePlace, specialMemory, senderName } = data;

  const prompt = `
    You are a world-renowned romantic poet with a gift for writing deeply personal and moving love letters. Your task is to write a beautiful love letter from ${senderName} to ${recipientName}.

    Incorporate the following personal details to make the letter unique and heartfelt:

    - Their eye color is ${eyeColor}.
    - Their favorite food is ${favoriteFood}.
    - They love spending time at ${favoritePlace}.
    - A special memory we share is: "${specialMemory}".

    Please craft a letter that flows poetically, expressing deep affection and admiration. The tone should be romantic, sincere, and slightly whimsical. The letter should be approximately 200-300 words long. 
    
    Do not include a subject line or any introductory text like "Here is the love letter:". 
    
    Just provide the pure text of the letter, starting with a salutation like "My Dearest ${recipientName}," and ending with a closing like "Yours forever and always," or something similarly romantic, followed by the sender's name, ${senderName}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate the love letter. Please check your API key and try again.");
  }
};
