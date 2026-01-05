
import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
  }

  async generateApologyPoem(recipientName: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write a short, incredibly heartfelt 4-line romantic apology poem specifically for ${recipientName}. 
                   Focus on the words "Sorry", "Forever", and "Longing". Keep it poetic, intimate, and warm. 
                   Do not use emojis. Just the text of the poem.`,
        config: {
          temperature: 0.9,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 150,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text.trim();
    } catch (error) {
      console.error('Gemini error:', error);
      return "My heart aches for the silence between us,\nI carry my sorry like a heavy chain,\nUntil the day I can hold you again,\nOur love will bloom beyond this pain.";
    }
  }
}
