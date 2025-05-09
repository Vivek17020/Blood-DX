
import { Prediction, HealthTip, BloodTestValues, DiseaseInfo } from '../types';

// Generate real predictions based on test values
export const generatePredictions = (values: BloodTestValues): Prediction[] => {
  const predictions: Prediction[] = [];
  
  // Check for Anemia
  if (values.hemoglobin !== null && values.hemoglobin < 12.0) {
    const severity = values.hemoglobin < 10.0 ? 'high' : 'moderate';
    predictions.push({
      disease: 'Anemia',
      confidence: calculateConfidence(values.hemoglobin, 12.0, 8.0),
      riskLevel: severity,
      description: 'Low hemoglobin levels detected, indicating possible anemia.',
      markers: {
        hemoglobin: values.hemoglobin
      }
    });
  }
  
  // Check for Diabetes
  if (values.glucose !== null && values.glucose > 126) {
    const severity = values.glucose > 180 ? 'high' : 'moderate';
    predictions.push({
      disease: 'Type 2 Diabetes',
      confidence: calculateConfidence(values.glucose, 126, 200),
      riskLevel: severity,
      description: 'Elevated glucose levels detected, indicating possible diabetes.',
      markers: {
        glucose: values.glucose
      }
    });
  }
  
  // Check for Chronic Kidney Disease
  if ((values.creatinine !== null && values.creatinine > 1.2) || 
      (values.urea !== null && values.urea > 20)) {
    const severity = (values.creatinine !== null && values.creatinine > 2.0) ? 'high' : 'moderate';
    predictions.push({
      disease: 'Chronic Kidney Disease',
      confidence: calculateConfidence(values.creatinine || 0, 1.2, 3.0),
      riskLevel: severity,
      description: 'Elevated creatinine and/or urea levels detected, indicating possible kidney issues.',
      markers: {
        creatinine: values.creatinine,
        urea: values.urea
      }
    });
  }
  
  // Check for Thrombocytopenia
  if (values.platelets !== null && values.platelets < 150000) {
    const severity = values.platelets < 100000 ? 'high' : 'moderate';
    predictions.push({
      disease: 'Thrombocytopenia',
      confidence: calculateConfidence(values.platelets, 150000, 50000),
      riskLevel: severity,
      description: 'Low platelet count detected, indicating possible thrombocytopenia.',
      markers: {
        platelets: values.platelets
      }
    });
  }

  // Check for Thalassemia
  if (values.mch !== null && values.mcv !== null && values.mch < 27 && values.mcv < 80) {
    const severity = 'moderate';
    predictions.push({
      disease: 'Thalassemia',
      confidence: 75,
      riskLevel: severity,
      description: 'Low MCV and MCH levels detected, suggesting possible thalassemia.',
      markers: {
        hemoglobin: values.hemoglobin
      }
    });
  }
  
  // If no conditions found and we have enough data, suggest healthy status
  if (predictions.length === 0 && 
      values.hemoglobin !== null && 
      values.glucose !== null && 
      values.creatinine !== null) {
    predictions.push({
      disease: 'Healthy',
      confidence: 85,
      riskLevel: 'low',
      description: 'All measured values appear within normal ranges.',
      markers: {
        hemoglobin: values.hemoglobin,
        glucose: values.glucose,
        creatinine: values.creatinine,
        platelets: values.platelets
      }
    });
  }
  
  // If not enough data provided, indicate inconclusive
  if (predictions.length === 0) {
    predictions.push({
      disease: 'Inconclusive',
      confidence: 30,
      riskLevel: 'low',
      description: 'Not enough data provided to make accurate predictions. Please provide more test values.',
    });
  }
  
  return predictions;
};

// Helper function to calculate confidence percentage based on value and thresholds
function calculateConfidence(value: number, threshold: number, extreme: number): number {
  // For values that should be higher than the threshold (like hemoglobin in anemia)
  if (extreme < threshold) {
    // How far the value is from the threshold compared to the extreme
    const deviation = Math.min(1, Math.max(0, (threshold - value) / (threshold - extreme)));
    return Math.round(40 + (deviation * 50)); // Scale to 40-90% confidence
  } 
  // For values that should be lower than the threshold (like glucose in diabetes)
  else {
    // How far the value is from the threshold compared to the extreme
    const deviation = Math.min(1, Math.max(0, (value - threshold) / (extreme - threshold)));
    return Math.round(40 + (deviation * 50)); // Scale to 40-90% confidence
  }
}

