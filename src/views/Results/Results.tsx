import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { paths } from '@/router';
import { Loader } from '@/components/ui/loader';
// import { Error } from '@/components/ui/error';
import { DistanceStepper } from '@/components/ui/distance-stepper';
import { Circle, MapPin } from 'lucide-react';
import { formatDate } from '@/utils';
import { PinPointType } from '@/shared';
import { useSearchResults } from '@/hooks';

export const Results = () => {
  const {
    pinPointDistance,
    distanceInKm,
    date,
    passengers,
    isLoading,
    isError,
  } = useSearchResults();

  if (isError) {
    return <h1>HELLO</h1>;
  }

  return (
    <Loader isLoading={isLoading}>
      <div className="w-[500px] m-auto">
        <div className="p-3">
          <DistanceStepper
            steps={
              pinPointDistance?.map(
                (destination: PinPointType, index: number) => {
                  return {
                    icon:
                      index === pinPointDistance.length - 1 ? (
                        <MapPin size={16} className="text-red-500" />
                      ) : (
                        <Circle size={16} />
                      ),
                    element: destination.city,
                    distance: destination.distance,
                  };
                }
              ) ?? []
            }
          />
        </div>
        <div className="p-3 text-center">
          <h6>{distanceInKm} is total distance</h6>
          <h6>{passengers} passengers</h6>
          <h6>{formatDate(new Date(date as string))}</h6>
        </div>
        <div className="p-3 text-center">
          <Button asChild data-testid="back">
            <NavLink to={paths.home}>Back</NavLink>
          </Button>
        </div>
      </div>
    </Loader>
  );
};
