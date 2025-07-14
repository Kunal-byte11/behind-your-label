import { GoogleGenerativeAI } from '@google/generative-ai';
import { Ingredient, RiskLevel, AnalysisResult } from '../types/ingredient';
import { UserPreferences } from '../types/preferences';
import { budgetTracker } from './budgetTracker';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  private visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Check budget before making any request
  private checkBudget(): { allowed: boolean; message?: string } {
    const check = budgetTracker.canMakeRequest();
    
    if (!check.allowed) {
      if (check.reason === 'budget_exceeded') {
        return {
          allowed: false,
          message: '💰 We\'ve reached our free budget limit! To continue using Behind Your Label, please consider supporting us. Your support helps us keep the service running for everyone! 🙏'
        };
      } else if (check.reason === 'daily_limit_exceeded') {
        return {
          allowed: false,
          message: '📊 You\'ve reached the daily free limit (20 scans). Come back tomorrow or support us to unlock unlimited scans! ✨'
        };
      }
    }

    return { allowed: true };
  }

  // Analyze product label image using Gemini Vision
  async analyzeProductLabel(imageFile: File): Promise<AnalysisResult> {
    // Check budget first
    const budgetCheck = this.checkBudget();
    if (!budgetCheck.allowed) {
      throw new Error(budgetCheck.message);
    }

    try {
      // Convert image to base64
      const imageData = await this.fileToGenerativePart(imageFile);
      
      const prompt = `
        Analyze this Indian product label image and extract ingredients with health insights:

        INSTRUCTIONS:
        1. Extract ALL ingredients from the label (ignore brand names, nutritional info, addresses)
        2. For each ingredient, provide:
           - Name in English and Hindi (if applicable)
           - Risk level: LOW, MODERATE, or HIGH
           - Health impact explanation
           - FSSAI compliance notes
           - Allergen warnings (Indian Big 9: Milk, Eggs, Fish, Shellfish, Tree nuts, Peanuts, Wheat, Soy, Sesame)

        3. Consider Indian health concerns:
           - Diabetes prevalence
           - Skin sensitivity
           - Hormonal imbalances
           - Ayurvedic principles
           - FSSAI regulations

        4. Decode scientific names and E-numbers into simple explanations
        5. Flag ingredients with mandatory FSSAI warnings (MSG, Aspartame, etc.)

        RESPONSE FORMAT (JSON):
        {
          "extractedText": "full text found on label",
          "ingredients": [
            {
              "name": "ingredient name",
              "hindiName": "हिंदी नाम",
              "scientificName": "scientific/E-number name",
              "riskLevel": "LOW|MODERATE|HIGH",
              "explanation": "what this ingredient does",
              "healthImpact": "health effects explanation",
              "fssaiWarning": "any FSSAI mandated warning",
              "allergenInfo": "allergen category if applicable",
              "ayurvedicView": "Ayurvedic perspective",
              "suitableFor": ["general", "diabetic", "children", "pregnancy", "jain", "vegan"]
            }
          ],
          "overallRiskScore": 0-100,
          "keyWarnings": ["important warnings"],
          "recommendations": ["healthier alternatives or advice"]
        }

        Focus on Indian consumer safety and cultural dietary needs.
      `;

      const result = await this.visionModel.generateContent([prompt, imageData]);
      const response = await result.response;
      const text = response.text();

      // Track the request cost
      budgetTracker.trackRequest(prompt, text);

      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse ingredient data from image');
      }

      const analysisData = JSON.parse(jsonMatch[0]);
      
      return {
        ingredients: analysisData.ingredients.map((ing: any) => ({
          ...ing,
          riskLevel: this.mapRiskLevel(ing.riskLevel)
        })),
        overallRiskScore: analysisData.overallRiskScore,
        keyWarnings: analysisData.keyWarnings || [],
        recommendations: analysisData.recommendations || [],
        extractedText: analysisData.extractedText
      };

    } catch (error) {
      console.error('Error analyzing product label:', error);
      
      // If it's a budget error, re-throw it
      if (error instanceof Error && error.message.includes('💰')) {
        throw error;
      }
      
      throw new Error('Failed to analyze product label. Please try again.');
    }
  }

  // Analyze manually entered ingredients
  async analyzeIngredients(ingredientText: string): Promise<AnalysisResult> {
    // Check budget first
    const budgetCheck = this.checkBudget();
    if (!budgetCheck.allowed) {
      throw new Error(budgetCheck.message);
    }

    try {
      const prompt = `
        Analyze these ingredients for Indian consumers and provide health insights:

        INGREDIENTS: ${ingredientText}

        ANALYSIS REQUIREMENTS:
        1. Parse and analyze each ingredient
        2. Consider Indian health standards (FSSAI, AYUSH guidelines)
        3. Flag allergens from Indian Big 9 list
        4. Decode E-numbers and scientific names
        5. Provide Ayurvedic perspective where relevant
        6. Consider regional health concerns (diabetes, skin issues)

        RESPONSE FORMAT (JSON):
        {
          "ingredients": [
            {
              "name": "ingredient name",
              "hindiName": "हिंदी नाम",
              "scientificName": "scientific/E-number name",
              "riskLevel": "LOW|MODERATE|HIGH",
              "explanation": "what this ingredient does",
              "healthImpact": "health effects explanation",
              "fssaiWarning": "any FSSAI mandated warning",
              "allergenInfo": "allergen category if applicable",
              "ayurvedicView": "Ayurvedic perspective",
              "suitableFor": ["general", "diabetic", "children", "pregnancy", "jain", "vegan"]
            }
          ],
          "overallRiskScore": 0-100,
          "keyWarnings": ["important warnings"],
          "recommendations": ["healthier alternatives or advice"]
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Track the request cost
      budgetTracker.trackRequest(prompt + ingredientText, text);

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not parse ingredient analysis');
      }

      const analysisData = JSON.parse(jsonMatch[0]);
      
      return {
        ingredients: analysisData.ingredients.map((ing: any) => ({
          ...ing,
          riskLevel: this.mapRiskLevel(ing.riskLevel)
        })),
        overallRiskScore: analysisData.overallRiskScore,
        keyWarnings: analysisData.keyWarnings || [],
        recommendations: analysisData.recommendations || []
      };

    } catch (error) {
      console.error('Error analyzing ingredients:', error);
      
      // If it's a budget error, re-throw it
      if (error instanceof Error && error.message.includes('💰')) {
        throw error;
      }
      
      throw new Error('Failed to analyze ingredients. Please try again.');
    }
  }

  // Sarthi AI Chat Assistant
  async chatWithSarthi(
    message: string, 
    context: { ingredients?: Ingredient[], userPreferences?: string[], preferences?: UserPreferences } = {}
  ): Promise<string> {
    // Check budget first
    const budgetCheck = this.checkBudget();
    if (!budgetCheck.allowed) {
      return budgetCheck.message || 'Service temporarily unavailable.';
    }

    try {
      const contextInfo = context.ingredients 
        ? `Current ingredients being analyzed: ${context.ingredients.map(i => i.name).join(', ')}`
        : '';
      
      const preferences = context.userPreferences?.length 
        ? `User preferences: ${context.userPreferences.join(', ')}`
        : '';
      
      const detailedPrefs = context.preferences ? `
        Dietary restrictions: ${context.preferences.dietaryRestrictions.join(', ')}
        Health conditions: ${context.preferences.healthConditions.join(', ')}
        Avoid ingredients: ${context.preferences.avoidIngredients.join(', ')}
        Preferred origins: ${context.preferences.preferredOrigins.join(', ')}
        Age group: ${context.preferences.ageGroup}
        Strictness: ${context.preferences.strictness}
      ` : '';

      const prompt = `
        You are Sarthi, an AI assistant helping Indian consumers understand food ingredients and make healthier choices.

        CONTEXT:
        ${contextInfo}
        ${preferences}
        ${detailedPrefs}

        USER QUESTION: ${message}

        GUIDELINES:
        1. Respond in a friendly, conversational tone
        2. Use Hindi/Hinglish when appropriate
        3. Focus on Indian health concerns and dietary habits
        4. Include skincare advice for cosmetic ingredients
        4. Reference FSSAI guidelines and Ayurvedic principles
        5. Consider cultural dietary restrictions (Jain, Vegan, etc.)
        6. Provide practical, actionable advice
        7. Keep responses concise but informative

        RESPONSE STYLE:
        - Use simple language that common people can understand
        - Include Hindi words naturally (like "acha", "theek hai", "samjha")
        - Be encouraging and supportive
        - Provide specific Indian brand alternatives when relevant

        Answer the user's question helpfully and accurately.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Track the request cost
      budgetTracker.trackRequest(prompt + message, text);

      return text;

    } catch (error) {
      console.error('Error in Sarthi chat:', error);
      return 'Sorry, I encountered an error. Please try asking again.';
    }
  }

  // Convert file to format needed by Gemini
  private async fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.readAsDataURL(file);
    });

    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
  }

  private mapRiskLevel(level: string): RiskLevel {
    switch (level.toUpperCase()) {
      case 'HIGH': return 'HIGH';
      case 'MODERATE': return 'MODERATE';
      default: return 'LOW';
    }
  }

  // Get usage statistics
  getUsageStats() {
    return budgetTracker.getUsageStats();
  }
}

export const geminiService = new GeminiService();