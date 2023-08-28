import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { paths } from "@/router";
import { calculations, locations } from "@/api";
import { DateTime } from "luxon";
import { useQuery } from "react-query";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";
import { DistanceStepper } from "@/components/ui/distance-stepper";
import { Circle, MapPin } from "lucide-react";
import { parseLocationSerch } from "@/utils";

export const Results = () => {
  const search = parseLocationSerch();

  const destinations = Array.isArray(search.destinations)
    ? (search.destinations as string[]).map((destination) => {
        return locations.find((location) => location.city === destination);
      })
    : [search.destinations];

  const { data, isLoading, isError } = useQuery("calculations", () =>
    calculations(destinations)
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
            steps={pinPointDistance?.map((destination: any, index: number) => {
              return {
                icon:
                  index === data?.pinPointDistance.length - 1 ? (
                    <MapPin size={16} className="text-red-500" />
                  ) : (
                    <Circle size={16} />
                  ),
                element: destination.city,
                distance: destination.distance,
              };
            })}
          />
        </div>
        <div className="p-3 text-center">
          <h6>{distanceInKm} km is total distance</h6>
          <h6>{passengers} passengers</h6>
          <h6>
            {DateTime.fromISO(new Date(date as string).toISOString()).toFormat(
              "MMM d, yyyy"
            )}
          </h6>
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
