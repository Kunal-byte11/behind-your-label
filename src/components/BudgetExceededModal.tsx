import React from 'react';
import { Heart, Coffee, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface BudgetExceededModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const BudgetExceededModal: React.FC<BudgetExceededModalProps> = ({
  isOpen,
  onClose,
  message
}) => {
  const isDailyLimit = message.includes('daily');
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center">
            {isDailyLimit ? (
              <>
                <Zap className="w-5 h-5 text-orange-500" />
                Daily Limit Reached
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 text-red-500" />
                Support Needed
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-700 text-center">
            {message}
          </p>

          {!isDailyLimit && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Coffee className="w-8 h-8 text-green-600 mx-auto" />
                  <h3 className="font-semibold text-green-800">
                    Buy us a chai! ☕
                  </h3>
                  <p className="text-sm text-green-700">
                    Your support helps us keep Behind Your Label free for everyone
                  </p>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => window.open('https://buymeacoffee.com/behindyourlabel', '_blank')}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Support Us (₹50)
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('mailto:support@behindyourlabel.com', '_blank')}
                    >
                      Contact for Premium
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isDailyLimit && (
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Come back tomorrow for more free scans, or support us for unlimited access!
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://buymeacoffee.com/behindyourlabel', '_blank')}
              >
                <Zap className="w-4 h-4 mr-2" />
                Get Unlimited Access
              </Button>
            </div>
          )}

          <Button variant="ghost" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};