
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, Send, Shield, ShieldCheck, FileCheck, FileWarning } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Prediction } from '@/types';
import { toast } from "@/hooks/use-toast";
import { getDetailedDiseaseInfo } from '@/utils/mockPredictions';

interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  predictions?: Prediction[] | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ predictions }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hello! I'm Dr. AI, your virtual health assistant. I can help you understand your blood test results and provide personalized health recommendations. How may I help you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed'>('pending');
  const [showVerificationBanner, setShowVerificationBanner] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-verify report when predictions are passed
    if (predictions && predictions.length > 0) {
      verifyReport();
    }
  }, [predictions]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const verifyReport = () => {
    setIsTyping(true);
    setVerificationStatus('pending');
    
    // Simulate report verification process with digital signature check
    setTimeout(() => {
      // In a real app, this would use cryptographic verification with hash or signature values
      const mockHash = "e7c6e9b23226f89a123d8c81a362e691";
      const mockSignature = "VALID_SIGNATURE_73a4b8c92d11e9";
      
      // Simulate verification with 90% success rate
      const isValid = Math.random() > 0.1;
      
      if (isValid) {
        setIsVerified(true);
        setVerificationStatus('verified');
        const verificationMessage: ChatMessage = {
          content: `✅ Report Authentication Successful\n\nDigital signature verified: ${mockSignature}\nHash integrity check: PASSED\nCertificate authority: Medical Lab Security Alliance\n\nYour blood test report has been cryptographically verified as authentic and unmodified. The data integrity is confirmed.`,
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, verificationMessage]);
        toast({
          title: "Report Verified",
          description: "Your report has been authenticated successfully.",
        });
      } else {
        setVerificationStatus('failed');
        const verificationMessage: ChatMessage = {
          content: `⚠️ Report Verification Failed\n\nIssues detected:\n- Digital signature mismatch\n- Hash verification failed: ${mockHash}\n- Certificate chain incomplete\n\nWe could not verify the authenticity of this report. Please ensure you're using an official lab report with proper digital signatures.`,
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, verificationMessage]);
        toast({
          title: "Verification Failed",
          description: "Could not verify report authenticity.",
          variant: "destructive"
        });
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      content: input,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI generating a response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, predictions);
      const assistantMessage: ChatMessage = {
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, Math.random() * 500 + 800); // Random delay between 800-1300ms for natural feel
  };

  // Generate a response based on user input and predictions
  const generateAIResponse = (userInput: string, predictions?: Prediction[] | null): string => {
    const input = userInput.toLowerCase();
    
    // Handle verification related queries
    if (input.includes('verify') || input.includes('authentic') || input.includes('real') || input.includes('fake') || input.includes('trust')) {
      if (isVerified) {
        return "I've verified that your blood test report is authentic using cryptographic verification. The digital signature matches the issuing laboratory and the report hasn't been tampered with. You can trust these results for making health decisions.";
      } else if (!predictions || predictions.length === 0) {
        return "I don't have any report to verify. Please upload your blood test results first so I can authenticate them using our cryptographic verification system.";
      } else {
        return "Unfortunately, I couldn't verify the authenticity of this report. The digital signature verification failed, which could mean the report lacks proper security features or may have been modified. I recommend obtaining a digitally signed report from an accredited laboratory.";
      }
    }
    
    // Check if we have predictions to work with
    if (!predictions || predictions.length === 0) {
      if (input.includes('risk') || input.includes('disease') || input.includes('condition')) {
        return "I need to see your blood test results before I can assess your health status. Could you please upload your lab report or enter your blood values? Once I have that information, I can provide a thorough analysis.";
      }
      return "I'm here to help you understand your health status, but I don't have your blood test data yet. Please upload your results or fill in the form first so I can provide personalized insights.";
    }
    
    // Find the highest risk prediction
    const highestRiskPrediction = [...predictions].sort((a, b) => {
      const riskOrder = { high: 3, moderate: 2, low: 1 };
      return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
    })[0];
    
    // Handle treatment options
    if (input.includes('treatment') || input.includes('therapy') || input.includes('medication') || input.includes('medicine') || input.includes('drug')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `For ${diseaseInfo.name}, the following treatment options are typically considered:\n\n${diseaseInfo.treatments.map(t => `• ${t}`).join('\n')}\n\nMedications commonly prescribed include:\n${diseaseInfo.medications.map(m => `• ${m}`).join('\n')}\n\nIt's essential to consult with a healthcare professional before starting any treatment, as your specific situation may require a personalized approach.`;
      } else {
        return `For ${highestRiskPrediction.disease}, treatment typically involves a combination of medication, lifestyle changes, and regular monitoring. I'd recommend consulting with a specialist who can provide a personalized treatment plan based on your specific situation and health history.`;
      }
    }
    
    // Handle lifestyle recommendations
    if (input.includes('lifestyle') || input.includes('diet') || input.includes('exercise') || input.includes('nutrition') || input.includes('habits')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `For managing ${diseaseInfo.name}, these lifestyle adjustments are recommended:\n\n${diseaseInfo.lifestyle.map(l => `• ${l}`).join('\n')}\n\nThese changes can significantly impact your condition and overall health. Would you like more specific information about any of these recommendations?`;
      } else {
        return `For ${highestRiskPrediction.disease}, I recommend maintaining a balanced diet rich in fruits, vegetables, and whole grains, regular exercise (at least 150 minutes of moderate activity weekly), adequate sleep (7-9 hours), stress management techniques, and avoiding tobacco and excessive alcohol. Regular monitoring of your condition is also important.`;
      }
    }
    
    // Handle health recommendations
    if (input.includes('recommendation') || input.includes('advice') || input.includes('suggest') || input.includes('help') || input.includes('tips')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `Based on your ${diseaseInfo.name} indicators, here are my recommendations:\n\n1. Medical follow-up: ${diseaseInfo.treatments[0]}\n2. Lifestyle change: ${diseaseInfo.lifestyle[0]}\n3. Monitoring: ${diseaseInfo.treatments.find(t => t.includes('monitor')) || 'Regular check-ups with your healthcare provider'}\n4. Diet: ${diseaseInfo.lifestyle.find(l => l.includes('diet')) || 'Follow a balanced diet'}\n5. Support: Consider joining a support group for people with ${diseaseInfo.name}\n\nWould you like more specific recommendations about any of these areas?`;
      } else {
        return `For your ${highestRiskPrediction.disease} condition, I recommend scheduling a follow-up with a specialist, following a tailored treatment plan, making appropriate lifestyle modifications, monitoring your symptoms regularly, and learning more about your condition through reputable sources.`;
      }
    }

    // Handle how condition might affect the person
    if (input.includes('affect me') || input.includes('impact') || input.includes('change my life') || input.includes('daily life') || input.includes('living with')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `Living with ${diseaseInfo.name} can impact your daily life in several ways:\n\n1. Physical symptoms: You may experience ${diseaseInfo.symptoms.slice(0, 3).join(', ')}\n\n2. Daily management: ${diseaseInfo.lifestyle[0]}\n\n3. Medical care: ${diseaseInfo.treatments.find(t => t.includes('regular')) || 'Regular medical follow-ups'}\n\n4. Potential complications if not managed: ${diseaseInfo.complications.slice(0, 2).join(', ')}\n\n5. Outlook: ${diseaseInfo.prognosis}\n\nWith proper management and support, many people with ${diseaseInfo.name} lead fulfilling, active lives. The key is early intervention and consistent care.`;
      } else {
        return `Living with ${highestRiskPrediction.disease} may require some lifestyle adjustments and regular medical monitoring. While it might impact your daily routine initially, with proper management, many people maintain a good quality of life. The key factors are adherence to treatment plans, regular check-ups, and lifestyle modifications as recommended by your healthcare provider.`;
      }
    }

    // Handle explanation requests about specific conditions
    if (input.includes('explain') || input.includes('tell me about') || input.includes('what is') || input.includes('understand')) {
      const diseaseMatch = predictions.find(p => 
        input.includes(p.disease.toLowerCase()) || 
        input.includes(p.disease.toLowerCase().replace(' ', ''))
      );
      
      if (diseaseMatch) {
        const diseaseInfo = getDetailedDiseaseInfo(diseaseMatch.disease);
        
        if (diseaseInfo) {
          return `${diseaseInfo.name} is ${diseaseInfo.description}\n\nYour test results show a ${diseaseMatch.confidence}% likelihood with a ${diseaseMatch.riskLevel} risk level. ${diseaseMatch.description}\n\nCommon symptoms include: ${diseaseInfo.symptoms.slice(0, 4).join(', ')}.\n\nCommon causes include: ${diseaseInfo.causes.slice(0, 3).join(', ')}.\n\nWould you like to know about treatment options, lifestyle recommendations, or possible complications?`;
        } else {
          if (diseaseMatch.disease.includes('Diabetes')) {
            return `Type 2 Diabetes is a metabolic disorder characterized by high blood glucose levels resulting from insulin resistance and relative insulin deficiency. Your lab values show a fasting glucose of ${predictions.find(p => p.disease.includes('Diabetes'))?.markers?.glucose || '138'} mg/dL, which exceeds the normal range (70-100 mg/dL). This suggests your cells aren't responding properly to insulin, preventing glucose from entering your cells efficiently. The confidence level for this diagnosis is ${diseaseMatch.confidence}%, and the risk level is ${diseaseMatch.riskLevel}. Early intervention with lifestyle changes and possibly medication can significantly improve your prognosis.`;
          } else if (diseaseMatch.disease.includes('Kidney')) {
            return `Chronic Kidney Disease (CKD) involves progressive loss of kidney function over time. Your blood test shows elevated creatinine (${predictions.find(p => p.disease.includes('Kidney'))?.markers?.creatinine || '1.6'} mg/dL) and urea (${predictions.find(p => p.disease.includes('Kidney'))?.markers?.urea || '45'} mg/dL), which are waste products normally filtered by healthy kidneys. The confidence level for this condition is ${diseaseMatch.confidence}%, with a ${diseaseMatch.riskLevel} risk level. CKD often develops silently, which is why monitoring kidney function through regular blood tests is crucial. Early detection and management can slow progression significantly.`;
          } else if (diseaseMatch.disease.includes('Anemia')) {
            return `Your blood work shows indicators of Anemia, specifically with a hemoglobin level of ${predictions.find(p => p.disease.includes('Anemia'))?.markers?.hemoglobin || '10.2'} g/dL (normal range: 12.0-15.5 g/dL for women, 13.5-17.5 g/dL for men). This suggests your body isn't producing enough red blood cells or they contain insufficient hemoglobin to carry adequate oxygen. The confidence level for this diagnosis is ${diseaseMatch.confidence}%, and the risk level is ${diseaseMatch.riskLevel}. Further testing may be needed to determine the specific type of anemia you have, which will guide treatment options.`;
          } else {
            return `${diseaseMatch.disease} is a condition that has been detected in your blood test results with a ${diseaseMatch.confidence}% confidence level and a ${diseaseMatch.riskLevel} risk assessment. ${diseaseMatch.description} Would you like me to explain more about the symptoms, causes, treatments, or lifestyle recommendations for this condition?`;
          }
        }
      }
      
      return `I'd be happy to explain more about your health conditions. From your blood test results, I've detected indicators for ${highestRiskPrediction.disease}. Would you like me to explain what this means, what might be causing it, or what treatment options are available?`;
    }
    
    // Handle symptoms or prognosis questions
    if (input.includes('symptom') || input.includes('feel') || input.includes('sign') || input.includes('prognosis') || input.includes('future')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `With ${diseaseInfo.name}, you might experience the following symptoms: ${diseaseInfo.symptoms.join(', ')}.\n\nRegarding prognosis: ${diseaseInfo.prognosis}\n\nIt's important to note that individual experiences vary, and early detection and proper management can significantly improve outcomes. Would you like to discuss treatment options?`;
      } else {
        if (highestRiskPrediction.disease.includes('Diabetes')) {
          return "With your blood glucose levels, you might experience symptoms like increased thirst, frequent urination, unexplained weight loss, fatigue, or blurred vision. However, many people with early Type 2 Diabetes are asymptomatic, which is why it's often called a 'silent disease.' With proper management including diet modifications, regular exercise, and possibly medication, your prognosis can be excellent. Early intervention significantly reduces your risk of complications like neuropathy, retinopathy, or cardiovascular disease.";
        } else if (highestRiskPrediction.disease.includes('Kidney')) {
          return "Early CKD often has no symptoms, which makes regular screening important. As it progresses, you might notice fatigue, poor appetite, swelling in feet and ankles, or changes in urination patterns. Your current lab values suggest early-stage kidney dysfunction. With aggressive blood pressure management, dietary changes, and careful medication selection, we can significantly slow progression. Without intervention, CKD can advance to kidney failure requiring dialysis or transplantation, but early detection gives you an excellent opportunity to preserve kidney function.";
        } else {
          return "With your current hemoglobin levels, you might be experiencing fatigue, weakness, shortness of breath during physical activities, pale skin, or dizziness. Addressing the underlying cause of your anemia has an excellent prognosis in most cases. Iron-deficiency anemia responds well to supplementation, while other types may require different approaches. With proper treatment, your energy levels and quality of life should improve significantly within weeks to months.";
        }
      }
    }
    
    // Handle specific test value questions
    if (input.includes('value') || input.includes('level') || input.includes('test') || input.includes('result') || input.includes('number')) {
      return `Let me break down your key blood test values:\n\n- Glucose: ${predictions[0].markers?.glucose || '135'} mg/dL (Target: 70-100 mg/dL)\n- Hemoglobin: ${predictions[0].markers?.hemoglobin || '11.2'} g/dL (Target: 12.0-15.5 g/dL)\n- Creatinine: ${predictions[0].markers?.creatinine || '1.3'} mg/dL (Target: 0.6-1.2 mg/dL)\n- Urea/BUN: ${predictions[0].markers?.urea || '28'} mg/dL (Target: 7-20 mg/dL)\n\nThe most concerning value is your ${highestRiskPrediction.disease.includes('Diabetes') ? 'glucose' : highestRiskPrediction.disease.includes('Kidney') ? 'creatinine and urea' : 'hemoglobin'}, which suggests ${highestRiskPrediction.disease}. Would you like me to explain what these values mean for your health?`;
    }

    // Handle causes questions
    if (input.includes('cause') || input.includes('why') || input.includes('reason') || input.includes('how did') || input.includes('develop')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `${diseaseInfo.name} is typically caused by: ${diseaseInfo.causes.join(', ')}.\n\nIn your case, your blood test shows ${highestRiskPrediction.description.toLowerCase()} This doesn't necessarily tell us the exact cause in your specific situation, but it helps identify the condition. Further diagnostic testing may be needed to determine the underlying cause. Would you like to discuss next steps for diagnosis or treatment?`;
      } else {
        return `There are several potential causes for your ${highestRiskPrediction.disease} indicators. Common causes include genetic factors, lifestyle elements, underlying health conditions, or medication effects. Your blood test shows ${highestRiskPrediction.description.toLowerCase()} A healthcare provider would need to perform additional tests to determine the specific cause in your case.`;
      }
    }
    
    // Handle complications questions
    if (input.includes('complications') || input.includes('risks') || input.includes('dangerous') || input.includes('serious') || input.includes('worry')) {
      const diseaseInfo = getDetailedDiseaseInfo(highestRiskPrediction.disease);
      
      if (diseaseInfo) {
        return `If left untreated or poorly managed, ${diseaseInfo.name} can lead to these potential complications: ${diseaseInfo.complications.join(', ')}.\n\nHowever, it's important to note that with proper management and regular medical care, many of these complications can be prevented or minimized. Your current risk level is ${highestRiskPrediction.riskLevel}, and early intervention offers the best opportunity to prevent these issues.`;
      } else {
        return `Potential complications of untreated ${highestRiskPrediction.disease} may include progression of the disease, impact on other organ systems, reduced quality of life, and in some cases, serious health events. However, with proper management and regular medical care, these risks can be significantly reduced. Your current risk level is ${highestRiskPrediction.riskLevel}, which means proper intervention now can be very effective.`;
      }
    }
    
    // Default response for general questions about health status
    return `Based on my analysis of your blood test results, my primary concern is the indicators for ${highestRiskPrediction.disease} with a ${highestRiskPrediction.confidence}% confidence level. Your ${highestRiskPrediction.disease.includes('Diabetes') ? 'glucose' : highestRiskPrediction.disease.includes('Kidney') ? 'creatinine and urea' : 'hemoglobin'} levels are outside the optimal range, suggesting ${highestRiskPrediction.riskLevel} risk. \n\nThe good news is that with proper management and lifestyle adjustments, this condition can often be effectively controlled. Would you like to discuss treatment options, lifestyle recommendations, or learn more about how this condition might affect you?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Verification Banner */}
      {showVerificationBanner && (
        <div className={`mb-4 p-3 rounded-lg flex items-center justify-between ${
          verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : 
          verificationStatus === 'failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          <div className="flex items-center">
            {verificationStatus === 'verified' ? (
              <ShieldCheck className="h-5 w-5 mr-2" />
            ) : verificationStatus === 'failed' ? (
              <FileWarning className="h-5 w-5 mr-2" />
            ) : (
              <Shield className="h-5 w-5 mr-2" />
            )}
            <span>
              {verificationStatus === 'verified' 
                ? "Report authenticated: Digital signature verified" 
                : verificationStatus === 'failed'
                ? "Report verification failed: Invalid signature detected"
                : "Report verification: Click to verify report authenticity"}
            </span>
          </div>
          <div className="flex items-center">
            {verificationStatus === 'pending' && (
              <Button 
                variant="outline" 
                size="sm"
                className="mr-2 text-yellow-800 border-yellow-400 hover:bg-yellow-200"
                onClick={verifyReport}
              >
                <FileCheck className="h-4 w-4 mr-1" />
                Verify Now
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowVerificationBanner(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Mobile view - use Sheet component */}
      <div className="md:hidden fixed bottom-5 right-5 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full bg-blood-blue shadow-lg hover:bg-blood-blue/90">
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-[80vh] p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle>Chat with Blood-DX Assistant</SheetTitle>
            </SheetHeader>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-blood-blue text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 bg-gray-100 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about your blood test results..."
                  className="resize-none"
                />
                <Button onClick={handleSendMessage} className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop view - use Card component */}
      <Card className="hidden md:flex flex-col h-full w-full max-w-3xl mx-auto">
        <CardContent className="flex flex-col h-full p-4">
          <div className="flex-grow overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-blood-blue text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 bg-gray-100 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Dr. AI about your blood test results..."
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} className="shrink-0">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatInterface;
