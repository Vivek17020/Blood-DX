
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Prediction } from '@/types';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Download } from 'lucide-react';

interface PredictionResultProps {
  predictions: Prediction[];
}

const PredictionResult: React.FC<PredictionResultProps> = ({ predictions }) => {
  // Data for the pie chart
  const chartData = predictions.map(p => ({
    name: p.disease,
    value: p.confidence
  }));
  
  // Colors based on risk level
  const colors = {
    high: '#ef4444', // red
    moderate: '#f59e0b', // amber
    low: '#10b981', // green
  };
  
  // Format date for the report
  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const handleDownload = () => {
    alert('Report download functionality would be implemented here');
    // In a real app, this would generate and download a PDF report
  };
  
  const handleEmail = () => {
    alert('Email report functionality would be implemented here');
    // In a real app, this would prompt for an email and send the report
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Prediction Results</span>
          <span className="text-sm font-normal text-muted-foreground">{formattedDate}</span>
        </CardTitle>
        <CardDescription>
          Stay proactive! Here's what your blood report suggests.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall risk visualization */}
        <div className="mb-8">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => {
                    const prediction = predictions[index];
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={colors[prediction.riskLevel]} 
                      />
                    );
                  })}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Individual predictions */}
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{prediction.disease}</h3>
                <span 
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    prediction.riskLevel === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : prediction.riskLevel === 'moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)} Risk
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{prediction.description}</p>
              
              {/* Display key markers if available */}
              {prediction.markers && (
                <div className="mb-3 px-3 py-2 bg-gray-50 rounded text-xs">
                  {prediction.markers.hemoglobin !== undefined && (
                    <div className="flex justify-between">
                      <span>Hemoglobin:</span>
                      <span className="font-medium">{prediction.markers.hemoglobin} g/dL</span>
                    </div>
                  )}
                  {prediction.markers.glucose !== undefined && (
                    <div className="flex justify-between">
                      <span>Glucose:</span>
                      <span className="font-medium">{prediction.markers.glucose} mg/dL</span>
                    </div>
                  )}
                  {prediction.markers.creatinine !== undefined && (
                    <div className="flex justify-between">
                      <span>Creatinine:</span>
                      <span className="font-medium">{prediction.markers.creatinine} mg/dL</span>
                    </div>
                  )}
                  {prediction.markers.urea !== undefined && (
                    <div className="flex justify-between">
                      <span>Urea:</span>
                      <span className="font-medium">{prediction.markers.urea} mg/dL</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>Confidence</span>
                  <span className="font-medium">{prediction.confidence}%</span>
                </div>
                <Progress 
                  value={prediction.confidence} 
                  className={`${
                    prediction.riskLevel === 'high' 
                      ? 'bg-red-100' 
                      : prediction.riskLevel === 'moderate'
                        ? 'bg-amber-100'
                        : 'bg-green-100'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-3 border-t pt-4">
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" onClick={handleEmail}>
          Email Report
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PredictionResult;
