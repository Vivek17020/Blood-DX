
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import { useLocation, Link } from 'react-router-dom';
import { Prediction } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Chat = () => {
  const location = useLocation();
  const predictions = location.state?.predictions as Prediction[] | null;
  
  // Check if user has valid predictions
  const hasPredictions = predictions && predictions.length > 0;

  useEffect(() => {
    // Welcome toast when chat page loads
    if (hasPredictions) {
      toast({
        title: "Chat with Dr. AI",
        description: "Ask questions about your blood test results to better understand your health.",
      });
    }
  }, [hasPredictions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-center text-blood-blue mb-2 flex items-center justify-center">
            <MessageCircle className="h-7 w-7 mr-2" />
            Chat with Dr. AI Health Assistant
          </h1>
          <p className="text-gray-600 text-center max-w-xl mx-auto">
            {hasPredictions 
              ? "Ask questions about your blood test results, request health recommendations, or learn more about your condition." 
              : "Upload your blood test data first to get personalized assistance."}
          </p>
          
          {!hasPredictions && (
            <div className="mt-8 text-center">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-amber-600 mb-4 font-medium">No blood test data found</p>
                <p className="text-gray-700 mb-6">Please upload your blood test report or enter your values first to get personalized assistance.</p>
                <Link to="/">
                  <Button className="bg-blood-blue hover:bg-blood-blue/90">
                    Go to Blood Test Form
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </section>
        
        {hasPredictions && (
          <div className="h-[65vh] animate-fade-in">
            <ChatInterface predictions={predictions} />
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
              <a href="#" className="text-gray-500 hover:text-blood-blue text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-blood-blue text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-blood-blue text-sm">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
