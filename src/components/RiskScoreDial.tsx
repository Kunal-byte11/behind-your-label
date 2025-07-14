import React from 'react';

interface RiskScoreDialProps {
  score: number;
  size?: number;
}

export const RiskScoreDial: React.FC<RiskScoreDialProps> = ({ 
  score, 
  size = 120 
}) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score <= 30) return '#4CAF50'; // Green
    if (score <= 70) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };
  
  const getScoreLabel = (score: number) => {
    if (score <= 30) return 'Good';
    if (score <= 70) return 'Moderate';
    return 'High Risk';
  };

  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth="6"
            fill="transparent"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            {score}
          </span>
          <span className="text-xs text-gray-600">
            /100
          </span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-sm font-medium" style={{ color }}>
          {label}
        </p>
        <p className="text-xs text-gray-500">
          Risk Score
        </p>
      </div>
    </div>
  );
};