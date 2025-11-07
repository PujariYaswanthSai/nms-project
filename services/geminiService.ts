
import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key) {
    // In a real app, you might want to handle this more gracefully.
    // For this prototype, we'll alert the user and throw an error.
    alert("API_KEY environment variable not set. Please set it to use the AI explanation feature.");
    throw new Error("API_KEY not found.");
  }
  return key;
};

export const getComponentExplanation = async (componentName: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });

    const prompt = `
      You are an expert in 5G Core Networks.
      Explain the role of the "${componentName}" in a 5G Core network (like Free5GC).
      Describe its key functions and its main interactions with other relevant network functions.
      Keep the explanation concise, clear, and suitable for a final-year engineering student.
      Use bullet points for key functions. Format the output as clean markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini API:", error);
    return "Failed to fetch explanation. Please check your API key and network connection.";
  }
};
