import React from 'react';
import { AlertTriangle, CheckCircle, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Ingredient } from '../types/ingredient';
import { UserPreferences } from '../types/preferences';
import { PreferencesService } from '../services/preferencesService';

interface FilteredResultsProps {
  ingredients: Ingredient[];
  preferences: UserPreferences;
  onIngredientClick: (ingredient: Ingredient) => void;
}

export const FilteredResults: React.FC<FilteredResultsProps> = ({
  ingredients,
  preferences,
  onIngredientClick
}) => {
  const getFilteredIngredients = () => {
    return ingredients.map(ingredient => {
      const check = PreferencesService.isIngredientAllowed(ingredient, preferences);
      return {
        ...ingredient,
        isAllowed: check.allowed,
        filterReasons: check.reasons
      };
    });
  };

  const filteredIngredients = getFilteredIngredients();
  const allowedIngredients = filteredIngredients.filter(ing => ing.isAllowed);
  const flaggedIngredients = filteredIngredients.filter(ing => !ing.isAllowed);

  if (allowedIngredients.length === 0 && flaggedIngredients.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Filter Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900 font-heading">
              Personalized Filter Results
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-700 font-body">
                {allowedIngredients.length} ingredients match your preferences
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-orange-700 font-body">
                {flaggedIngredients.length} ingredients flagged
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flagged Ingredients */}
      {flaggedIngredients.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-800 font-heading">
              <AlertTriangle className="w-5 h-5" />
              Ingredients That Don't Match Your Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {flaggedIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg border border-orange-200 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => onIngredientClick(ingredient)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 font-heading">
                        {ingredient.name}
                      </h4>
                      {ingredient.hindiName && (
                        <p className="text-sm text-gray-600 font-body">
                          {ingredient.hindiName}
                        </p>
                      )}
                      <div className="mt-2 space-y-1">
                        {ingredient.filterReasons.map((reason, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-orange-100 text-orange-700 border-orange-300"
                          >
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-orange-100 text-orange-700 border-orange-300"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Avoid
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Allowed Ingredients */}
      {allowedIngredients.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800 font-heading">
              <CheckCircle className="w-5 h-5" />
              Ingredients That Match Your Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allowedIngredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-lg border border-green-200 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => onIngredientClick(ingredient)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 font-heading">
                        {ingredient.name}
                      </h4>
                      {ingredient.hindiName && (
                        <p className="text-sm text-gray-600 font-body">
                          {ingredient.hindiName}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 border-green-300"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      OK
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};