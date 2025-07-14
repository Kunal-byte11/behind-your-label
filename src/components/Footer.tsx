import React from 'react';
import { Heart, Mail, Shield, FileText, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 font-heading">Behind Your Label</h3>
            <p className="text-gray-300 mb-4 font-body">
              AI-powered ingredient analysis for Indian consumers. 
              Decode food labels with FSSAI compliance and health insights.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Made with love for healthier India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2 font-body">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 font-heading">Contact</h4>
            <ul className="space-y-2 font-body">
              <li>
                <a 
                  href="mailto:hello@behindyourlabel.com" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  hello@behindyourlabel.com
                </a>
              </li>
              <li>
                <a 
                  href="https://buymeacoffee.com/behindyourlabel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Support Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm font-body">
            © {currentYear} Behind Your Label. All rights reserved. | 
            Made for Indian consumers with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};