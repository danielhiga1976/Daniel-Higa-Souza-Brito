import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const refineText = async (text: string, type: 'summary' | 'methodology'): Promise<string> => {
  if (!text) return '';

  const model = 'gemini-2.5-flash';
  
  let prompt = '';
  if (type === 'summary') {
    prompt = `Você é um assistente pedagógico universitário. Melhore o seguinte resumo de projeto de extensão. Torne-o profissional, conciso e limitado a um único parágrafo. Mantenha o sentido original.\n\nTexto original: "${text}"`;
  } else {
    prompt = `Você é um assistente pedagógico universitário. Melhore a descrição da metodologia de um projeto de extensão. Torne-a clara, organizada e focada em como os alunos desenvolverão as atividades. \n\nTexto original: "${text}"`;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return text; // Return original text if error
  }
};

export const suggestMethodology = async (projectName: string, course: string): Promise<string> => {
    if (!projectName) return '';

    const model = 'gemini-2.5-flash';
    const prompt = `Sugira uma metodologia resumida (como os alunos vão trabalhar) para um projeto de extensão universitária com o título "${projectName}" do curso de ${course}. Foco em atividades práticas e impacto na comunidade. Responda em 2-3 frases.`;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini:", error);
        return "Não foi possível gerar sugestão no momento.";
    }
}
