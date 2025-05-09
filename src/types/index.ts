
export interface BloodTestValues {
  hemoglobin: number | null;
  glucose: number | null;
  creatinine: number | null;
  urea: number | null;
  cholesterol: number | null;
  wbc: number | null;
  rbc: number | null;
  platelets: number | null;
  hematocrit: number | null;
  mcv: number | null;
  mch: number | null;
  mchc: number | null;
  age: number | null;
  gender: 'male' | 'female' | null;
  markers?: {
    hemoglobin?: number | null;
    glucose?: number | null;
    creatinine?: number | null;
    urea?: number | null;
    platelets?: number | null;
  };
}

// Define the structure for a single prediction
export interface Prediction {
  disease: string;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high';
  description: string;
  markers?: {
    glucose?: number | null;
    hemoglobin?: number | null;
    creatinine?: number | null;
    urea?: number | null;
    platelets?: number | null;
  };
}

// Health tips type
export interface HealthTip {
  disease: string;
  tips: string[];
  treatments?: string[];
  lifestyleImpact?: string[];
  medications?: string[];
}

// Disease detailed information
export interface DiseaseInfo {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  lifestyle: string[];
  medications: string[];
  complications: string[];
  prognosis: string;
}
