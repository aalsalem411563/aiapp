import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";

const API_KEY = process.env.API_KEY as string;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateReportContent = async (prompt: string): Promise<GenerateContentResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        description: {
                            type: Type.STRING,
                            description: 'The detailed description of the program/activity.',
                        },
                        goals: {
                            type: Type.STRING,
                            description: 'The goals of the program/activity, with each goal separated by a newline character.',
                        },
                    },
                    required: ["description", "goals"],
                },
            },
        });
        return response;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
};

export const generateAnnouncementContent = async (prompt: string): Promise<GenerateContentResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        body: {
                            type: Type.STRING,
                            description: 'The full text body of the announcement or news item.',
                        },
                    },
                    required: ["body"],
                },
            },
        });
        return response;
    } catch (error) {
        console.error("Error generating announcement content:", error);
        throw error;
    }
};

export const startChatSession = (): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are a friendly and expert educational assistant named 'Deep Seek'. Your goal is to provide helpful answers to teachers' questions, assist with lesson planning, suggest educational activities, and support various teaching tasks. Respond in Arabic.",
    },
  });
  return chat;
};