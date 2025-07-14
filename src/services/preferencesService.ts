import { UserPreferences, DEFAULT_PREFERENCES } from '../types/preferences';

const PREFERENCES_KEY = 'byl_user_preferences';

export class PreferencesService {
  // Load preferences from localStorage
  static loadPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
    return DEFAULT_PREFERENCES;
  }

  // Save preferences to localStorage
  static savePreferences(preferences: UserPreferences): void {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  // Clear all preferences
  static clearPreferences(): void {
    localStorage.removeItem(PREFERENCES_KEY);
  }

  // Check if ingredient matches user preferences
  static isIngredientAllowed(
    ingredient: any,
    preferences: UserPreferences
  ): { allowed: boolean; reasons: string[] } {
    const reasons: string[] = [];
    let allowed = true;

    // Check dietary restrictions
    if (preferences.dietaryRestrictions.includes('vegan') && 
        !ingredient.suitableFor?.includes('vegan')) {
      allowed = false;
      reasons.push('Not vegan-friendly');
    }

    if (preferences.dietaryRestrictions.includes('vegetarian') && 
        !ingredient.suitableFor?.includes('vegetarian')) {
      allowed = false;
      reasons.push('Not vegetarian');
    }

    if (preferences.dietaryRestrictions.includes('jain') && 
        !ingredient.suitableFor?.includes('jain')) {
      allowed = false;
      reasons.push('Not suitable for Jain diet');
    }

    if (preferences.dietaryRestrictions.includes('gluten-free') && 
        ingredient.allergenInfo?.toLowerCase().includes('wheat')) {
      allowed = false;
      reasons.push('Contains gluten');
    }

    if (preferences.dietaryRestrictions.includes('dairy-free') && 
        ingredient.allergenInfo?.toLowerCase().includes('milk')) {
      allowed = false;
      reasons.push('Contains dairy');
    }

    if (preferences.dietaryRestrictions.includes('nut-free') && 
        (ingredient.allergenInfo?.toLowerCase().includes('nut') || 
         ingredient.allergenInfo?.toLowerCase().includes('peanut'))) {
      allowed = false;
      reasons.push('Contains nuts');
    }

    // Check health conditions
    if (preferences.healthConditions.includes('diabetic') && 
        ingredient.name.toLowerCase().includes('sugar')) {
      allowed = false;
      reasons.push('High sugar content - not diabetic-friendly');
    }

    if (preferences.healthConditions.includes('hypertension') && 
        ingredient.name.toLowerCase().includes('sodium')) {
      allowed = false;
      reasons.push('High sodium - not suitable for hypertension');
    }

    // Check skincare needs
    if (preferences.skincareNeeds.includes('sensitive-skin') && 
        (ingredient.name.toLowerCase().includes('fragrance') || 
         ingredient.name.toLowerCase().includes('alcohol') ||
         ingredient.name.toLowerCase().includes('sulfate'))) {
      allowed = false;
      reasons.push('May irritate sensitive skin');
    }

    if (preferences.skincareNeeds.includes('acne-prone') && 
        (ingredient.name.toLowerCase().includes('coconut oil') ||
         ingredient.name.toLowerCase().includes('cocoa butter') ||
         ingredient.name.toLowerCase().includes('isopropyl myristate'))) {
      allowed = false;
      reasons.push('May clog pores - not suitable for acne-prone skin');
    }

    if (preferences.skincareNeeds.includes('sulfate-free') && 
        (ingredient.name.toLowerCase().includes('sodium lauryl sulfate') ||
         ingredient.name.toLowerCase().includes('sodium laureth sulfate') ||
         ingredient.name.toLowerCase().includes('sls') ||
         ingredient.name.toLowerCase().includes('sles'))) {
      allowed = false;
      reasons.push('Contains sulfates');
    }

    if (preferences.skincareNeeds.includes('fragrance-free') && 
        (ingredient.name.toLowerCase().includes('fragrance') ||
         ingredient.name.toLowerCase().includes('parfum') ||
         ingredient.name.toLowerCase().includes('essential oil'))) {
      allowed = false;
      reasons.push('Contains fragrance - may cause irritation');
    }

    if (preferences.skincareNeeds.includes('alcohol-free') && 
        (ingredient.name.toLowerCase().includes('denatured alcohol') ||
         ingredient.name.toLowerCase().includes('ethanol') ||
         ingredient.name.toLowerCase().includes('isopropyl alcohol'))) {
      allowed = false;
      reasons.push('Contains drying alcohol');
    }

    // Check lifestyle preferences
    if (preferences.avoidIngredients.includes('paraben-free') && 
        ingredient.name.toLowerCase().includes('paraben')) {
      allowed = false;
      reasons.push('Contains parabens');
    }

    if (preferences.avoidIngredients.includes('msg-free') && 
        (ingredient.name.toLowerCase().includes('msg') || 
         ingredient.name.toLowerCase().includes('monosodium glutamate'))) {
      allowed = false;
      reasons.push('Contains MSG');
    }

    if (preferences.avoidIngredients.includes('artificial-free') && 
        ingredient.name.toLowerCase().includes('artificial')) {
      allowed = false;
      reasons.push('Contains artificial ingredients');
    }

    // Check age group suitability
    if (preferences.ageGroup === 'safe-for-kids' && 
        !ingredient.suitableFor?.includes('children')) {
      allowed = false;
      reasons.push('Not recommended for children');
    }

    if (preferences.ageGroup === 'pregnancy-safe' && 
        !ingredient.suitableFor?.includes('pregnancy')) {
      allowed = false;
      reasons.push('Not safe during pregnancy');
    }

    // Apply strictness level
    if (preferences.strictness === 'strict' && ingredient.riskLevel === 'MODERATE') {
      allowed = false;
      reasons.push('Moderate risk ingredients avoided (strict mode)');
    }

    return { allowed, reasons };
  }

  // Generate preference-based recommendations
  static generateRecommendations(
    ingredients: any[],
    preferences: UserPreferences
  ): string[] {
    const recommendations: string[] = [];
    const flaggedIngredients = ingredients.filter(ing => {
      const check = this.isIngredientAllowed(ing, preferences);
      return !check.allowed;
    });

    if (flaggedIngredients.length > 0) {
      recommendations.push(
        `⚠️ ${flaggedIngredients.length} ingredients don't match your preferences`
      );
    }

    if (preferences.dietaryRestrictions.includes('vegan')) {
      const nonVegan = ingredients.filter(ing => !ing.suitableFor?.includes('vegan'));
      if (nonVegan.length > 0) {
        recommendations.push('🌱 Consider vegan alternatives for better alignment');
      }
    }

    if (preferences.healthConditions.includes('diabetic')) {
      const highSugar = ingredients.filter(ing => 
        ing.name.toLowerCase().includes('sugar') || 
        ing.name.toLowerCase().includes('glucose')
      );
      if (highSugar.length > 0) {
        recommendations.push('🩺 High sugar content - monitor blood glucose levels');
      }
    }

    if (preferences.skincareNeeds.includes('sensitive-skin')) {
      recommendations.push('🌸 Look for "hypoallergenic" and "dermatologist-tested" labels');
    }

    if (preferences.skincareNeeds.includes('acne-prone')) {
      recommendations.push('🎯 Choose "non-comedogenic" products to prevent clogged pores');
    }

    if (preferences.skincareNeeds.includes('dry-skin')) {
      recommendations.push('💧 Look for hyaluronic acid, ceramides, and glycerin for hydration');
    }

    if (preferences.skincareNeeds.includes('anti-aging')) {
      recommendations.push('⏰ Consider products with retinol, vitamin C, and peptides');
    }

    if (preferences.avoidIngredients.includes('paraben-free')) {
      recommendations.push('🚫 Look for "paraben-free" labels on products');
    }

    if (preferences.preferredOrigins.includes('indian-origin')) {
      recommendations.push('🇮🇳 Choose products made in India when possible');
    }

    return recommendations;
  }
}