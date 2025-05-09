
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, FileQuestion, Info, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
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
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blood-blue mb-3">Help Center</h1>
            <p className="text-xl text-gray-600">Find answers to common questions about Blood-DX</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileQuestion className="h-8 w-8 text-blood-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">FAQ</h3>
              <p className="text-gray-600 mb-4">Find answers to the most common questions</p>
              <a href="#faq" className="text-blood-blue hover:underline">Browse FAQs</a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-blood-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat Support</h3>
              <p className="text-gray-600 mb-4">Get real-time assistance with your questions</p>
              <Link to="/chat" className="text-blood-blue hover:underline">Start Chat</Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Info className="h-8 w-8 text-blood-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">User Guide</h3>
              <p className="text-gray-600 mb-4">Learn how to use Blood-DX effectively</p>
              <a href="#guide" className="text-blood-blue hover:underline">View Guide</a>
            </div>
          </div>
          
          <div id="faq" className="bg-white p-8 rounded-lg shadow-sm mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <HelpCircle className="h-6 w-6 mr-2 text-blood-blue" />
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">How accurate are Blood-DX predictions?</AccordionTrigger>
                <AccordionContent>
                  Blood-DX offers predictions with varying confidence levels based on your blood test values. Our prediction models are trained on extensive medical datasets and can achieve up to 98% accuracy for certain conditions. However, these predictions should be used as a screening tool and not as a replacement for professional medical diagnosis.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Is my health data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, protecting your health data is our top priority. All data is encrypted using industry-standard protocols, and we adhere to HIPAA guidelines. Your information is never shared with third parties without your explicit consent, and you can request data deletion at any time.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">What blood tests can I analyze?</AccordionTrigger>
                <AccordionContent>
                  Blood-DX can analyze complete blood count (CBC) tests, comprehensive metabolic panels, lipid panels, and other common blood tests. You can either manually enter your values or upload a PDF report from most major laboratories. The system recognizes common formats and automatically extracts the relevant values.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">How do I upload my blood test results?</AccordionTrigger>
                <AccordionContent>
                  To upload your blood test results, navigate to the main dashboard and select "Upload Report" or manually enter your values in the provided form. Supported file formats include PDF, JPG, and PNG. Our system will attempt to automatically extract values from lab reports, but you can always manually adjust any incorrectly extracted data.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">What conditions can Blood-DX detect?</AccordionTrigger>
                <AccordionContent>
                  Blood-DX can detect indicators for several health conditions including Type 2 Diabetes, Chronic Kidney Disease, Anemia, Thrombocytopenia, and Thalassemia. Our system analyzes patterns in your blood values and compares them to established medical guidelines and our trained datasets to identify potential health concerns.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">Can I use Blood-DX instead of seeing a doctor?</AccordionTrigger>
                <AccordionContent>
                  No, Blood-DX is designed to complement, not replace, professional medical care. Our predictions and insights can help you better understand your health status and have more informed discussions with your healthcare providers. Always consult with a qualified medical professional for diagnosis, treatment, and medical advice.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">How often should I use Blood-DX?</AccordionTrigger>
                <AccordionContent>
                  We recommend using Blood-DX whenever you receive new blood test results. Regular monitoring can help track changes in your health status over time. For those managing chronic conditions, tracking your values after each lab test can provide valuable insights into how treatments are working and how your condition is progressing or improving.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div id="guide" className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Quick Start Guide</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blood-blue pl-6">
                <h3 className="font-medium text-lg mb-2">1. Enter your blood test values</h3>
                <p className="text-gray-700">
                  Use our input form to enter your blood test values manually, or upload a lab report file. The more values you provide, the more comprehensive our analysis will be.
                </p>
              </div>
              
              <div className="border-l-4 border-blood-blue pl-6">
                <h3 className="font-medium text-lg mb-2">2. Review your predictions</h3>
                <p className="text-gray-700">
                  After submitting your values, you'll receive predictions about potential health conditions. Each prediction includes a confidence level, risk assessment, and relevant markers from your blood test.
                </p>
              </div>
              
              <div className="border-l-4 border-blood-blue pl-6">
                <h3 className="font-medium text-lg mb-2">3. Explore health recommendations</h3>
                <p className="text-gray-700">
                  Based on your results, we provide personalized health recommendations and lifestyle tips. These suggestions are designed to help you better manage your health status.
                </p>
              </div>
              
              <div className="border-l-4 border-blood-blue pl-6">
                <h3 className="font-medium text-lg mb-2">4. Chat with Dr. AI</h3>
                <p className="text-gray-700">
                  Use our AI assistant to ask questions about your results, learn more about potential conditions, and get detailed information about treatments and lifestyle changes that might help.
                </p>
              </div>
              
              <div className="border-l-4 border-blood-blue pl-6">
                <h3 className="font-medium text-lg mb-2">5. Share with your doctor</h3>
                <p className="text-gray-700">
                  Download or email your analysis to share with your healthcare provider. This can help facilitate more informed discussions during your medical appointments.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 flex items-center">
                <Info className="h-5 w-5 mr-2" />
                <span className="font-medium">Important:</span>
                <span className="ml-2">Blood-DX is an informational tool and should not be used for self-diagnosis. Always consult with a healthcare professional regarding your health concerns.</span>
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
            <Link to="/chat">
              <Button className="bg-blood-blue hover:bg-blood-blue/90">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat with Support
              </Button>
            </Link>
          </div>
        </div>
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

export default Help;
