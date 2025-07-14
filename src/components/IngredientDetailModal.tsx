import React from 'react';
import { X, AlertTriangle, CheckCircle, XCircle, Heart, Baby, Leaf } from 'lucide-react';
import { Ingredient } from '../types/ingredient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { AdPlacement } from './AdPlacement';

interface IngredientDetailModalProps {
  ingredient: Ingredient | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IngredientDetailModal: React.FC<IngredientDetailModalProps> = ({
  ingredient,
  isOpen,
  onClose
}) => {
  if (!ingredient) return null;

  const getRiskConfig = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          color: '#F44336',
          bgColor: '#FFEBEE',
          icon: XCircle,
          label: 'High Risk - Avoid'
        };
      case 'MODERATE':
        return {
          color: '#FF9800',
          bgColor: '#FFF3E0',
          icon: AlertTriangle,
          label: 'Moderate Risk - Caution'
        };
      default:
        return {
          color: '#4CAF50',
          bgColor: '#E8F5E8',
          icon: CheckCircle,
          label: 'Low Risk - Safe'
        };
    }
  };

  const config = getRiskConfig(ingredient.riskLevel);
  const Icon = config.icon;

  const getSuitabilityIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'pregnancy': return Baby;
      case 'children': return Baby;
      case 'diabetic': return Heart;
      case 'vegan':
      case 'jain': return Leaf;
      default: return CheckCircle;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <Icon className="w-5 h-5" style={{ color: config.color }} />
            {ingredient.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Risk Level */}
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: config.bgColor }}
          >
            <p className="font-medium font-body" style={{ color: config.color }}>
              {config.label}
            </p>
          </div>

          {/* Ad in Modal */}
          <AdPlacement position="modal" />

          {/* Names */}
          <div className="space-y-2">
            {ingredient.hindiName && (
              <div>
                <p className="text-sm font-medium text-gray-600 font-heading">Hindi Name:</p>
                <p className="text-gray-900 font-body">{ingredient.hindiName}</p>
              </div>
            )}
            
            {ingredient.scientificName && (
              <div>
                <p className="text-sm font-medium text-gray-600 font-heading">Scientific Name:</p>
                <p className="text-gray-900 text-sm font-body">{ingredient.scientificName}</p>
              </div>
            )}
          </div>

          {/* What it does */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1 font-heading">What it does:</p>
            <p className="text-gray-900 text-sm font-body">{ingredient.explanation}</p>
          </div>

          {/* Health Impact */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1 font-heading">Health Impact:</p>
            <p className="text-gray-900 text-sm font-body">{ingredient.healthImpact}</p>
          </div>

          {/* FSSAI Warning */}
          {ingredient.fssaiWarning && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-800 mb-1 font-heading">FSSAI Warning:</p>
              <p className="text-orange-700 text-sm font-body">{ingredient.fssaiWarning}</p>
            </div>
          )}

          {/* Allergen Info */}
          {ingredient.allergenInfo && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 mb-1 font-heading">Allergen Information:</p>
              <p className="text-yellow-700 text-sm font-body">{ingredient.allergenInfo}</p>
            </div>
          )}

          {/* Ayurvedic View */}
          {ingredient.ayurvedicView && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800 mb-1 font-heading">Ayurvedic Perspective:</p>
              <p className="text-green-700 text-sm font-body">{ingredient.ayurvedicView}</p>
            </div>
          )}

          {/* Suitable For */}
          {ingredient.suitableFor.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2 font-heading">Suitable for:</p>
              <div className="flex flex-wrap gap-2">
                {ingredient.suitableFor.map((category) => {
                  const IconComponent = getSuitabilityIcon(category);
                  return (
                    <Badge
                      key={category}
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      <IconComponent className="w-3 h-3 mr-1" />
                      {category}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};