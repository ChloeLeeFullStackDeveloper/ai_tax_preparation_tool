import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import TaxSummary from "../components/tax/TaxSummary";
import AISuggestions from "../components/tax/AISuggestions";

const TaxReport: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { taxData, calculationResults, aiSuggestions } = location.state || {
    taxData: null,
    calculationResults: null,
    aiSuggestions: [],
  };

  React.useEffect(() => {
    if (!taxData || !calculationResults) {
      navigate("/tax-input");
    }
  }, [taxData, calculationResults, navigate]);

  if (!taxData || !calculationResults) {
    return (
      <div className="max-2-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900">
            No tax data available
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please complete your tax information first.
          </p>
          <button
            onClick={() => navigate("/tax-input")}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Enter Tax Information
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real application, this would initiate the CRA filing process
    alert("CRA filing would be implemented here");
  };

  const handleFileWithCRA = () => {
    // In a real application, this would initiate the CRA filing process
    try {
      setIsLoading(true);
      // Simulate API call to CRA
      setTimeout(() => {
        // Success handling
        alert("Tax return has been successfully submitted to CRA!");
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error filing with CRA:", error);
      alert("Failed to file with CRA. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tax Report</h1>
        <div className="print:hidden">
          <button
            onClick={() => navigate("/tax-input")}
            className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Edit Tax Information
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Print Report
          </button>
        </div>
      </div>

      <div
        ref={reportRef}
        className="bg-white shadow overflow-hidden sm:rounded-lg"
      >
        <div className="px-4 py-5 sm:px-6 flex justify-between">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Tax Summary Report
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Tax Year 2024
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Generated on</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(new Date())}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Taxpayer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="mt-1 text-sm text-gray-900">
                {currentUser?.displayName || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-sm text-gray-900">
                {currentUser?.email || "Not provided"}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <TaxSummary
            taxData={taxData}
            calculationResults={calculationResults}
            isLoading={false}
          />
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 print:hidden">
          <AISuggestions suggestions={aiSuggestions} isLoading={false} />
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Income Details
          </h3>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Income Source
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Employment Income
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.income.employmentIncome)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Self-Employment Income
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.income.selfEmploymentIncome)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Investment Income
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.income.investmentIncome)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Rental Income
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.income.rentalIncome)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Other Income
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.income.otherIncome)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900">
                    Total Income
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm font-semibold text-gray-900">
                    {formatCurrency(calculationResults.totalIncome)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Deductions</h3>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Deduction Type
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    RRSP Contributions
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.deductions.rrspContributions)}
                  </td>
                </tr>
                {taxData.deductions.homeOfficeClaims && (
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      Home Office Expenses
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                      Claimed ({taxData.deductions.homeOfficePercentage}%)
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Child Care Expenses
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.deductions.childCareExpenses)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Moving Expenses
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.deductions.movingExpenses)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Union Dues
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.deductions.unionDues)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Medical Expenses
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.deductions.medicalExpenses)}
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    Other Deductions
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm text-gray-500">
                    {formatCurrency(taxData.deductions.otherDeductions)}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900">
                    Total Deductions
                  </td>
                  <td className="whitespace-nowrap py-4 px-3 text-right text-sm font-semibold text-gray-900">
                    {formatCurrency(calculationResults.totalDeductions)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Credits Claimed
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(taxData.credits).map(([key, value]) => {
              if (value) {
                return (
                  <div key={key} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-700">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, function (str) {
                          return str.toUpperCase();
                        })}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Tax Result</h3>
            {calculationResults.refundAmount > 0 ? (
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">
                  Refund Amount
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(calculationResults.refundAmount)}
                </p>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">
                  Balance Owing
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(calculationResults.balanceOwing)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6 print:hidden">
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                  clipRule="evenodd"
                />
              </svg>
              Download PDF
            </button>
            <button
              onClick={handleFileWithCRA}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              File with CRA
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 print:hidden">
        <p>
          This tax report is for informational purposes only and does not
          constitute professional tax advice.
        </p>
        <p>
          Please consult with a qualified tax professional before filing your
          taxes.
        </p>
      </div>
    </div>
  );
};

export default TaxReport;
