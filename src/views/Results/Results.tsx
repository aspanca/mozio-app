import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { paths } from '@/router';
import { calculations, locations } from '@/api';
import { useQuery } from 'react-query';
import { Loader } from '@/components/ui/loader';
import { Error } from '@/components/ui/error';
import { DistanceStepper } from '@/components/ui/distance-stepper';
import { Circle, MapPin } from 'lucide-react';
import { formatDate, parseLocationSerch } from '@/utils';
import { City, Destination, PinPoint } from '@/shared';

export const Results = () => {
  const search = parseLocationSerch();

  const destinations: City[] = Array.isArray(search.destinations)
    ? (search.destinations as string[]).map(destination => {
        return locations.find(location => location.city === destination)!;
      })
    : [{ city: search.destinations as string }];

  const { data, isLoading, isError } = useQuery('calculations', () =>
    calculations(destinations as unknown as Destination[])
  );

  const { pinPointDistance, distanceInKm } = data ?? {};
  const { date, passengers } = search ?? {};

  if (isError) {
    return <Error />;
  }

  return (
    <Loader isLoading={isLoading}>
      <div className="w-[500px] m-auto">
        <div className="p-3">
          <DistanceStepper
            steps={
              pinPointDistance?.map((destination: PinPoint, index: number) => {
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
              }) ?? []
            }
          />
        </div>
        <div className="p-3 text-center">
          <h6>{distanceInKm} km is total distance</h6>
          <h6>{passengers} passengers</h6>
          <h6>{formatDate(date as string)}</h6>
        </div>
        <div className="p-3 text-center">
          <Button asChild>
            <NavLink to={paths.home}>Back</NavLink>
          </Button>
        </div>
      </div>
    </Loader>
  );
};
