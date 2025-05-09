
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Prediction } from '@/types';
import { getTipsForDisease } from '@/utils/mockPredictions';

interface HealthTipsProps {
  predictions: Prediction[];
}

const HealthTips: React.FC<HealthTipsProps> = ({ predictions }) => {
  // Get the highest risk prediction
  const highestRiskPrediction = predictions.sort((a, b) => {
    const riskOrder = { high: 3, moderate: 2, low: 1 };
    return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
  })[0];
  
  // Get tips for the highest risk disease
  const tips = getTipsForDisease(highestRiskPrediction.disease);
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader className="bg-blood-light">
        <CardTitle className="text-blood-blue">
          Health Recommendations
        </CardTitle>
        <CardDescription>
          Based on your {highestRiskPrediction.disease} indicators
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex">
              <span className="mr-2 flex-shrink-0 bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Important:</span> These recommendations are generated based on your test results and should not replace professional medical advice. Please consult with your healthcare provider for personalized guidance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTips;
