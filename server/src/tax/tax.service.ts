import { Injectable } from '@nestjs/common';
import { firebaseAdmin } from '../firebase.config';

@Injectable()
export class TaxService {
  async saveTaxData(userId: string, taxData: any) {
    try {
      const db = firebaseAdmin.firestore();
      const docRef = await db.collection('tax-returns').add({
        userId,
        ...taxData,
        createdAt: new Date(),
      });

      return { id: docRef.id, ...taxData };
    } catch (error) {
      throw new Error(`Failed to save tax data: ${error.message}`);
    }
  }

  async calculateTax(taxData: any) {
    // Simplified tax calculation logic
    const totalIncome = this.calculateTotalIncome(taxData.income);
    const totalDeductions = this.calculateTotalDeductions(taxData.deductions);
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);

    // Calculate federal tax (simplified)
    let federalTax = 0;
    if (taxableIncome <= 49020) {
      federalTax = taxableIncome * 0.15;
    } else if (taxableIncome <= 98040) {
      federalTax = 49020 * 0.15 + (taxableIncome - 49020) * 0.205;
    } else if (taxableIncome <= 151978) {
      federalTax =
        49020 * 0.15 + (98040 - 49020) * 0.205 + (taxableIncome - 98040) * 0.26;
    } else if (taxableIncome <= 216511) {
      federalTax =
        49020 * 0.15 +
        (98040 - 49020) * 0.205 +
        (151978 - 98040) * 0.26 +
        (taxableIncome - 151978) * 0.29;
    } else {
      federalTax =
        49020 * 0.15 +
        (98040 - 49020) * 0.205 +
        (151978 - 98040) * 0.26 +
        (216511 - 151978) * 0.29 +
        (taxableIncome - 216511) * 0.33;
    }

    // Simplified provincial tax
    const provincialTax = taxableIncome * 0.08; // Simplified rate

    // Calculate total tax
    const totalTax = federalTax + provincialTax;

    return {
      totalIncome,
      totalDeductions,
      taxableIncome,
      federalTax,
      provincialTax,
      totalTax,
    };
  }

  private calculateTotalIncome(income: any) {
    return (
      income.employmentIncome +
      income.selfEmploymentIncome +
      income.investmentIncome +
      income.rentalIncome +
      income.otherIncome
    );
  }

  private calculateTotalDeductions(deductions: any) {
    return (
      deductions.rrspContributions +
      deductions.childCareExpenses +
      deductions.movingExpenses +
      deductions.unionDues +
      deductions.medicalExpenses +
      deductions.charitableDonations +
      deductions.otherDeductions
    );
  }
}
