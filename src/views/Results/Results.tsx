import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { paths } from "@/router";
import { calculations, locations } from "@/api";
import { DateTime } from "luxon";
import queryString from "query-string";
import { useQuery } from "react-query";
import { Loader } from "@/components/ui/loader";
import { Error } from "@/components/ui/error";

export const Results = () => {
  const search = queryString.parse(location.search, { parseNumbers: true });

  const destinations = (search.destinations as string[]).map((destination) => {
    return locations.find((location) => location.city === destination);
  });

  const { data, isLoading, isError } = useQuery("calculations", () =>
    calculations(destinations)
  );

  console.log(data, isLoading, isError);

  if (isError) {
    return <Error />;
  }

  return (
    <Loader isLoading={isLoading}>
      <div>
        <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
          {data?.data?.pinPointDistance?.map(
            (destination: any, index: number) => {
              return (
                <div key={index}>
                  {destination.distance}
                  <h1 key={destination.city}>{destination.city}</h1>
                </div>
              );
            }
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
          <h6>{data?.data?.distanceInKm} km is total distance</h6>
          <h6>{search.passengers} passengers</h6>
          <h6>
            {DateTime.fromISO(
              new Date(search.date as string).toISOString()
            ).toFormat("MMM d, yyyy")}
          </h6>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
          <Button asChild>
            <NavLink to={paths.home}>Back</NavLink>
          </Button>
        </div>
      </div>
    </Loader>
  );
};
