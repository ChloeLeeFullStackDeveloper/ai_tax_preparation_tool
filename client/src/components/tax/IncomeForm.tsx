import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define validation schema
const schema = yup.object().shape({
  employmentIncome: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Amount cannot be negative')
    .default(0),
  selfEmploymentIncome: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Amount cannot be negative')
    .default(0),
  investmentIncome: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Amount cannot be negative')
    .default(0),
  rentalIncome: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Amount cannot be negative')
    .default(0),
  otherIncome: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Amount cannot be negative')
    .default(0),
  t4Slips: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Number of T4 slips cannot be negative')
    .integer('Number of T4 slips must be a whole number')
    .default(0),
});

interface IncomeFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onNext: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ initialData, onSave, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with default values or provided initial data
  const defaultValues = {
    employmentIncome: 0,
    selfEmploymentIncome: 0,
    investmentIncome: 0,
    rentalIncome: 0,
    otherIncome: 0,
    t4Slips: 0,
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      // Save form data
      await onSave(data);
      // Move to next step
      onNext();
    } catch (error) {
      console.error('Error saving income data:', error);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Income Information</h2>
      <p className="text-gray-600 mb-6">
        Enter your income from various sources for the current tax year.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Employment Income"
            name="employmentIncome"
            prefix="$"
            hint="Total income from employment (from T4 slips)"
            placeholder="0.00"
          />
          
          <InputField
            label="Number of T4 Slips"
            name="t4Slips"
            hint="Number of T4 slips you received"
            placeholder="0"
          />
        </div>

        <InputField
          label="Self-Employment Income"
          name="selfEmploymentIncome"
          prefix="$"
          hint="Income from self-employment (before expenses)"
          placeholder="0.00"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Investment Income"
            name="investmentIncome"
            prefix="$"
            hint="Dividends, interest, capital gains, etc."
            placeholder="0.00"
          />

          <InputField
            label="Rental Income"
            name="rentalIncome"
            prefix="$"
            hint="Income from rental properties (before expenses)"
            placeholder="0.00"
          />
        </div>

        <InputField
          label="Other Income"
          name="otherIncome"
          prefix="$"
          hint="Any other income not included above"
          placeholder="0.00"
        />

        <div className="mt-8 flex justify-end">
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
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Continue to Deductions'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;