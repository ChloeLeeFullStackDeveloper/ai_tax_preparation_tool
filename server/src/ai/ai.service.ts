import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  generateTaxSuggestions(taxData: any, calculateResults: any) {
    const suggestions = [];

    // Example RRSP suggestion
    if (
      taxData.income.employmentIncome > 60000 &&
      (!taxData.deductions.rrspContributions ||
        taxData.deductions.rrspContributions < 5000)
    ) {
      const maxRrspContribution = Math.min(
        taxData.income.employmentIncome * 0.18,
        27830, // 2021 RRSP maximum
      );

      const currentContribution = taxData.deductions.rrspContributions || 0;
      const potentialAdditionalContribution =
        maxRrspContribution - currentContribution;

      if (potentialAdditionalContribution > 1000) {
        suggestions.push({
          type: 'RRSP',
          title: 'Increase RRSP Contribution',
          description: `Consider contributing an additional $${potentialAdditionalContribution.toFixed(2)} to your RRSP. This could reduce your taxable income and save approximately $${(potentialAdditionalContribution * 0.3).toFixed(2)} in taxes.`,
          potentialSavings: potentialAdditionalContribution * 0.3,
          impact: 'HIGH',
        });
      }
    }
    // Home office suggestion for self-employed
    if (taxData.income.selfEmploymentIncome > 5000) {
      suggestions.push({
        type: 'HOME_OFFICE',
        title: 'Claim Home Office Expenses',
        description:
          'As a self-employed individual, you may be eligible to claim home office expenses. Consider claiming a portion of your rent/mortgage, utilities, and internet costs.',
        potentialSavings: taxData.income.selfEmploymentIncome * 0.05,
        impact: 'MEDIUM',
      });
    }

    return suggestions;
  }
}
