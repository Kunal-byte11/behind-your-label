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
           preferences.avoidIngredients.length + 
           preferences.preferredOrigins.length +
           (preferences.ageGroup !== 'general' ? 1 : 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading">
            <Settings className="w-5 h-5 text-blue-500" />
            Personalize Your Experience
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getActiveFiltersCount()} active
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[60vh]">
          {/* Category Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-1 whitespace-nowrap transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                <span className="transition-transform duration-200">{category.icon}</span>
                <span className="hidden sm:inline">{category.label}</span>
              </Button>
            ))}
          </div>

          {/* Filters Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in-50 duration-500">
              {FILTER_OPTIONS
                .filter(option => option.category === activeCategory)
                .map((option) => {
                  const isActive = isFilterActive(option.id, option.category);
                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200' 
                          : 'hover:border-gray-300 hover:shadow-md hover:bg-gray-50'
                      }`}
                      onClick={() => handleToggleFilter(option.id, option.category)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl transition-transform duration-200 hover:scale-110">{option.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 font-heading">
                              {option.label}
                            </h3>
                            <p className="text-sm text-gray-600 font-body">
                              {option.description}
                            </p>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-300">
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
          <Card className="mt-4 animate-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Filter Strictness</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
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
                    className="flex-1 flex flex-col items-center p-2 h-auto transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                  >
                    <span className="font-medium">{level.label}</span>
                    <span className="text-xs opacity-70">{level.desc}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t animate-in slide-in-from-bottom-2 duration-700">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2 transition-all duration-200 hover:shadow-lg">
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};