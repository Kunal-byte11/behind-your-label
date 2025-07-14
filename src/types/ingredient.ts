export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface Ingredient {
  name: string;
  hindiName?: string;
  scientificName?: string;
  riskLevel: RiskLevel;
  explanation: string;
  healthImpact: string;
  fssaiWarning?: string;
  allergenInfo?: string;
  ayurvedicView?: string;
  suitableFor: string[];
}

export interface AnalysisResult {
  ingredients: Ingredient[];
  overallRiskScore: number;
  keyWarnings: string[];
  recommendations: string[];
  extractedText?: string;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  healthConditions: string[];
  language: 'english' | 'hindi' | 'hinglish';
}