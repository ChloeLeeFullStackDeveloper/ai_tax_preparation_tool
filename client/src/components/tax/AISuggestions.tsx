import { type } from 'os';
import React, { useState } from 'react';

interface AISuggestion {
  id: string;
  type: string;
  title: string;
  description: string;
  potentialSavings?: number;
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  isApplied: boolean;
}

interface AISuggestionsProps {
  suggestions: AISuggestion[];
  isLoading: boolean;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ suggestions, isLoading }) => {
  const [appliedSuggestions, setAppliedsuggestions] = useState<string[]>([]);

  if (isLoading) {
    return (
      <div className='p-4'>
        <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>AI Tax Optimization Suggestions</h3>
        <div className='animate-pulse space-y-4'>
          <div className='h-20 bg-gray-200 rounded'></div>
          <div className='h-20 bg-gray-200 rounded'></div>
        </div>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="bg-white rounded-md shadow-sm p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">AI Tax Optimization Suggestions</h3>
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                No tax optimization suggestions available at this time.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleApplySuggestion = (suggestionId: string) => {
    if (appliedSuggestions.includes(suggestionId)) {
      setAppliedsuggestions(appliedSuggestions.filter(id => id !== suggestionId));
    } else {
      setAppliedsuggestions([...appliedSuggestions, suggestionId]);
    }
  };

  const getImpactBadgeColor = (impact: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (impact) {
      case 'HIGH':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'RRSP':
        return (
          <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'HOME_OFFICE':
        return (
          <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        );
      case 'MEDICAL':
        return (
          <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        );
      case 'INVESTMENT':
        return (
          <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
          </svg>
        );
      default:
        return (
          <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

  return (
    <div className='bg-white rounded-md shadow-sm'>
      <div className='p-6'>
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">AI Tax Optimization Suggestions</h3>

        <div className='space-y-4'>
          {suggestions.map((suggestion) => {
            const isApplied = appliedSuggestions.includes(suggestion.id);

            return (
              <div
                key={suggestion.id}
                className={`border rounded-lg p-4 transition ${
                  isApplied
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className='flex items-start'>
                  <div className='flex-shrink-0 mt-1'>{getTypeIcon(suggestion.type)}</div>

                  <div className='ml-4 flex-1'>
                    <div className='flex items-center justify-between'>
                      <h4 className="text-base font-medium text-gray-900">{suggestion.title}</h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactBadgeColor(suggestion.impact)}`}>{suggestion.impact} IMPACT</span>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">{suggestion.description}</p>

                    {suggestion.potentialSavings && (
                      <div className='mt-2'>
                        <span className="text-sm font-medium text-gray-500">Potential Savings: </span>
                        <span className="font-medium text-green-600">{formatCurrency(suggestion.potentialSavings)}</span>
                      </div>
                    )}

                    <div className="mt-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => handleApplySuggestion(suggestion.id)}
                        className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-md shadow-sm ${
                          isApplied
                            ? 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                            : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <svg className="mr-1.5 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Applied
                          </>
                        ) : (
                          'Apply Suggestion'
                        )}
                      </button>

                      <button
                        type="button"
                        className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {appliedSuggestions.length > 0 && (
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  You've applied {appliedSuggestions.length} optimization{appliedSuggestions.length > 1 ? 's' : ''}. Your estimated tax savings will be reflected in your final tax calculation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;