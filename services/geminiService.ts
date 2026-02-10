import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCreativeDescription = async (projectTitle: string, category: string): Promise<string> => {
  try {
    const modelId = 'gemini-3-flash-preview';
    const prompt = `Write a short, sophisticated, and artistic critique (max 40 words) for a design portfolio project titled "${projectTitle}" in the category of "${category}". Sound like a high-end design curator.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "This piece speaks for itself.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An exploration of form and function.";
  }
};