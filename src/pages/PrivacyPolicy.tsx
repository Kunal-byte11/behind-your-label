import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const PrivacyPolicy: React.FC = () => {
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
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2 font-body">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Information We Collect</h2>
              <div className="space-y-3 font-body">
                <p>Behind Your Label collects minimal information to provide our ingredient analysis service:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Images you upload for ingredient analysis</li>
                  <li>Text input for manual ingredient entry</li>
                  <li>Usage analytics to improve our service</li>
                  <li>Device information for technical optimization</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">How We Use Your Information</h2>
              <div className="space-y-3 font-body">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Analyze product labels and ingredients using AI</li>
                  <li>Provide health insights based on FSSAI guidelines</li>
                  <li>Improve our AI models and service quality</li>
                  <li>Display relevant advertisements through Google AdSense</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Data Storage and Security</h2>
              <div className="space-y-3 font-body">
                <p>We prioritize your privacy and data security:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Images are processed temporarily and not permanently stored</li>
                  <li>Usage data is stored locally on your device</li>
                  <li>We use industry-standard encryption for data transmission</li>
                  <li>No personal information is shared with third parties except as required by law</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Third-Party Services</h2>
              <div className="space-y-3 font-body">
                <p>Our service integrates with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Google Gemini AI:</strong> For ingredient analysis and health insights</li>
                  <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
                  <li><strong>Netlify:</strong> For hosting and content delivery</li>
                </ul>
                <p>These services have their own privacy policies which we encourage you to review.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Cookies and Tracking</h2>
              <div className="space-y-3 font-body">
                <p>We use cookies and similar technologies for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Remembering your preferences</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Advertising personalization (Google AdSense)</li>
                </ul>
                <p>You can control cookie settings through your browser preferences.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Your Rights</h2>
              <div className="space-y-3 font-body">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your personal data</li>
                  <li>Request data deletion</li>
                  <li>Opt-out of data collection</li>
                  <li>Update your information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Contact Us</h2>
              <div className="font-body">
                <p>For privacy-related questions or concerns, contact us at:</p>
                <p className="mt-2">
                  <strong>Email:</strong> privacy@behindyourlabel.com<br />
                  <strong>Address:</strong> India
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 font-heading">Changes to This Policy</h2>
              <div className="font-body">
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date.</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};