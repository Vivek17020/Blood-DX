
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BloodTestForm from '@/components/BloodTestForm';
import PredictionResult from '@/components/PredictionResult';
import HealthTips from '@/components/HealthTips';
import { BloodTestValues, Prediction } from '@/types';
import { generatePredictions } from '@/utils/mockPredictions';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const handleFormSubmit = (values: BloodTestValues) => {
    // Check for minimum required values
    const requiredFields = ['glucose', 'hemoglobin', 'creatinine'];
    const missingFields = requiredFields.filter(field => !values[field as keyof BloodTestValues]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing values",
        description: `Please provide values for: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    // Use real prediction function instead of mock data
    const newPredictions = generatePredictions(values);
    
    // Show success message
    toast({
      title: "Analysis complete",
      description: "Your blood test values have been analyzed successfully.",
    });
    
    // Set predictions and show results
    setPredictions(newPredictions);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      window.scrollTo({
        top: 400,
        behavior: 'smooth'
      });
    }, 500);
  };
  
  const handleStartOver = () => {
    setShowResults(false);
    setPredictions(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatClick = () => {
    navigate('/chat', { state: { predictions } });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero section */}
        {!showResults && (
          <section className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-blood-blue mb-3">Blood-DX</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              AI-powered blood test analysis for early disease detection and health monitoring
            </p>
            
          </section>
        )}
        
        {/* Blood test form */}
        {!showResults ? (
          <BloodTestForm onSubmit={handleFormSubmit} />
        ) : (
          <>
            {predictions && (
              <div className="space-y-8">
                <PredictionResult predictions={predictions} />
                <HealthTips predictions={predictions} />
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
                  <Button 
                    onClick={handleChatClick}
                    variant="default"
                    className="bg-blood-blue hover:bg-blood-blue/90"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with AI Assistant
                  </Button>
                  
                  <button 
                    onClick={handleStartOver}
                    className="text-blood-blue hover:underline mt-2 sm:mt-0"
                  >
                    ↩ Start Over with New Values
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Features section - only show on landing page */}
        {!showResults && (
          <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blood-blue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                🔍
              </div>
              <h3 className="text-lg font-semibold mb-2">Early Detection</h3>
              <p className="text-gray-600">
                Detect potential health issues before they become serious with our advanced AI analysis.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blood-blue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                📊
              </div>
              <h3 className="text-lg font-semibold mb-2">Visual Insights</h3>
              <p className="text-gray-600">
                Get easy-to-understand visual representations of your health metrics and risk factors.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blood-blue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                💡
              </div>
              <h3 className="text-lg font-semibold mb-2">Actionable Advice</h3>
              <p className="text-gray-600">
                Receive personalized health tips and recommendations based on your unique test results.
              </p>
            </div>
          </section>
        )}

        {/* Chat button on mobile - only show when results are visible */}
        {showResults && predictions && (
          <div className="md:hidden fixed bottom-5 right-5 z-50">
            <Button 
              onClick={handleChatClick}
              size="icon" 
              className="h-12 w-12 rounded-full bg-blood-blue shadow-lg hover:bg-blood-blue/90"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </div>
        )}
      </main>
      
      <footer className="bg-white mt-16 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © 2025 Blood-DX. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Not a substitute for professional medical advice.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/about" className="text-gray-500 hover:text-blood-blue text-sm">About</Link>
              <Link to="/history" className="text-gray-500 hover:text-blood-blue text-sm">History</Link>
              <Link to="/help" className="text-gray-500 hover:text-blood-blue text-sm">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