// For backward compatibility
export const generateMockPredictions = (): Prediction[] => {
  return [
    {
      disease: 'Type 2 Diabetes',
      confidence: 78,
      riskLevel: 'high',
      description: 'Based on elevated glucose levels and other factors.'
    },
    {
      disease: 'Chronic Kidney Disease',
      confidence: 45,
      riskLevel: 'moderate',
      description: 'Borderline elevated creatinine and urea levels detected.'
    },
    {
      disease: 'Anemia',
      confidence: 32,
      riskLevel: 'low',
      description: 'Minor indicators in hemoglobin and red blood cell count.'
    },
  ];
};

// Detailed disease information for the chatbot
export const diseaseInfo: Record<string, DiseaseInfo> = {
  "Type 2 Diabetes": {
    name: "Type 2 Diabetes",
    description: "Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar (glucose). With type 2 diabetes, your body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.",
    symptoms: [
      "Increased thirst and frequent urination",
      "Increased hunger",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores or frequent infections",
      "Areas of darkened skin, usually in the armpits and neck"
    ],
    causes: [
      "Insulin resistance",
      "Genetic factors",
      "Obesity",
      "Physical inactivity",
      "Environmental factors",
      "Age (risk increases as you get older)"
    ],
    treatments: [
      "Oral diabetes medications (like metformin)",
      "Insulin therapy",
      "Blood sugar monitoring",
      "Diabetes education program",
      "Regular medical check-ups",
      "Bariatric surgery in some cases"
    ],
    lifestyle: [
      "Weight loss and maintaining a healthy weight",
      "Regular physical activity (at least 150 minutes of moderate activity per week)",
      "Low glycemic index diet rich in vegetables, fruits, and whole grains",
      "Limiting refined carbohydrates and added sugars",
      "Monitoring carbohydrate intake",
      "Stress management"
    ],
    medications: [
      "Metformin (Glucophage, Glumetza) - First-line medication",
      "Sulfonylureas - Stimulate insulin production",
      "Meglitinides - Short-acting medications that stimulate insulin release",
      "Thiazolidinediones - Improve insulin sensitivity",
      "DPP-4 inhibitors - Help reduce blood sugar levels",
      "GLP-1 receptor agonists - Slow digestion and improve blood sugar"
    ],
    complications: [
      "Heart and blood vessel disease",
      "Nerve damage (neuropathy)",
      "Kidney damage (nephropathy)",
      "Eye damage (retinopathy)",
      "Foot damage",
      "Hearing impairment"
    ],
    prognosis: "With proper management, people with type 2 diabetes can lead long, healthy lives. The key is maintaining blood sugar control through medication, diet, and exercise. Regular monitoring helps prevent complications."
  },
  "Chronic Kidney Disease": {
    name: "Chronic Kidney Disease",
    description: "Chronic kidney disease (CKD) is a condition characterized by a gradual loss of kidney function over time. The kidneys filter wastes and excess fluids from your blood, which are then excreted in your urine.",
    symptoms: [
      "Nausea and vomiting",
      "Loss of appetite",
      "Fatigue and weakness",
      "Sleep problems",
      "Changes in urine output",
      "Decreased mental sharpness",
      "Muscle twitches and cramps",
      "Swelling of feet and ankles",
      "Persistent itching"
    ],
    causes: [
      "Diabetes",
      "High blood pressure",
      "Glomerulonephritis (inflammation of the kidney's filtering units)",
      "Polycystic kidney disease",
      "Prolonged obstruction of the urinary tract",
      "Recurrent kidney infections",
      "Certain medications that can damage kidneys"
    ],
    treatments: [
      "Medications to control blood pressure",
      "Medications to lower cholesterol levels",
      "Medications to treat anemia",
      "Medications to relieve swelling",
      "Dialysis (hemodialysis or peritoneal dialysis)",
      "Kidney transplant in advanced cases"
    ],
    lifestyle: [
      "Low-sodium diet",
      "Limited protein intake as recommended by doctor",
      "Regular physical activity as tolerated",
      "Smoking cessation",
      "Limiting alcohol consumption",
      "Blood pressure monitoring",
      "Careful management of diabetes if present"
    ],
    medications: [
      "ACE inhibitors or ARBs to control blood pressure and protect kidneys",
      "Diuretics to reduce fluid retention",
      "Phosphate binders to lower phosphorus levels",
      "Vitamin D supplements",
      "Erythropoiesis-stimulating agents for anemia",
      "Potassium binders to manage high potassium levels"
    ],
    complications: [
      "Heart disease",
      "Anemia",
      "Bone disease",
      "Fluid buildup in lungs or other tissues",
      "Hyperkalemia (elevated potassium levels)",
      "End-stage kidney disease requiring dialysis",
      "Increased risk of infections"
    ],
    prognosis: "The progression of CKD varies widely among individuals. Early detection and treatment can slow disease progression. For those who reach end-stage renal disease, dialysis or transplantation are needed for survival."
  },
  "Anemia": {
    name: "Anemia",
    description: "Anemia is a condition where you don't have enough healthy red blood cells to carry adequate oxygen to your body's tissues. This can make you feel tired and weak.",
    symptoms: [
      "Fatigue",
      "Weakness",
      "Pale or yellowish skin",
      "Irregular heartbeats",
      "Shortness of breath",
      "Dizziness or lightheadedness",
      "Chest pain",
      "Cold hands and feet",
      "Headaches"
    ],
    causes: [
      "Iron deficiency",
      "Vitamin deficiency (B12, folate)",
      "Chronic diseases (kidney disease, cancer)",
      "Inherited conditions (thalassemia, sickle cell anemia)",
      "Blood loss (from surgery, trauma, or heavy menstruation)",
      "Bone marrow problems",
      "Autoimmune disorders"
    ],
    treatments: [
      "Iron supplements",
      "Vitamin supplements (B12, folate)",
      "Erythropoiesis-stimulating agents",
      "Blood transfusions in severe cases",
      "Treating underlying conditions",
      "Bone marrow transplant for certain types"
    ],
    lifestyle: [
      "Iron-rich diet (red meat, beans, dark leafy greens)",
      "Vitamin C with meals to enhance iron absorption",
      "Adequate rest",
      "Gradual introduction of physical activity as condition improves",
      "Avoiding foods that inhibit iron absorption (coffee, tea)",
      "Regular medical check-ups"
    ],
    medications: [
      "Ferrous sulfate (iron supplement)",
      "Vitamin B12 injections or supplements",
      "Folic acid supplements",
      "Erythropoietin therapy",
      "Immunosuppressants for autoimmune hemolytic anemia",
      "Hydroxyurea for sickle cell anemia"
    ],
    complications: [
      "Heart problems (enlarged heart, heart failure)",
      "Increased risk of infections",
      "Pregnancy complications",
      "Delayed growth and development in children",
      "Depression and cognitive issues due to oxygen deprivation"
    ],
    prognosis: "The outlook for anemia varies depending on the cause, severity, and underlying health conditions. Many types of anemia can be mild, short-term, and easily treated. Some forms are chronic and require ongoing management."
  },
  "Thrombocytopenia": {
    name: "Thrombocytopenia",
    description: "Thrombocytopenia is a condition characterized by abnormally low levels of platelets, which are blood cells that help blood clot. This increases the risk of bleeding.",
    symptoms: [
      "Easy or excessive bruising",
      "Prolonged bleeding from cuts",
      "Spontaneous bleeding from gums or nose",
      "Blood in urine or stool",
      "Unusually heavy menstrual flows",
      "Petechiae (tiny red or purple dots on the skin)",
      "Fatigue and general weakness"
    ],
    causes: [
      "Decreased platelet production (bone marrow disorders)",
      "Increased platelet destruction (immune thrombocytopenia)",
      "Medications (heparin, quinine, antibiotics)",
      "Infections (HIV, hepatitis C, sepsis)",
      "Alcohol consumption",
      "Pregnancy complications",
      "Enlarged spleen"
    ],
    treatments: [
      "Corticosteroids to reduce immune system response",
      "Immunoglobulin therapy",
      "Thrombopoietin receptor agonists to stimulate platelet production",
      "Splenectomy (surgical removal of spleen)",
      "Platelet transfusions for severe cases",
      "Treating underlying conditions"
    ],
    lifestyle: [
      "Avoiding activities with high risk of injury",
      "Using soft toothbrushes",
      "Avoiding blood-thinning medications (aspirin, ibuprofen)",
      "Avoiding alcohol consumption",
      "Wearing protective gear during physical activities",
      "Regular medical monitoring"
    ],
    medications: [
      "Eltrombopag (Promacta)",
      "Romiplostim (Nplate)",
      "Rituximab",
      "Corticosteroids like prednisone",
      "Immunosuppressants in certain cases",
      "Intravenous immunoglobulin (IVIG)"
    ],
    complications: [
      "Internal bleeding",
      "Bleeding into the brain (intracranial hemorrhage)",
      "Excessive bleeding during surgery",
      "Hematomas (blood collection under the skin)",
      "Complications during pregnancy"
    ],
    prognosis: "The prognosis depends on the cause and severity. Mild cases may resolve on their own or with minimal treatment. Chronic cases may require ongoing management, but many patients can achieve normal platelet counts with treatment."
  },
  "Thalassemia": {
    name: "Thalassemia",
    description: "Thalassemia is an inherited blood disorder characterized by less hemoglobin and fewer red blood cells in your body than normal. It's caused by mutations in the DNA of cells that make hemoglobin.",
    symptoms: [
      "Fatigue and weakness",
      "Pale or yellowish skin",
      "Facial bone deformities",
      "Slow growth in children",
      "Abdominal swelling",
      "Dark urine",
      "Poor appetite",
      "Heart problems"
    ],
    causes: [
      "Inherited genetic mutations affecting hemoglobin production",
      "Alpha thalassemia (mutations in alpha-globin gene)",
      "Beta thalassemia (mutations in beta-globin gene)"
    ],
    treatments: [
      "Regular blood transfusions",
      "Iron chelation therapy to remove excess iron",
      "Folic acid supplements",
      "Bone marrow transplant for severe cases",
      "Stem cell transplant",
      "Gene therapy (experimental)"
    ],
    lifestyle: [
      "Managing iron levels through diet",
      "Avoiding iron supplements unless prescribed",
      "Regular exercise as tolerated",
      "Avoiding infections",
      "Genetic counseling before planning a family",
      "Regular medical follow-ups"
    ],
    medications: [
      "Deferasirox (Exjade, Jadenu) - Iron chelators",
      "Deferoxamine (Desferal) - Iron chelators",
      "Deferiprone (Ferriprox) - Iron chelators",
      "Folic acid supplements",
      "Hydroxyurea in some cases",
      "Pain medication as needed"
    ],
    complications: [
      "Iron overload (from blood transfusions)",
      "Heart problems (enlarged heart, heart failure)",
      "Liver and gallbladder problems",
      "Enlarged spleen",
      "Slowed growth in children",
      "Bone deformities",
      "Infections"
    ],
    prognosis: "The prognosis varies depending on the type and severity of thalassemia. Minor forms may not require treatment. Severe forms (thalassemia major) require regular medical care but advances in treatment have greatly improved life expectancy and quality of life."
  },
  "Healthy": {
    name: "Healthy",
    description: "Your blood test results fall within normal ranges, indicating good overall health.",
    symptoms: [],
    causes: [],
    treatments: [
      "No specific medical treatment needed",
      "Regular health check-ups (annual physical examination)",
      "Age-appropriate health screenings"
    ],
    lifestyle: [
      "Balanced diet with plenty of fruits and vegetables",
      "Regular physical activity (150 minutes of moderate exercise per week)",
      "Adequate sleep (7-9 hours per night)",
      "Stress management",
      "Limited alcohol consumption",
      "Avoiding tobacco products",
      "Maintaining healthy weight"
    ],
    medications: [
      "No specific medications required",
      "Continue any preventive medications as recommended by your doctor"
    ],
    complications: [],
    prognosis: "With continued healthy lifestyle habits and regular preventive care, you can expect to maintain good health."
  },
  "Inconclusive": {
    name: "Inconclusive",
    description: "Not enough data was provided to make accurate health predictions.",
    symptoms: [],
    causes: [
      "Insufficient test values provided",
      "Missing critical blood markers",
      "Possible lab errors or inconsistent results"
    ],
    treatments: [
      "Complete a comprehensive blood panel",
      "Follow up with healthcare provider"
    ],
    lifestyle: [
      "Maintain healthy lifestyle habits while awaiting further testing",
      "Keep track of any symptoms you experience"
    ],
    medications: [
      "Continue prescribed medications as directed by your doctor"
    ],
    complications: [
      "Delayed diagnosis if actual conditions exist"
    ],
    prognosis: "Unable to determine without additional data. Please consult with a healthcare provider for complete evaluation."
  }
};

