import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { budgetTracker } from '../services/budgetTracker';

export const UsageIndicator: React.FC = () => {
  const [stats, setStats] = useState(budgetTracker.getUsageStats());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Update stats every 5 seconds
    const interval = setInterval(() => {
      setStats(budgetTracker.getUsageStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Show indicator when usage is above 50%
  useEffect(() => {
    setIsVisible(stats.percentageUsed > 50 || stats.remainingRequests <= 5);
  }, [stats]);

  if (!isVisible) return null;

  const getStatusColor = () => {
    if (stats.percentageUsed >= 90) return 'text-red-600 bg-red-50';
    if (stats.percentageUsed >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getStatusText = () => {
    if (stats.percentageUsed >= 90) return 'Almost at limit';
    if (stats.percentageUsed >= 70) return 'Getting close';
    return 'Usage tracking';
  };

  return (
    <Card className="fixed top-4 right-4 z-40 w-64 shadow-lg border hidden sm:block">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Free Usage</span>
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </Badge>
        </div>
        
        <div className="space-y-2">
          {/* Budget Progress */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Budget</span>
              <span>${stats.totalCost.toFixed(4)} / ${stats.budgetLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(stats.percentageUsed, 100)}%` }}
              />
            </div>
          </div>

          {/* Daily Requests */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Daily Scans</span>
              <span>{stats.requestCount} / {stats.dailyLimit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.requestCount / stats.dailyLimit) * 100}%` }}
              />
            </div>
          </div>

          {stats.remainingRequests <= 3 && (
            <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
              Only {stats.remainingRequests} scans left today!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};