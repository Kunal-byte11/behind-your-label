import React, { useState, useEffect } from 'react';
import { Settings, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PreferencesModal } from './PreferencesModal';
import { PreferencesService } from '../services/preferencesService';
import { UserPreferences } from '../types/preferences';

interface PreferencesButtonProps {
  onPreferencesChange?: (preferences: UserPreferences) => void;
  className?: string;
}

export const PreferencesButton: React.FC<PreferencesButtonProps> = ({
  onPreferencesChange,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(
    PreferencesService.loadPreferences()
  );

  const getActiveFiltersCount = () => {
    return preferences.dietaryRestrictions.length + 
           preferences.healthConditions.length + 
           preferences.skincareNeeds.length +
           preferences.avoidIngredients.length + 
           preferences.preferredOrigins.length +
           (preferences.ageGroup !== 'general' ? 1 : 0);
  };

  const handleSavePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    onPreferencesChange?.(newPreferences);
  };

  const activeCount = getActiveFiltersCount();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-2 relative transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md ${className}`}
      >
        <Settings className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />
        <span className="hidden sm:inline">Preferences</span>
        <span className="sm:hidden">
          <Filter className="w-4 h-4" />
        </span>
        
        {activeCount > 0 && (
          <Badge 
            variant="secondary" 
            className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-pulse"
          >
            {activeCount}
          </Badge>
        )}
      </Button>

      <PreferencesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePreferences}
      />
    </>
  );
};