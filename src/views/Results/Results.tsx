import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { paths } from "@/router";
import queryString from "query-string";
import { locations } from "@/api";
import haversineDistance from "haversine-distance";

const metersToKilometers = (meters: number): string => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2); // Rounds to 2 decimal places
}

export const Results = () => {
  const search = queryString.parse(location.search, { parseNumbers: true });

  const destinations = (search.destinations as string[]).map((destination) => {
    return locations.find((location) => location.city === destination);
  });

  const distance = destinations.reduce(
    (acc, el: any, index: number) =>
      (acc = destinations[index + 1]
        ? acc +
          haversineDistance(
            { latitude: el.lat, longitude: el.lng },
            {
              latitude: (destinations[index + 1] as any).lat,
              longitude: (destinations[index + 1] as any).lng,
            }
          )
        : acc),
    0
  );

  const pinPointDistance = destinations.map((destination, index) => {
    if(index === 0 ){
      return {
        ...destination,
        distance: null
      }
    } else {
      return {
        ...destination,
        distance:  metersToKilometers(haversineDistance(
          { latitude: (destination as any).lat, longitude: (destination as any).lng },
          {
            latitude: (destinations[index - 1] as any).lat,
            longitude: (destinations[index - 1] as any).lng,
          }
        ))
      }
    }
  });


  const distanceInKm =  metersToKilometers(distance);

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
        {pinPointDistance.map((destination: any) => {
          return <div>
            {destination.distance}
            <h1 key={destination.city}>{destination.city}</h1>
          </div>;
        })}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
        <h6>{distanceInKm} km is total distance</h6>
        <h6>{search.passengers} passengers</h6>
        <h6>{search.date}</h6>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
        <Button asChild>
          <NavLink to={paths.home}>Back</NavLink>
        </Button>
      </div>
    </div>
  );
};