// Health tips based on predicted diseases
export const healthTips: HealthTip[] = [
  {
    disease: 'Type 2 Diabetes',
    tips: [
      'Monitor blood sugar regularly',
      'Maintain a balanced diet low in simple carbohydrates',
      'Exercise for at least 30 minutes daily',
      'Stay hydrated and limit alcohol consumption',
      'Consider consulting with an endocrinologist'
    ],
    treatments: [
      'Oral medications like Metformin to improve insulin sensitivity',
      'Insulin therapy may be required in some cases',
      'Regular HbA1c monitoring every 3-6 months',
      'Comprehensive diabetes education program',
      'Regular screening for complications'
    ],
    lifestyleImpact: [
      'Requires consistent meal timing and planning',
      'Need for regular physical activity',
      'May affect energy levels if not well-controlled',
      'Social adjustments around food and alcohol',
      'Regular medical appointments and monitoring'
    ],
    medications: [
      'Metformin (first-line treatment)',
      'Sulfonylureas',
      'DPP-4 inhibitors',
      'GLP-1 receptor agonists',
      'SGLT2 inhibitors',
      'Insulin (various types)'
    ]
  },
  {
    disease: 'Chronic Kidney Disease',
    tips: [
      'Reduce sodium intake',
      'Control blood pressure and blood sugar levels',
      'Stay well hydrated with water',
      'Avoid NSAIDs and other medications that may stress the kidneys',
      'Follow up with a nephrologist for further evaluation'
    ],
    treatments: [
      'Blood pressure management with ACE inhibitors or ARBs',
      'Dietary protein restriction as recommended',
      'Anemia treatment with erythropoietin',
      'Phosphate binders to control phosphorus levels',
      'Dialysis or kidney transplant for advanced disease'
    ],
    lifestyleImpact: [
      'Dietary restrictions (low sodium, phosphorus, potassium)',
      'Fluid intake management',
      'Possible fatigue affecting daily activities',
      'Regular dialysis sessions may impact schedule (if advanced)',
      'Medication management schedule'
    ],
    medications: [
      'ACE inhibitors or ARBs',
      'Diuretics',
      'Phosphate binders',
      'Vitamin D supplements',
      'Erythropoiesis-stimulating agents',
      'Potassium binders'
    ]
  },
  {
    disease: 'Anemia',
    tips: [
      'Increase iron-rich foods in your diet',
      'Consider vitamin B12 and folate supplements',
      'Improve absorption by consuming vitamin C with meals',
      'Get adequate rest when feeling fatigued',
      'Follow up with appropriate blood tests to identify the specific type of anemia'
    ],
    treatments: [
      'Iron supplements (oral or intravenous)',
      'Vitamin B12 injections for pernicious anemia',
      'Folic acid supplements',
      'Blood transfusions for severe cases',
      'Treatment of underlying conditions causing anemia'
    ],
    lifestyleImpact: [
      'May experience fatigue limiting physical activities',
      'Need for dietary adjustments',
      'Possible shortness of breath during exertion',
      'May need to limit physical activity temporarily',
      'Multiple medical follow-ups during treatment'
    ],
    medications: [
      'Ferrous sulfate (iron supplement)',
      'Vitamin B12 supplements or injections',
      'Folic acid supplements',
      'Erythropoiesis-stimulating agents',
      'Immunosuppressants for autoimmune causes'
    ]
  },
  {
    disease: 'Thrombocytopenia',
    tips: [
      'Avoid medications that affect platelet function (aspirin, ibuprofen)',
      'Take precautions to prevent injuries and bleeding',
      'Ensure adequate vitamin K intake in your diet',
      'Consider consulting with a hematologist',
      'Regular monitoring of platelet counts is recommended'
    ],
    treatments: [
      'Corticosteroids to reduce immune system attack on platelets',
      'Immunoglobulin therapy for immune thrombocytopenia',
      'Thrombopoietin receptor agonists to boost platelet production',
      'Platelet transfusions for severe cases',
      'Splenectomy in refractory cases'
    ],
    lifestyleImpact: [
      'Need to avoid activities with risk of injury',
      'Precautions during dental work or surgery',
      'Using soft toothbrushes and electric razors',
      'Limiting contact sports or high-risk activities',
      'Regular medical monitoring'
    ],
    medications: [
      'Prednisone or other corticosteroids',
      'Eltrombopag (Promacta)',
      'Romiplostim (Nplate)',
      'Rituximab',
      'Intravenous immunoglobulin (IVIG)'
    ]
  },
  {
    disease: 'Thalassemia',
    tips: [
      'Regular medical follow-ups with a hematologist',
      'Consider genetic counseling',
      'Maintain folic acid intake',
      'Avoid iron supplements unless prescribed',
      'Watch for signs of complications'
    ],
    treatments: [
      'Regular blood transfusions for severe forms',
      'Iron chelation therapy to prevent iron overload',
      'Folic acid supplementation',
      'Bone marrow or stem cell transplantation for severe cases',
      'Genetic counseling for family planning'
    ],
    lifestyleImpact: [
      'Regular transfusion schedule for severe cases',
      'Dietary management to avoid excess iron',
      'Possible activity limitations due to anemia',
      'Regular medical monitoring and hospital visits',
      'Potential fertility considerations'
    ],
    medications: [
      'Deferasirox (iron chelator)',
      'Deferoxamine (iron chelator)',
      'Deferiprone (iron chelator)',
      'Folic acid supplements',
      'Hydroxyurea in some cases'
    ]
  },
  {
    disease: 'Healthy',
    tips: [
      'Continue with regular health check-ups',
      'Maintain a balanced diet rich in fruits and vegetables',
      'Aim for at least 150 minutes of moderate exercise weekly',
      'Ensure adequate sleep (7-9 hours per night)',
      'Manage stress through relaxation techniques like meditation'
    ],
    treatments: [
      'No specific medical treatments needed',
      'Regular preventive screenings appropriate for your age and gender',
      'Annual physical examination',
      'Routine vaccinations as recommended',
      'Dental check-ups twice yearly'
    ],
    lifestyleImpact: [
      'Maintain current healthy lifestyle habits',
      'Focus on preventive health measures',
      'Regular physical activity',
      'Balanced nutrition',
      'Stress management'
    ],
    medications: [
      'No specific medications required',
      'Continue any preventive medications as prescribed by your doctor'
    ]
  },
  {
    disease: 'Inconclusive',
    tips: [
      'Consider getting a comprehensive blood panel',
      'Schedule a follow-up with your primary care physician',
      'Ensure proper hydration before your next blood test',
      'Keep track of any symptoms you experience',
      'Follow standard health maintenance guidelines while awaiting clearer results'
    ],
    treatments: [
      'Complete additional diagnostic testing',
      'Follow up with healthcare provider for comprehensive evaluation',
      'Repeat blood tests if recommended',
      'Monitor for any developing symptoms',
      'Consider specialized testing if specific concerns exist'
    ],
    lifestyleImpact: [
      'Maintain healthy lifestyle while awaiting definitive results',
      'Document any symptoms or changes in health status',
      'Prepare questions for healthcare provider follow-up',
      'Consider keeping a health journal',
      'Follow general wellness guidelines'
    ],
    medications: [
      'Continue current prescribed medications',
      'Consult with doctor before starting any new supplements',
      'Avoid self-medication until diagnosis is clear'
    ]
  }
];

// Function to get tips for a specific disease
export const getTipsForDisease = (disease: string): string[] => {
  const tipObject = healthTips.find(tip => 
    tip.disease.toLowerCase() === disease.toLowerCase()
  );
  
  return tipObject?.tips || [
    'Maintain a balanced diet',
    'Exercise regularly',
    'Get adequate sleep',
    'Stay hydrated',
    'Follow up with your healthcare provider'
  ];
};

// Function to get detailed info for a disease
export const getDetailedDiseaseInfo = (disease: string): DiseaseInfo | null => {
  // First try exact match
  let info = diseaseInfo[disease];
  
  // If not found, try case-insensitive match
  if (!info) {
    const diseaseLower = disease.toLowerCase();
    const key = Object.keys(diseaseInfo).find(k => k.toLowerCase() === diseaseLower);
    if (key) {
      info = diseaseInfo[key];
    }
  }
  
  return info || null;
};
