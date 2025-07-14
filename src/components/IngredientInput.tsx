import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface IngredientInputProps {
  onAnalyze: (ingredients: string) => void;
  isLoading?: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  onAnalyze,
  isLoading = false
}) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onAnalyze(ingredients.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Ingredients List
        </label>
        <Textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients separated by commas (e.g., Sugar, Salt, Citric Acid, Natural Flavors...)"
          className="min-h-[100px] resize-none"
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Copy ingredients from product packaging or type them manually
        </p>
      </div>
      
      <Button
        type="submit"
        disabled={!ingredients.trim() || isLoading}
        className="w-full bg-[#03A9F4] hover:bg-[#0288D1] text-white"
      >
        <Search className="w-4 h-4 mr-2" />
        {isLoading ? 'Analyzing...' : 'Analyze Ingredients'}
      </Button>
    </form>
  );
};