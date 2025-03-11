import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import IncomeForm from '../components/tax/IncomeForm';
import DeductionsForm from '../components/tax/DeductionsForm';
import CreditsForm from '../components/tax/CreditsForm';
import TaxSummary from '../components/tax/TaxSummary';
import AISuggestions from '../components/tax/AISuggestions';

// Define types for tax data
interface IncomeData {
  employmentIncome: number;
  selfEmploymentIncome: number;
  investmentIncome: number;
  rentalIncome: number;
  otherIncome: number;
  t4Slips: number;
}

interface DeductionData {
  rrspContributions: number;
  homeOfficeClaims: boolean;
  homeOfficePercentage: number;
  childCareExpenses: number;
  movingExpenses: number;
  unionDues: number;
  toolExpenses: number;
  medicalExpenses: number;
  charitableDonations: number;
  studentLoanInterest: number;
  tuitionAmount: number;
  otherDeductions: number;
}

interface CreditData {
  basicPersonalAmount: boolean;
  spouseAmount: boolean;
  canadaCaregiver: boolean;
  eligibleDependant: boolean;
  canadaEmployment: boolean;
  disabilityAmount: boolean;
  interestDividends: boolean;
  pensionIncome: boolean;
  educationAmount: boolean;
  gstHstRebate: boolean;
  ccb: boolean;
  witb: boolean;
}

interface TaxData {
  income: IncomeData;
  deductions: DeductionData;
  credits: CreditData;
}

interface CalculationResult {
  totalIncome: number;
  federalTaxAmount: number;
  provincialTaxAmount: number;
  totalTaxAmount: number;
  totalDeductions: number;
  totalCredits: number;
  netIncome: number;
  taxableIncome: number;
  refundAmount: number;
  balanceOwing: number;
  marginalTaxRate: number;
  effectiveTaxRate: number;
}

interface AISuggestion {
  id: string;
  type: string;
  title: string;
  description: string;
  potentialSavings: number;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  isApplied: boolean;
}

