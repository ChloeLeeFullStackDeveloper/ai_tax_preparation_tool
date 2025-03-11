import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Define the form schema
const schema = yup.object().shape({
  rrspContributions: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  homeOfficeClaims: yup.boolean().default(false),
  homeOfficePercentage: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Percentage cannot be negative")
    .max(100, "Percentage cannot exceed 100%")
    .default(0)
    .when("homeOfficeClaims", {
      is: true,
      then: (schema) =>
        schema.required(
          "Home office percentage is required when claiming home office expenses"
        ),
    }),
  childCareExpenses: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  movingExpenses: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  unionDues: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  toolExpenses: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  medicalExpenses: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  charitableDonations: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  studentLoanInterest: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  tuitionAmount: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
  otherDeductions: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, "Amount cannot be negative")
    .default(0),
});

interface DeductionsFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const DeductionsForm: React.FC<DeductionsFormProps> = ({
  initialData,
  onSave,
  onNext,
  onPrevious,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
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
      otherDeductions: 0,
    },
  });

  const homeOfficeClaims = watch("homeOfficeClaims");

  const onSubmit = (data: any) => {
    setIsLoading(true);
    // In a real application, you might want to validate or process the data further
    setTimeout(() => {
      onSave(data);
      setIsLoading(false);
    }, 500); // Simulate API call
  };

  const InputField = ({
    label,
    name,
    prefix,
    hint,
    type = "number",
    ...rest
  }: any) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type={type}
          id={name}
          className={`block w-full rounded-md sm:text-sm ${
            prefix ? "pl-7" : "pl-3"
          } pr-3 py-2 border ${
            errors[name]
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          {...register(name)}
          {...rest}
        />
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {errors[name]?.message as string}
        </p>
      )}
      {hint && !errors[name] && (
        <p className="mt-1 text-sm text-gray-500" id={`${name}-description`}>
          {hint}
        </p>
      )}
    </div>
  );

  const CheckboxField = ({ label, name, hint, ...rest }: any) => (
    <div className="mb-4 relative flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          id={name}
          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          {...register(name)}
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="font-medium text-gray-700">
          {label}
        </label>
        {hint && <p className="text-gray-500">{hint}</p>}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tax Deductions</h2>
      <p className="text-gray-600 mb-6">
        Enter your eligible deductions to reduce your taxable income.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          RRSP & Retirement
        </h3>
        <InputField
          label="RRSP Contributions"
          name="rrspContributions"
          prefix="$"
          hint="Contributions made to Registered Retirement Savings Plans"
          placeholder="0.00"
        />

        <h3 className="text-lg font-medium text-gray-900 mb-4 mt-8">
          Employment & Work Expenses
        </h3>
        <div className="space-y-4">
          <CheckboxField
            label="Home Office Expenses"
            name="homeOfficeClaims"
            hint="Check if you work from home and want to claim home office expenses"
          />

          {homeOfficeClaims && (
            <InputField
              label="Home Office Percentage"
              name="homeOfficePercentage"
              hint="Percentage of your home used for work"
              placeholder="0"
              suffix="%"
            />
          )}

          <InputField
            label="Union Dues"
            name="unionDues"
            prefix="$"
            hint="Annual union or professional dues"
            placeholder="0.00"
          />

          <InputField
            label="Tools & Equipment"
            name="toolExpenses"
            prefix="$"
            hint="Tools and equipment purchased for work"
            placeholder="0.00"
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-4 mt-8">
          Personal Deductions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Child Care Expenses"
            name="childCareExpenses"
            prefix="$"
            hint="Expenses paid for child care services"
            placeholder="0.00"
          />

          <InputField
            label="Moving Expenses"
            name="movingExpenses"
            prefix="$"
            hint="Expenses related to relocating for work"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Medical Expenses"
            name="medicalExpenses"
            prefix="$"
            hint="Eligible medical expenses not covered by insurance"
            placeholder="0.00"
          />

          <InputField
            label="Charitable Donations"
            name="charitableDonations"
            prefix="$"
            hint="Donations to registered charities"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Student Loan Interest"
            name="studentLoanInterest"
            prefix="$"
            hint="Interest paid on student loans"
            placeholder="0.00"
          />

          <InputField
            label="Tuition Fees"
            name="tuitionAmount"
            prefix="$"
            hint="Tuition fees paid to eligible institutions"
            placeholder="0.00"
          />
        </div>

        <InputField
          label="Other Deductions"
          name="otherDeductions"
          prefix="$"
          hint="Any other eligible deductions"
          placeholder="0.00"
        />

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Income
          </button>

          <div>
            <button
              type="button"
              onClick={() => reset()}
              className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Continue to Credits"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeductionsForm;
