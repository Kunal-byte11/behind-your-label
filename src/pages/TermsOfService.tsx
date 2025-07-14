import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export const TermsOfService: React.FC = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Acceptance of Terms</h2>
              <div className="font-body">
                <p>By accessing and using Behind Your Label, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Service Description</h2>
              <div className="space-y-3 font-body">
                <p>Behind Your Label is an AI-powered ingredient analysis service that:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Analyzes food product labels and ingredients</li>
                  <li>Provides health insights based on FSSAI guidelines</li>
                  <li>Offers Ayurvedic perspectives on ingredients</li>
                  <li>Identifies potential allergens and health risks</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Disclaimer</h2>
              <div className="space-y-3 font-body">
                <p><strong>Important:</strong> Our service is for informational purposes only and should not replace professional medical advice.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Always consult healthcare professionals for medical decisions</li>
                  <li>AI analysis may contain errors or inaccuracies</li>
                  <li>We are not responsible for health outcomes based on our analysis</li>
                  <li>Individual health conditions may require specific dietary considerations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">User Responsibilities</h2>
              <div className="space-y-3 font-body">
                <p>Users agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the service responsibly and legally</li>
                  <li>Not upload inappropriate or harmful content</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to reverse engineer or misuse the service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Intellectual Property</h2>
              <div className="font-body">
                <p>All content, features, and functionality of Behind Your Label are owned by us and are protected by copyright, trademark, and other intellectual property laws.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Limitation of Liability</h2>
              <div className="font-body">
                <p>Behind Your Label shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Governing Law</h2>
              <div className="font-body">
                <p>These terms shall be governed by and construed in accordance with the laws of India.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Contact Information</h2>
              <div className="font-body">
                <p>For questions about these Terms of Service, contact us at:</p>
                <p className="mt-2">
                  <strong>Email:</strong> legal@behindyourlabel.com<br />
                  <strong>Address:</strong> India
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};