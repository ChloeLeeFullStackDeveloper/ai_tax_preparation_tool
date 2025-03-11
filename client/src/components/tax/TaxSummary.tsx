import React from "react";

interface TaxSummaryProps {
  taxData: any;
  calculationResults: any;
  isLoading: boolean;
}

const TaxSummary: React.FC<TaxSummaryProps> = ({
  taxData,
  calculationResults,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!calculationResults) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">
          Tax calculation results will appear here.
        </p>
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

  return (
    <div className="bg-white overflow-hidden">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        Tax Summary
      </h3>

      <div className="border rounded-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Income &amp; Tax Summary
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Tax year 2023 calculation results.
          </p>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Total Income
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(calculationResults.totalIncome)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Taxable Income
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(calculationResults.taxableIncome)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Federal Tax</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(calculationResults.federalTaxAmount)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Provincial Tax
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(calculationResults.provincialTaxAmount)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Total Deductions
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(calculationResults.totalDeductions)}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">
                Total Credits
              </dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {formatCurrency(calculationResults.totalCredits)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <div>
              <dt className="text-base font-medium text-gray-900">
                Tax Result
              </dt>
              <dd className="mt-1 text-sm text-gray-500">
                {calculationResults.refundAmount > 0
                  ? "You will receive a refund"
                  : "You have a balance owing"}
              </dd>
            </div>

            {calculationResults.refundAmount > 0 ? (
              <div className="text-right">
                <dt className="text-sm font-medium text-green-600">
                  Refund Amount
                </dt>
                <dd className="mt-1 text-2xl font-bold text-green-600">
                  {formatCurrency(calculationResults.refundAmount)}
                </dd>
              </div>
            ) : (
              <div className="text-right">
                <dt className="text-sm font-medium text-red-600">
                  Balance Owing
                </dt>
                <dd className="mt-1 text-2xl font-bold text-red-600">
                  {formatCurrency(calculationResults.balanceOwing)}
                </dd>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Marginal Tax Rate
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {calculationResults.marginalTaxRate}%
            </dd>
            <p className="mt-2 text-sm text-gray-500">
              This is the tax rate applied to your next dollar of income.
            </p>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Effective Tax Rate
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {calculationResults.effectiveTaxRate.toFixed(2)}%
            </dd>
            <p className="mt-2 text-sm text-gray-500">
              Your average tax rate on all of your income.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxSummary;
