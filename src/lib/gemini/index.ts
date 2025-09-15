import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_KEY,
});

export async function generateNiche(description: string) {
  const prompt = `From the following job description, extract:
      - niches: an array of all relevant industry niches/domains
      - skills: an array of key technical and soft skills
      - project_categories: an array of concise product or project categories
        (e.g. "Web Application Development", "Machine Learning Platform").
    Output strict JSON only.

    Job Description:
    ${description}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log("AI Response", response.text);
  return response.text;
}
