import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Ingredient } from '../types/ingredient';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface IngredientCardProps {
  ingredient: Ingredient;
  onClick?: () => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  onClick
}) => {
  const getRiskConfig = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          color: '#F44336',
          bgColor: '#FFEBEE',
          icon: XCircle,
          label: 'Avoid',
          borderColor: 'border-l-red-500'
        };
      case 'MODERATE':
        return {
          color: '#FF9800',
          bgColor: '#FFF3E0',
          icon: AlertTriangle,
          label: 'Caution',
          borderColor: 'border-l-orange-500'
        };
      default:
        return {
          color: '#4CAF50',
          bgColor: '#E8F5E8',
          icon: CheckCircle,
          label: 'Safe',
          borderColor: 'border-l-green-500'
        };
    }
  };

  const config = getRiskConfig(ingredient.riskLevel);
  const Icon = config.icon;

  return (
    <Card 
      className={`
        bg-[#F9F9F9] border-l-4 ${config.borderColor} cursor-pointer 
        hover:shadow-md transition-shadow duration-200
      `}
      onClick={onClick}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: config.bgColor }}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: config.color }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                  {ingredient.name}
                </h3>
                {ingredient.hindiName && (
                  <p className="text-xs text-gray-600 mt-1">
                    {ingredient.hindiName}
                  </p>
                )}
              </div>
              
              <Badge 
                variant="outline"
                className="text-xs font-medium border-0 px-2 py-1 flex-shrink-0"
                style={{ 
                  backgroundColor: config.bgColor,
                  color: config.color 
                }}
              >
                {config.label}
              </Badge>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-2">
              {ingredient.explanation}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {ingredient.fssaiWarning && (
                <div className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-orange-500" />
                  <span className="text-xs text-orange-600 font-medium">
                    FSSAI Warning
                  </span>
                </div>
              )}
              
              {ingredient.allergenInfo && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Allergen: {ingredient.allergenInfo}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};