export interface UserPreferences {
  dietaryRestrictions: string[];
  healthConditions: string[];
  avoidIngredients: string[];
  preferredOrigins: string[];
  ageGroup: string;
  language: 'english' | 'hindi' | 'hinglish';
  strictness: 'relaxed' | 'moderate' | 'strict';
}

export interface FilterOption {
  id: string;
  label: string;
  description: string;
  category: 'dietary' | 'health' | 'lifestyle' | 'origin' | 'age';
  icon?: string;
}

export const FILTER_OPTIONS: FilterOption[] = [
  // Dietary Restrictions
  {
    id: 'vegan',
    label: 'Vegan Only',
    description: 'No animal-derived ingredients',
    category: 'dietary',
    icon: '🌱'
  },
  {
    id: 'vegetarian',
    label: 'Vegetarian',
    description: 'No meat or fish ingredients',
    category: 'dietary',
    icon: '🥬'
  },
  {
    id: 'jain',
    label: 'Jain Diet',
    description: 'No root vegetables, strict vegetarian',
    category: 'dietary',
    icon: '🙏'
  },
  {
    id: 'halal',
    label: 'Halal Only',
    description: 'Islamic dietary guidelines',
    category: 'dietary',
    icon: '☪️'
  },
  {
    id: 'kosher',
    label: 'Kosher Only',
    description: 'Jewish dietary laws',
    category: 'dietary',
    icon: '✡️'
  },
  {
    id: 'gluten-free',
    label: 'Gluten-Free',
    description: 'No wheat, barley, rye',
    category: 'dietary',
    icon: '🌾'
  },
  {
    id: 'dairy-free',
    label: 'Dairy-Free',
    description: 'No milk or milk products',
    category: 'dietary',
    icon: '🥛'
  },
  {
    id: 'nut-free',
    label: 'Nut-Free',
    description: 'No tree nuts or peanuts',
    category: 'dietary',
    icon: '🥜'
  },

  // Health Conditions
  {
    id: 'diabetic',
    label: 'Diabetic-Friendly',
    description: 'Low sugar, controlled carbs',
    category: 'health',
    icon: '🩺'
  },
  {
    id: 'hypertension',
    label: 'Low Sodium',
    description: 'For high blood pressure',
    category: 'health',
    icon: '❤️'
  },
  {
    id: 'heart-healthy',
    label: 'Heart Healthy',
    description: 'Low saturated fat, no trans fat',
    category: 'health',
    icon: '💓'
  },
  {
    id: 'kidney-friendly',
    label: 'Kidney-Friendly',
    description: 'Low potassium, phosphorus',
    category: 'health',
    icon: '🫘'
  },
  {
    id: 'thyroid-friendly',
    label: 'Thyroid-Friendly',
    description: 'Iodine considerations',
    category: 'health',
    icon: '🦋'
  },

  // Lifestyle Preferences
  {
    id: 'paraben-free',
    label: 'Paraben-Free',
    description: 'No parabens or preservatives',
    category: 'lifestyle',
    icon: '🚫'
  },
  {
    id: 'artificial-free',
    label: 'No Artificial Colors',
    description: 'Natural colors only',
    category: 'lifestyle',
    icon: '🎨'
  },
  {
    id: 'preservative-free',
    label: 'Preservative-Free',
    description: 'No chemical preservatives',
    category: 'lifestyle',
    icon: '🌿'
  },
  {
    id: 'msg-free',
    label: 'MSG-Free',
    description: 'No monosodium glutamate',
    category: 'lifestyle',
    icon: '🧂'
  },
  {
    id: 'organic',
    label: 'Organic Preferred',
    description: 'Organic ingredients preferred',
    category: 'lifestyle',
    icon: '🌱'
  },

  // Origin Preferences
  {
    id: 'indian-origin',
    label: 'Indian Origin',
    description: 'Made in India preferred',
    category: 'origin',
    icon: '🇮🇳'
  },
  {
    id: 'local-sourced',
    label: 'Locally Sourced',
    description: 'Regional ingredients',
    category: 'origin',
    icon: '🏘️'
  },

  // Age Groups
  {
    id: 'safe-for-kids',
    label: 'Safe for Kids',
    description: 'Child-friendly ingredients',
    category: 'age',
    icon: '🧒'
  },
  {
    id: 'pregnancy-safe',
    label: 'Pregnancy Safe',
    description: 'Safe during pregnancy',
    category: 'age',
    icon: '🤱'
  },
  {
    id: 'elderly-friendly',
    label: 'Elderly-Friendly',
    description: 'Easy to digest, low sodium',
    category: 'age',
    icon: '👴'
  }
];

export const DEFAULT_PREFERENCES: UserPreferences = {
  dietaryRestrictions: [],
  healthConditions: [],
  avoidIngredients: [],
  preferredOrigins: [],
  ageGroup: 'general',
  language: 'english',
  strictness: 'moderate'
};