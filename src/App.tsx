import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Camera, FileText, ArrowLeft, Loader2, Filter } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { IngredientInput } from './components/IngredientInput';
import { IngredientCard } from './components/IngredientCard';
import { RiskScoreDial } from './components/RiskScoreDial';
import { IngredientDetailModal } from './components/IngredientDetailModal';
import { SarthiChat } from './components/SarthiChat';
import { UsageIndicator } from './components/UsageIndicator';
import { BudgetExceededModal } from './components/BudgetExceededModal';
import { PreferencesButton } from './components/PreferencesButton';
import { FilteredResults } from './components/FilteredResults';
import { AdPlacement } from './components/AdPlacement';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { geminiService } from './services/geminiService';
import { PreferencesService } from './services/preferencesService';
import { Ingredient, AnalysisResult } from './types/ingredient';
import { UserPreferences } from './types/preferences';

// Import pages
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { AboutUs } from './pages/AboutUs';

type InputMode = 'image' | 'text';
type AppState = 'input' | 'results';

const MainApp: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>('image');
  const [appState, setAppState] = useState<AppState>('input');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgetError, setBudgetError] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(
    PreferencesService.loadPreferences()
  );
  const [showFilteredView, setShowFilteredView] = useState(false);

  const handleImageAnalysis = async (imageFile: File) => {
    setIsLoading(true);
    setBudgetError(null);
    
    try {
      const result = await geminiService.analyzeProductLabel(imageFile);
      setAnalysisResult(result);
      setAppState('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('💰') || error.message.includes('📊')) {
          setBudgetError(error.message);
        } else if (error.message.includes('taking too long')) {
          alert('Analysis timed out. Please try again with a clearer image.');
        } else {
          alert('Failed to analyze image. Please try again.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAnalysis = async (ingredientText: string) => {
    setIsLoading(true);
    setBudgetError(null);
    
    try {
      const result = await geminiService.analyzeIngredients(ingredientText);
      setAnalysisResult(result);
      setAppState('results');
    } catch (error) {
      console.error('Analysis failed:', error);
      
      if (error instanceof Error && (error.message.includes('💰') || error.message.includes('📊'))) {
        setBudgetError(error.message);
      } else {
        alert('Failed to analyze ingredients. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  const handleBackToInput = () => {
    setAppState('input');
    setAnalysisResult(null);
    setSelectedImage(null);
  };

  const renderInputScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Header Ad - Only show on larger screens */}
        <div className="mb-6 hidden sm:block">
          <AdPlacement position="header" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <PreferencesButton 
              onPreferencesChange={setUserPreferences}
              className="relative"
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-heading">
            Behind Your Label
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-body px-2">
            Decode ingredients with AI-powered insights for Indian consumers
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm relative overflow-hidden">
          {/* Animated background slider */}
          <div 
            className={`absolute top-1 bottom-1 bg-blue-500 rounded-md transition-all duration-300 ease-in-out ${
              inputMode === 'image' ? 'left-1 right-1/2 mr-0.5' : 'right-1 left-1/2 ml-0.5'
            }`}
          />
          <Button
            variant={inputMode === 'image' ? 'default' : 'ghost'}
            onClick={() => setInputMode('image')}
            className={`flex-1 flex items-center justify-center gap-2 text-sm py-3 min-h-[48px] relative z-10 transition-all duration-300 ${
              inputMode === 'image' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <Camera className={`w-4 h-4 transition-transform duration-200 ${inputMode === 'image' ? 'scale-110' : ''}`} />
            <span>Scan Label</span>
          </Button>
          <Button
            variant={inputMode === 'text' ? 'default' : 'ghost'}
            onClick={() => setInputMode('text')}
            className={`flex-1 flex items-center justify-center gap-2 text-sm py-3 min-h-[48px] relative z-10 transition-all duration-300 ${
              inputMode === 'text' ? 'text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <FileText className={`w-4 h-4 transition-transform duration-200 ${inputMode === 'text' ? 'scale-110' : ''}`} />
            <span>Type Ingredients</span>
          </Button>
        </div>

        {/* Input Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {inputMode === 'image' ? (
              <div className="space-y-4">
                <ImageUpload
                  onImageSelect={setSelectedImage}
                  isLoading={isLoading}
                  selectedImage={selectedImage}
                  onClearImage={() => setSelectedImage(null)}
                />
                {selectedImage && (
                  <Button
                    onClick={() => handleImageAnalysis(selectedImage)}
                    disabled={isLoading}
                    className="w-full bg-[#03A9F4] hover:bg-[#0288D1] text-white py-3 min-h-[48px]"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Analyze Product Label
                      </>
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <IngredientInput
                onAnalyze={handleTextAnalysis}
                isLoading={isLoading}
              />
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 font-heading mb-2">Smart OCR</h3>
            <p className="text-sm text-gray-600 font-body">Extract ingredients from any product label</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 font-heading mb-2">FSSAI Compliant</h3>
            <p className="text-sm text-gray-600 font-body">Based on Indian food safety standards</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">AI</span>
            </div>
            <h3 className="font-medium text-gray-900 font-heading mb-2">Ask Sarthi</h3>
            <p className="text-sm text-gray-600 font-body">Chat with AI in Hindi/English</p>
          </div>
        </div>

        {/* Footer Ad - Only show on larger screens */}
        <div className="hidden sm:block">
          <AdPlacement position="footer" />
        </div>
      </div>
    </div>
  );

  const renderResultsScreen = () => {
    if (!analysisResult) return null;

    // Generate preference-based recommendations
    const preferenceRecommendations = PreferencesService.generateRecommendations(
      analysisResult.ingredients,
      userPreferences
    );

    // Combine original recommendations with preference-based ones
    const allRecommendations = [
      ...analysisResult.recommendations,
      ...preferenceRecommendations
    ];
    return (
      <div className="min-h-screen bg-[#F9F9F9]">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="w-full max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={handleBackToInput}
                className="p-2 min-h-[44px]"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-heading">
                  Analysis Results
                </h1>
                <p className="text-sm text-gray-600 font-body">
                  {analysisResult.ingredients.length} ingredients analyzed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Risk Score */}
            <div className="lg:col-span-1">
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <CardTitle className="text-center font-heading">Overall Risk Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <RiskScoreDial score={analysisResult.overallRiskScore} />
                  
                  {analysisResult.keyWarnings.length > 0 && (
                    <div className="mt-4 w-full">
                      <h4 className="font-medium text-gray-900 mb-2 font-heading">Key Warnings:</h4>
                      <div className="space-y-1">
                        {analysisResult.keyWarnings.map((warning, index) => (
                          <Badge key={index} variant="destructive" className="text-xs block w-full text-center">
                            {warning}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysisResult.recommendations.length > 0 && (
                    <div className="mt-4 w-full">
                      <h4 className="font-medium text-gray-900 mb-2 font-heading">Recommendations:</h4>
                      <div className="space-y-1">
                        {analysisResult.recommendations.map((rec, index) => (
                          <p key={index} className="text-xs text-gray-600 font-body">
                            • {rec}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sidebar Ad - Hidden on mobile */}
              <div className="mt-6 hidden lg:block">
                <AdPlacement position="sidebar" />
              </div>
            </div>

            {/* Ingredients List */}
            <div className="lg:col-span-3">
              {/* View Toggle */}
              <div className="flex gap-1 sm:gap-2 mb-4 bg-gray-100 p-1 rounded-lg relative overflow-hidden">
                {/* Animated background for view toggle */}
                <div 
                  className={`absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out ${
                    !showFilteredView ? 'left-1 right-1/2 mr-0.5' : 'right-1 left-1/2 ml-0.5'
                  }`}
                />
                <Button
                  variant={!showFilteredView ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowFilteredView(false)}
                  className={`flex items-center gap-1 sm:gap-2 relative z-10 transition-all duration-300 flex-1 justify-center text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[44px] ${
                    !showFilteredView ? 'text-gray-900 shadow-none bg-transparent hover:bg-transparent' : 'text-gray-600 bg-transparent border-0 hover:text-gray-900'
                  }`}
                >
                  <span>All Ingredients</span>
                </Button>
                <Button
                  variant={showFilteredView ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowFilteredView(true)}
                  className={`flex items-center gap-1 sm:gap-2 relative z-10 transition-all duration-300 flex-1 justify-center text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[44px] ${
                    showFilteredView ? 'text-gray-900 shadow-none bg-transparent hover:bg-transparent' : 'text-gray-600 bg-transparent border-0 hover:text-gray-900'
                  }`}
                >
                  <Filter className={`w-4 h-4 transition-transform duration-200 ${showFilteredView ? 'scale-110' : ''}`} />
                  <span className="hidden sm:inline">Filtered View</span>
                  <span className="sm:hidden">Filtered</span>
                </Button>
              </div>

              {showFilteredView ? (
                <FilteredResults
                  ingredients={analysisResult.ingredients}
                  preferences={userPreferences}
                  onIngredientClick={handleIngredientClick}
                />
              ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Ingredients Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.ingredients.map((ingredient, index) => (
                      <React.Fragment key={index}>
                        <IngredientCard
                          ingredient={ingredient}
                          onClick={() => handleIngredientClick(ingredient)}
                        />
                        
                        {/* Ad between results every 3 ingredients - Only on larger screens */}
                        {(index + 1) % 3 === 0 && index < analysisResult.ingredients.length - 1 && (
                          <div className="hidden sm:block">
                            <AdPlacement position="between-results" />
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {appState === 'input' ? renderInputScreen() : renderResultsScreen()}
      
      <IngredientDetailModal
        ingredient={selectedIngredient}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <SarthiChat
        ingredients={analysisResult?.ingredients}
       userPreferences={Object.values(userPreferences).flat()}
        preferences={userPreferences}
      />

      <UsageIndicator />

      <BudgetExceededModal
        isOpen={!!budgetError}
        onClose={() => setBudgetError(null)}
        message={budgetError || ''}
      />

      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;