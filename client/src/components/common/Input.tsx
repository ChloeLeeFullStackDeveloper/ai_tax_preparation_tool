// client/src/components/common/Input.tsx
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      prefix,
      suffix,
      className = "",
      wrapperClassName = "",
      labelClassName = "",
      inputClassName = "",
      errorClassName = "",
      hintClassName = "",
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseWrapperClasses = "flex flex-col space-y-1";
    const baseLabelClasses = "text-sm font-medium text-gray-700";
    const baseInputWrapperClasses = "relative rounded-md shadow-sm";
    const baseInputClasses =
      "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";
    const baseErrorClasses = "mt-1 text-sm text-red-600";
    const baseHintClasses = "mt-1 text-sm text-gray-500";

    // Error state classes
    const errorInputClasses =
      "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500";

    // Prefix/suffix classes
    const prefixClasses =
      "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 sm:text-sm";
    const suffixClasses =
      "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 sm:text-sm";

    // Adjust padding based on prefix/suffix
    const inputPaddingClasses = `
      ${prefix ? "pl-7" : ""}
      ${suffix ? "pr-7" : ""}
    `;

    return (
      <div className={`${baseWrapperClasses} ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`${baseLabelClasses} ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className={baseInputWrapperClasses}>
          {prefix && <span className={prefixClasses}>{prefix}</span>}
          <input
            ref={ref}
            className={`
              ${baseInputClasses}
              ${error ? errorInputClasses : ""}
              ${inputPaddingClasses}
              ${inputClassName}
              ${className}
            `}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.name}-error`
                : hint
                ? `${props.name}-hint`
                : undefined
            }
            {...props}
          />
          {suffix && <span className={suffixClasses}>{suffix}</span>}
        </div>
        {error && (
          <p
            className={`${baseErrorClasses} ${errorClassName}`}
            id={`${props.name}-error`}
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            className={`${baseHintClasses} ${hintClassName}`}
            id={`${props.name}-hint`}
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
