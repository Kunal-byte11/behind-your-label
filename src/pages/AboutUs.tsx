import React from 'react';
import { ArrowLeft, Heart, Shield, Users, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 font-heading">
            About Behind Your Label
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            Empowering Indian consumers with AI-powered ingredient insights
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 font-heading">Our Mission</h2>
              <p className="text-gray-700 font-body leading-relaxed">
                Behind Your Label was created to help Indian consumers make informed food choices. 
                With rising health concerns and complex ingredient lists, we believe everyone deserves 
                to understand what they're eating. Our AI-powered platform decodes food labels, 
                providing health insights based on FSSAI guidelines and traditional Ayurvedic wisdom.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Shield className="w-5 h-5 text-blue-500" />
                  FSSAI Compliant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-body">
                  Our analysis is based on Indian food safety standards and FSSAI regulations, 
                  ensuring relevant and accurate health insights for Indian consumers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Zap className="w-5 h-5 text-green-500" />
                  AI-Powered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-body">
                  Using advanced AI technology, we can analyze product labels instantly, 
                  decode scientific names, and provide personalized health recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Heart className="w-5 h-5 text-red-500" />
                  Health-Focused
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-body">
                  We consider Indian health concerns like diabetes prevalence, skin sensitivity, 
                  and dietary restrictions to provide relevant health insights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading">
                  <Users className="w-5 h-5 text-purple-500" />
                  Community-Driven
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-body">
                  Built for the Indian community, supporting multiple languages and 
                  cultural dietary preferences including Jain, vegan, and regional cuisines.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 font-heading">How It Works</h2>
              <div className="space-y-4 font-body">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                  <div>
                    <h3 className="font-medium">Scan or Type</h3>
                    <p className="text-gray-600">Upload a photo of the ingredient list or type ingredients manually</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">2</div>
                  <div>
                    <h3 className="font-medium">AI Analysis</h3>
                    <p className="text-gray-600">Our AI analyzes each ingredient for health impact, allergens, and FSSAI compliance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">3</div>
                  <div>
                    <h3 className="font-medium">Get Insights</h3>
                    <p className="text-gray-600">Receive detailed health insights, risk scores, and personalized recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4 font-heading">Why We Built This</h2>
              <div className="space-y-4 font-body">
                <p className="text-gray-700">
                  As health-conscious consumers ourselves, we noticed how difficult it was to understand 
                  complex ingredient lists. Terms like "E621" or "Sodium Benzoate" mean nothing to most people, 
                  yet these ingredients can significantly impact our health.
                </p>
                <p className="text-gray-700">
                  We wanted to create a tool that bridges this knowledge gap, making food transparency 
                  accessible to everyone. By combining AI technology with Indian health standards and 
                  traditional wisdom, we're helping people make better food choices for themselves and their families.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 font-heading">Support Our Mission</h2>
              <p className="text-gray-700 mb-6 font-body">
                Behind Your Label is free to use, but running AI analysis costs money. 
                Your support helps us keep this service available for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://buymeacoffee.com/behindyourlabel', '_blank')}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Support Us
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('mailto:hello@behindyourlabel.com', '_blank')}
                >
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};