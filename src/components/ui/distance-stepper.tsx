import { Badge } from "@/components/ui/badge";
import { IF } from "../IF";

type Step = {
  icon: React.ReactNode;
  element: React.ReactNode;
  distance: string;
};

type DistanceStepperProps = {
  steps: Step[];
};

export const DistanceStepper = (props: DistanceStepperProps) => {
  const { steps } = props;

  return (
    <ol className="relative border-l w-[500px] left-[100%] transform -translate-x-1/2">
      {steps.map((step, index) => {
        return (
          <li className="mb-10 pl-6 relative" key={index}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -left-3 top-0">
              {step.icon}
            </span>
            <h3>{step.element}</h3>
            <IF condition={Boolean(step.distance)}>
              <div className="absolute transform top-[50%] translate-y-1/2 -left-[110px]">
                <Badge variant="outline">{step.distance}</Badge>
              </div>
            </IF>
          </li>
        );
      })}
    </ol>
  );
};