const TaxInput: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [taxData, setTaxData] = useState<TaxData>({
    income: {
      employmentIncome: 0,
      selfEmploymentIncome: 0,
      investmentIncome: 0,
      rentalIncome: 0,
      otherIncome: 0,
      t4Slips: 0
    },
    deductions: {
      rrspContributions: 0,
      homeOfficeClaims: false,
      homeOfficePercentage: 0,
      childCareExpenses: 0,
      movingExpenses: 0,
      unionDues: 0,
      toolExpenses: 0,
      medicalExpenses: 0,
      charitableDonations: 0,
      studentLoanInterest: 0,
      tuitionAmount: 0,
      otherDeductions: 0
    },
    credits: {
      basicPersonalAmount: true,
      spouseAmount: false,
      canadaCaregiver: false,
      eligibleDependant: false,
      canadaEmployment: true,
      disabilityAmount: false,
      interestDividends: false,
      pensionIncome: false,
      educationAmount: false,
      gstHstRebate: true,
      ccb: false,
      witb: false
    }
  });
  
  const [calculationResults, setCalculationResults] = useState<CalculationResult | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIncomeSubmit = (incomeData: IncomeData) => {
    setTaxData({ ...taxData, income: incomeData });
    setActiveStep(1);
  };

  const handleDeductionsSubmit = (deductionsData: DeductionData) => {
    setTaxData({ ...taxData, deductions: deductionsData });
    setActiveStep(2);
  };

  const handleCreditsSubmit = (creditsData: CreditData) => {
    setTaxData({ ...taxData, credits: creditsData });
    setActiveStep(3);
    calculateTaxes();
  };

  const calculateTaxes = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call to your backend or Firebase
      // For now, we'll simulate a calculation
      const results = simulateTaxCalculation(taxData);
      setCalculationResults(results);
      
      // Generate AI suggestions based on tax data
      const suggestions = generateAISuggestions(taxData, results);
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error calculating taxes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateTaxCalculation = (data: TaxData): CalculationResult => {
    // This is a simplified tax calculation for demonstration
    const totalIncome = 
      data.income.employmentIncome + 
      data.income.selfEmploymentIncome + 
      data.income.investmentIncome + 
      data.income.rentalIncome + 
      data.income.otherIncome;
    
    const totalDeductions = 
      data.deductions.rrspContributions + 
      data.deductions.childCareExpenses + 
      data.deductions.movingExpenses + 
      data.deductions.unionDues + 
      data.deductions.toolExpenses + 
      data.deductions.medicalExpenses + 
      data.deductions.charitableDonations + 
      data.deductions.studentLoanInterest + 
      data.deductions.tuitionAmount + 
      data.deductions.otherDeductions;
    
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);
    
    // Simple federal tax calculation (very simplified)
    let federalTax = 0;
    if (taxableIncome <= 49020) {
      federalTax = taxableIncome * 0.15;
    } else if (taxableIncome <= 98040) {
      federalTax = 49020 * 0.15 + (taxableIncome - 49020) * 0.205;
    } else if (taxableIncome <= 151978) {
      federalTax = 49020 * 0.15 + (98040 - 49020) * 0.205 + (taxableIncome - 98040) * 0.26;
    } else if (taxableIncome <= 216511) {
      federalTax = 49020 * 0.15 + (98040 - 49020) * 0.205 + (151978 - 98040) * 0.26 + (taxableIncome - 151978) * 0.29;
    } else {
      federalTax = 49020 * 0.15 + (98040 - 49020) * 0.205 + (151978 - 98040) * 0.26 + (216511 - 151978) * 0.29 + (taxableIncome - 216511) * 0.33;
    }
    
    // Simplified provincial tax (using Ontario rates as example)
    let provincialTax = 0;
    if (taxableIncome <= 45142) {
      provincialTax = taxableIncome * 0.0505;
    } else if (taxableIncome <= 90287) {
      provincialTax = 45142 * 0.0505 + (taxableIncome - 45142) * 0.0915;
    } else if (taxableIncome <= 150000) {
      provincialTax = 45142 * 0.0505 + (90287 - 45142) * 0.0915 + (taxableIncome - 90287) * 0.1116;
    } else if (taxableIncome <= 220000) {
      provincialTax = 45142 * 0.0505 + (90287 - 45142) * 0.0915 + (150000 - 90287) * 0.1116 + (taxableIncome - 150000) * 0.1216;
    } else {
      provincialTax = 45142 * 0.0505 + (90287 - 45142) * 0.0915 + (150000 - 90287) * 0.1116 + (220000 - 150000) * 0.1216 + (taxableIncome - 220000) * 0.1316;
    }
    
    // Apply basic credits (very simplified)
    const basicCredit = 13808;
    const totalCredits = basicCredit * 0.15;
    
    const totalTaxAmount = federalTax + provincialTax - totalCredits;
    const effectiveTaxRate = totalIncome > 0 ? (totalTaxAmount / totalIncome) * 100 : 0;
    
    return {
      totalIncome,
      federalTaxAmount: federalTax,
      provincialTaxAmount: provincialTax,
      totalTaxAmount,
      totalDeductions,
      totalCredits,
      netIncome: totalIncome,
      taxableIncome,
      refundAmount: Math.max(0, -totalTaxAmount),
      balanceOwing: Math.max(0, totalTaxAmount),
      marginalTaxRate: taxableIncome > 216511 ? 33 : taxableIncome > 151978 ? 29 : taxableIncome > 98040 ? 26 : taxableIncome > 49020 ? 20.5 : 15,
      effectiveTaxRate: effectiveTaxRate
    };
  };

  const generateAISuggestions = (data: TaxData, results: CalculationResult): AISuggestion[] => {
    // This simulates AI-generated suggestions based on tax data
    const suggestions: AISuggestion[] = [];
    
    // RRSP contribution suggestion
    if (data.income.employmentIncome > 60000 && data.deductions.rrspContributions < 5000) {
      const potentialRrspContribution = Math.min(18000, data.income.employmentIncome * 0.18) - data.deductions.rrspContributions;
      const taxBracket = results.marginalTaxRate / 100;
      const potentialSavings = potentialRrspContribution * taxBracket;
      
      suggestions.push({
        id: '1',
        type: 'RRSP',
        title: 'Increase RRSP Contributions',
        description: `Consider contributing an additional $${potentialRrspContribution.toFixed(2)} to your RRSP to reduce your taxable income.`,
        potentialSavings,
        impact: potentialSavings > 2000 ? 'HIGH' : potentialSavings > 1000 ? 'MEDIUM' : 'LOW',
        isApplied: false
      });
    }
    
    // Home office deduction suggestion
    if (data.income.selfEmploymentIncome > 10000 && !data.deductions.homeOfficeClaims) {
      const potentialSavings = data.income.selfEmploymentIncome * 0.1;
      
      suggestions.push({
        id: '2',
        type: 'HOME_OFFICE',
        title: 'Claim Home Office Expenses',
        description: 'You have self-employment income but haven\'t claimed home office expenses. You may be eligible to deduct a portion of your home expenses.',
        potentialSavings,
        impact: potentialSavings > 2000 ? 'HIGH' : potentialSavings > 500 ? 'MEDIUM' : 'LOW',
        isApplied: false
      });
    }
    
    // Medical expenses suggestion
    if (data.deductions.medicalExpenses > 0 && data.deductions.medicalExpenses < 1000) {
      suggestions.push({
        id: '3',
        type: 'MEDICAL',
        title: 'Review Medical Expenses',
        description: 'You\'ve claimed some medical expenses. Make sure to include all eligible expenses like prescriptions, dental work, and eyeglasses.',
        potentialSavings: 150,
        impact: 'LOW',
        isApplied: false
      });
    }
    
    // Investment income suggestion
    if (data.income.investmentIncome > 5000) {
      suggestions.push({
        id: '4',
        type: 'INVESTMENT',
        title: 'Optimize Investment Income',
        description: 'Consider investing in tax-efficient funds or using Tax-Free Savings Accounts (TFSA) to minimize tax on your investment returns.',
        potentialSavings: data.income.investmentIncome * 0.05,
        impact: 'MEDIUM',
        isApplied: false
      });
    }
    
    return suggestions;
  };

  const handleSaveTaxData = async () => {
    try {
      setIsLoading(true);
      // In a real application, this would save to Firebase or your backend
      console.log('Saving tax data:', taxData);
      console.log('Calculation results:', calculationResults);
      console.log('AI suggestions:', aiSuggestions);
      
      // Navigate to tax report page
      navigate('/tax-report', { 
        state: { 
          taxData, 
          calculationResults, 
          aiSuggestions 
        } 
      });
    } catch (error) {
      console.error('Error saving tax data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stepTitles = ['Income Information', 'Deductions', 'Tax Credits', 'Summary & Suggestions'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tax Information</h1>
      
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center">
          {stepTitles.map((title, index) => (
            <React.Fragment key={index}>
              {/* Step circle */}
              <div 
                className={`relative flex items-center justify-center h-10 w-10 rounded-full border-2 ${
                  activeStep === index
                    ? 'border-blue-600 bg-blue-100'
                    : activeStep > index
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {activeStep > index ? (
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  <span className={activeStep === index ? 'text-blue-600' : 'text-gray-500'}>
                    {index + 1}
                  </span>
                )}
              </div>
              
              {/* Step title */}
              <div className={`ml-4 ${index < stepTitles.length - 1 ? 'flex-1' : ''}`}>
                <div className={`text-sm font-medium ${
                  activeStep >= index ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {title}
                </div>
                
                {/* Connecting line */}
                {index < stepTitles.length - 1 && (
                  <div className="hidden sm:block w-full mt-2">
                    <div className={`h-0.5 ${
                      activeStep > index ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Form content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="p-6">
          {activeStep === 0 && (
            <IncomeForm
              initialData={taxData.income}
              onSave={handleIncomeSubmit}
              onNext={() => setActiveStep(1)}
            />
          )}
          
          {activeStep === 1 && (
            <DeductionsForm
              initialData={taxData.deductions}
              onSave={handleDeductionsSubmit}
              onNext={() => setActiveStep(2)}
              onPrevious={() => setActiveStep(0)}
            />
          )}
          
          {activeStep === 2 && (
            <CreditsForm
              initialData={taxData.credits}
              onSave={handleCreditsSubmit}
              onNext={() => setActiveStep(3)}
              onPrevious={() => setActiveStep(1)}
            />
          )}
          
          {activeStep === 3 && (
            <div className="space-y-6">
              <TaxSummary
                taxData={taxData}
                calculationResults={calculationResults}
                isLoading={isLoading}
              />
              
              <AISuggestions
                suggestions={aiSuggestions}
                isLoading={isLoading}
              />
              
              <div className="flex justify-between pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Credits
                </button>
                
                <button
                  type="button"
                  onClick={handleSaveTaxData}
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Generate Tax Report'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxInput;