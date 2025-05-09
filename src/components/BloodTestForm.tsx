import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BloodTestValues } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Upload, FileCheck } from 'lucide-react';

interface BloodTestFormProps {
  onSubmit: (values: BloodTestValues) => void;
}

const BloodTestForm: React.FC<BloodTestFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<BloodTestValues>({
    hemoglobin: null,
    glucose: null,
    creatinine: null,
    urea: null,
    cholesterol: null,
    wbc: null,
    rbc: null,
    platelets: null,
    hematocrit: null,
    mcv: null,
    mch: null,
    mchc: null,
    age: null,
    gender: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof BloodTestValues, value: string) => {
    if (value === '') {
      setFormValues({ ...formValues, [field]: null });
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setFormValues({ ...formValues, [field]: numValue });
      }
    }
  };

  const handleSelectChange = (field: keyof BloodTestValues, value: string) => {
    setFormValues({ ...formValues, [field]: value as 'male' | 'female' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add markers to the submitted data for the chatbot to reference
    const enhancedValues = {
      ...formValues,
      markers: {
        hemoglobin: formValues.hemoglobin,
        glucose: formValues.glucose,
        creatinine: formValues.creatinine,
        urea: formValues.urea,
        platelets: formValues.platelets
      }
    };
    
    onSubmit(enhancedValues);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadedFileName(file.name);
    setIsUploading(true);
    
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      setIsUploading(false);
      return;
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, JPG, or PNG file",
        variant: "destructive"
      });
      setIsUploading(false);
      return;
    }
    
    // Simulate file processing with a progress toast
    toast({
      title: "Processing report",
      description: "Extracting blood test values...",
    });
    
    // Simulate API call to process the uploaded file
    setTimeout(() => {
      // Mock data for demo purposes - in a real app, this would come from OCR/document processing
      const mockUploadData: BloodTestValues = {
        hemoglobin: 11.2,
        glucose: 140,
        creatinine: 1.4,
        urea: 25,
        cholesterol: 220,
        wbc: 8500,
        rbc: 4.1,
        platelets: 250000,
        hematocrit: 38,
        mcv: 85,
        mch: 28,
        mchc: 33,
        age: 45,
        gender: 'male',
      };
      
      setFormValues(mockUploadData);
      setIsUploading(false);
      
      toast({
        title: "Report processed successfully",
        description: `Extracted ${Object.values(mockUploadData).filter(Boolean).length} values from ${file.name}`,
      });
    }, 2000);
  };

  const triggerFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>Enter Blood Test Values</CardTitle>
        <CardDescription>
          Input your blood test results below or upload your lab report for analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="manual">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">Upload Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Demographic Information */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder="Years" 
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    value={formValues.age ?? ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('gender', value)}
                    value={formValues.gender || undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Basic Blood Parameters */}
                <div className="space-y-2">
                  <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                  <Input 
                    id="glucose" 
                    type="number" 
                    step="0.1"
                    placeholder="70-100" 
                    onChange={(e) => handleInputChange('glucose', e.target.value)}
                    value={formValues.glucose ?? ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                  <Input 
                    id="hemoglobin" 
                    type="number" 
                    step="0.1"
                    placeholder="12.0-15.5" 
                    onChange={(e) => handleInputChange('hemoglobin', e.target.value)}
                    value={formValues.hemoglobin ?? ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="creatinine">Creatinine (mg/dL)</Label>
                  <Input 
                    id="creatinine" 
                    type="number" 
                    step="0.01"
                    placeholder="0.6-1.2" 
                    onChange={(e) => handleInputChange('creatinine', e.target.value)}
                    value={formValues.creatinine ?? ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="urea">Urea/BUN (mg/dL)</Label>
                  <Input 
                    id="urea" 
                    type="number" 
                    step="0.1"
                    placeholder="7-20" 
                    onChange={(e) => handleInputChange('urea', e.target.value)}
                    value={formValues.urea ?? ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wbc">White Blood Cells (cells/μL)</Label>
                  <Input 
                    id="wbc" 
                    type="number" 
                    placeholder="4,500-11,000" 
                    onChange={(e) => handleInputChange('wbc', e.target.value)}
                    value={formValues.wbc ?? ''}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rbc">Red Blood Cells (mil/μL)</Label>
                  <Input 
                    id="rbc" 
                    type="number" 
                    step="0.1"
                    placeholder="4.5-5.9" 
                    onChange={(e) => handleInputChange('rbc', e.target.value)}
                    value={formValues.rbc ?? ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platelets">Platelets (cells/μL)</Label>
                  <Input 
                    id="platelets" 
                    type="number" 
                    placeholder="150,000-450,000" 
                    onChange={(e) => handleInputChange('platelets', e.target.value)}
                    value={formValues.platelets ?? ''}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  Analyze Blood Values
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center space-y-4">
                {!uploadedFileName ? (
                  <>
                    <div className="text-4xl text-gray-300">
                      <Upload className="h-16 w-16 mx-auto text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium">Upload blood test report</h3>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, JPG, PNG (max 5MB)
                    </p>
                    <div>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        ref={fileInputRef}
                      />
                      <Button 
                        variant="outline" 
                        disabled={isUploading}
                        onClick={triggerFileDialog}
                        className="cursor-pointer"
                      >
                        {isUploading ? "Processing..." : "Browse Files"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-green-100 text-green-800 p-2 rounded-full inline-block">
                      <FileCheck className="h-10 w-10" />
                    </div>
                    <h3 className="text-lg font-medium">File uploaded successfully</h3>
                    <p className="text-sm text-gray-700 font-medium">{uploadedFileName}</p>
                    <div>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={triggerFileDialog}
                      >
                        Replace File
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                type="button"
                onClick={handleSubmit}
                disabled={isUploading || Object.values(formValues).every(val => val === null)}
              >
                {isUploading ? "Processing..." : "Analyze Blood Values"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-gray-500">
          Your data is processed locally and never leaves your device
        </p>
      </CardFooter>
    </Card>
  );
};

export default BloodTestForm;
