import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  basicPersonalAmount: yup.boolean().default(true),
  spouseAmount: yup.boolean().default(false),
  canadaCaregiver: yup.boolean().default(false),
  eligibleDependant: yup.boolean().default(false),
  canadaEmployment: yup.boolean().default(true),
  disabilityAmount: yup.boolean().default(false),
  interestDividends: yup.boolean().default(false),
  pensionIncome: yup.boolean().default(false),
  educationAmount: yup.boolean().default(false),
  gstHstRebate: yup.boolean().default(true),
  ccb: yup.boolean().default(false),
  witb: yup.boolean().default(false),
});

interface CreditsFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CreditsForm: React.FC<CreditsFormProps> = ({
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
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
      witb: false,
    },
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    //In a real application, you might want to validate or process the data further
    setTimeout(() => {
      onSave(data);
      setIsLoading(false);
    }, 500); // Simulate API call
  };

  const CheckboxField = ({ label, name, hint, ...rest }: any) => (
    <div className="relative flex items-start mb-4">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          id={name}
          className="focus:ring-blue-500 h-4 2-4 text-blue-600 border-gray-300 rounded"
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
      <h2 className="text-xl font-semibold mb-4">Tax Credits</h2>
      <p className="text-gray-600 mb-6">
        Select the tax credits you're eligible for. These will reduce your tax
        payable.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Personal Credits
        </h3>
        <div className="space-y-2">
          <CheckboxField
            label="Basic Personal Amount"
            name="basicPersonalAmount"
            hint="Basic non-refundable tax credit avaiable to all taxpayers"
          />
          <CheckboxField
            label="Spouse or Common-law Partner Amount"
            name="spouseAmount"
            hint="Credit for supporting a spouse or common-law partner"
          />

          <CheckboxField
            label="Canada Caregiver Credit"
            name="canadaCaregiver"
            hint="Credit for providing care to a dependent with a physical or mental impairment"
          />

          <CheckboxField
            label="Eligible Dependant Credit"
            name="eligibleDependant"
            hint="Credit for supporting a dependent (other than a spouse)"
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-4 mt-8">
          Employment & Income Credits
        </h3>
        <div className="space-y-2">
          <CheckboxField
            label="Canada Employment Amount"
            name="canadaEmployment"
            hint="Credit for employment income"
          />

          <CheckboxField
            label="Disability Tax Credit"
            name="disabilityAmount"
            hint="Credit for individuals with severe and prolonged impairments"
          />

          <CheckboxField
            label="Interest and Dividend Tax Credit"
            name="interestDividends"
            hint="Credit for eligible dividends and interest income"
          />

          <CheckboxField
            label="Pension Income Amount"
            name="pensionIncome"
            hint="Credit for eligible pension income"
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-4 mt-8">
          Additional Credits & Benefits
        </h3>
        <div className="space-y-2">
          <CheckboxField
            label="Education and Textbook Amount"
            name="educationAmount"
            hint="Credit for post-secondary education expenses"
          />

          <CheckboxField
            label="GST/HST Credit"
            name="gstHstRebate"
            hint="Tax-free quarterly payment for low and modest-income individuals and families"
          />

          <CheckboxField
            label="Canada Child Benefit (CCB)"
            name="ccb"
            hint="Tax-free monthly payment for eligible families with children under 18"
          />

          <CheckboxField
            label="Working Income Tax Benefit (WITB)"
            name="witb"
            hint="Refundable tax credit for low-income individuals and families"
          />
        </div>
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Deductions
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
                "Continue to Summary"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditsForm;
