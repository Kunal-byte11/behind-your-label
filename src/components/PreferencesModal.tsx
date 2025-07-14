import React, { useState, useEffect } from 'react';
import { Settings, X, Save, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { UserPreferences, FILTER_OPTIONS, DEFAULT_PREFERENCES } from '../types/preferences';
import { PreferencesService } from '../services/preferencesService';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: UserPreferences) => void;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [activeCategory, setActiveCategory] = useState<string>('dietary');

  useEffect(() => {
    if (isOpen) {
      const loaded = PreferencesService.loadPreferences();
      setPreferences(loaded);
    }
  }, [isOpen]);

  const categories = [
    { id: 'dietary', label: 'Dietary', icon: '🥗' },
    { id: 'health', label: 'Health', icon: '🩺' },
    { id: 'skincare', label: 'Skincare', icon: '🧴' },
    { id: 'lifestyle', label: 'Lifestyle', icon: '🌿' },
    { id: 'origin', label: 'Origin', icon: '🌍' },
    { id: 'age', label: 'Age Group', icon: '👥' }
  ];

  const handleToggleFilter = (filterId: string, category: string) => {
    setPreferences(prev => {
      const newPrefs = { ...prev };
      
      switch (category) {
        case 'dietary':
          if (prev.dietaryRestrictions.includes(filterId)) {
            newPrefs.dietaryRestrictions = prev.dietaryRestrictions.filter(id => id !== filterId);
          } else {
            newPrefs.dietaryRestrictions = [...prev.dietaryRestrictions, filterId];
          }
          break;
        case 'health':
          if (prev.healthConditions.includes(filterId)) {
            newPrefs.healthConditions = prev.healthConditions.filter(id => id !== filterId);
          } else {
            newPrefs.healthConditions = [...prev.healthConditions, filterId];
          }
          break;
        case 'skincare':
          if (prev.skincareNeeds.includes(filterId)) {
            newPrefs.skincareNeeds = prev.skincareNeeds.filter(id => id !== filterId);
          } else {
            newPrefs.skincareNeeds = [...prev.skincareNeeds, filterId];
          }
          break;
        case 'lifestyle':
          if (prev.avoidIngredients.includes(filterId)) {
            newPrefs.avoidIngredients = prev.avoidIngredients.filter(id => id !== filterId);
          } else {
            newPrefs.avoidIngredients = [...prev.avoidIngredients, filterId];
          }
          break;
        case 'origin':
          if (prev.preferredOrigins.includes(filterId)) {
            newPrefs.preferredOrigins = prev.preferredOrigins.filter(id => id !== filterId);
          } else {
            newPrefs.preferredOrigins = [...prev.preferredOrigins, filterId];
          }
          break;
        case 'age':
          newPrefs.ageGroup = filterId;
          break;
      }
      
      return newPrefs;
    });
  };

  const isFilterActive = (filterId: string, category: string): boolean => {
    switch (category) {
      case 'dietary':
        return preferences.dietaryRestrictions.includes(filterId);
      case 'health':
        return preferences.healthConditions.includes(filterId);
      case 'skincare':
        return preferences.skincareNeeds.includes(filterId);
      case 'lifestyle':
        return preferences.avoidIngredients.includes(filterId);
      case 'origin':
        return preferences.preferredOrigins.includes(filterId);
      case 'age':
        return preferences.ageGroup === filterId;
      default:
        return false;
    }
  };

  const handleSave = () => {
    PreferencesService.savePreferences(preferences);
    onSave(preferences);
    onClose();
  };

  const handleReset = () => {
    setPreferences(DEFAULT_PREFERENCES);
    PreferencesService.clearPreferences();
  };

  const getActiveFiltersCount = () => {
    return preferences.dietaryRestrictions.length + 
           preferences.healthConditions.length + 
           preferences.skincareNeeds.length +
           preferences.avoidIngredients.length + 
           preferences.preferredOrigins.length +
           (preferences.ageGroup !== 'general' ? 1 : 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-hidden mx-2">
        <DialogHeader>
          <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 font-heading text-lg sm:text-xl">
            <Settings className="w-5 h-5 text-blue-500" />
            <span>Personalize Your Experience</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[60vh] sm:h-[65vh]">
          {/* Category Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm" 
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-1 whitespace-nowrap transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 min-w-[80px] sm:min-w-[100px] justify-center text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[44px]"
              >
                <span className="transition-transform duration-200">{category.icon}</span>
                <span className="text-xs sm:text-sm">{category.label}</span>
              </Button>
            ))}
          </div>

          {/* Filters Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-3 sm:gap-4 animate-in fade-in-50 duration-500">
              {FILTER_OPTIONS
                .filter(option => option.category === activeCategory)
                .map((option) => {
                  const isActive = isFilterActive(option.id, option.category);
                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-200 min-h-[80px] sm:min-h-[90px] ${
                        isActive 
                          ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                          : 'hover:border-gray-300 hover:shadow-md hover:bg-gray-50'
                      }`}
                      onClick={() => handleToggleFilter(option.id, option.category)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-xl sm:text-2xl transition-transform duration-200 hover:scale-110 flex-shrink-0">{option.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 font-heading text-sm sm:text-base">
                              {option.label}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-body mt-1">
                              {option.description}
                            </p>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300 flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>

          {/* Strictness Level */}
          <Card className="mt-3 sm:mt-4 animate-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm sm:text-base font-heading">Filter Strictness</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <div className="flex gap-1 sm:gap-2">
                {[
                  { id: 'relaxed', label: 'Relaxed', desc: 'Allow moderate risk' },
                  { id: 'moderate', label: 'Moderate', desc: 'Balanced approach' },
                  { id: 'strict', label: 'Strict', desc: 'Only low risk' }
                ].map((level) => (
                  <Button
                    key={level.id}
                    variant={preferences.strictness === level.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPreferences(prev => ({ ...prev, strictness: level.id as any }))}
                    className="flex-1 flex flex-col items-center p-2 sm:p-3 h-auto transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 min-h-[60px] sm:min-h-[70px]"
                  >
                    <span className="font-medium text-xs sm:text-sm">{level.label}</span>
                    <span className="text-xs opacity-70 text-center leading-tight mt-1">{level.desc}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 pt-4 border-t animate-in slide-in-from-bottom-2 duration-700">
          <Button variant="outline" onClick={handleReset} className="flex items-center justify-center gap-2 min-h-[44px] order-2 sm:order-1">
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
          
          <div className="flex gap-2 order-1 sm:order-2">
            <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none min-h-[44px]">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 sm:flex-none flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg min-h-[44px]">
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};