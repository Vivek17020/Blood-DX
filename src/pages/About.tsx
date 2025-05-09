
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Award, Bookmark, Shield } from 'lucide-react';

const About = () => {
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
        
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blood-blue mb-3">About Blood-DX</h1>
            <p className="text-xl text-gray-600">Revolutionizing blood test analysis with AI technology</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At Blood-DX, we're dedicated to democratizing access to advanced healthcare analytics. 
              Our mission is to empower individuals with insights from their blood test results, 
              enabling early detection of health issues and proactive management of wellbeing.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex">
                <div className="mr-4 bg-blue-100 p-3 rounded-full text-blood-blue flex-shrink-0">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Early Detection</h3>
                  <p className="text-gray-600">Identify potential health concerns before they become serious issues</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 bg-blue-100 p-3 rounded-full text-blood-blue flex-shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Clinical Accuracy</h3>
                  <p className="text-gray-600">Our algorithms are trained on extensive medical datasets for reliable results</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 bg-blue-100 p-3 rounded-full text-blood-blue flex-shrink-0">
                  <Bookmark className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Health Education</h3>
                  <p className="text-gray-600">Learn about your health metrics and what they mean for your wellbeing</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 bg-blue-100 p-3 rounded-full text-blood-blue flex-shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Data Privacy</h3>
                  <p className="text-gray-600">Your health data is encrypted and secure with our advanced protection systems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-gray-700 mb-6">
              Blood-DX uses advanced artificial intelligence and machine learning algorithms to analyze blood test results. 
              Our system can detect patterns and anomalies that might indicate various health conditions, providing you with 
              valuable insights about your health status.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">What We Can Detect</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Type 2 Diabetes and pre-diabetic conditions</li>
                <li>Anemia and other hematological conditions</li>
                <li>Chronic Kidney Disease markers</li>
                <li>Thrombocytopenia and platelet disorders</li>
                <li>Thalassemia indicators</li>
              </ul>
            </div>
            
            <p className="text-gray-700">
              While our system provides valuable insights, it's designed to complement, not replace, 
              professional medical advice. Always consult with healthcare providers for diagnosis and treatment.
            </p>
          </div>
        </section>
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

export default About;
