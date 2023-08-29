import React from 'react';

type Step = {
  icon: React.ReactNode;
  element: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
};

export const LocationStepper = (props: StepperProps) => {
  const { steps } = props;

  return (
    <ol className="relative text-gray-500 border-l border-dotted border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps.map(step => {
        return (
          <li className="pl-6 relative" key={`${step.icon}${step.element}`}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 top-9 ring-4 ring-white dark:ring-white-900">
              {step.icon}
            </span>
            {step.element}
          </li>
        );
      })}
    </ol>
  );
};
