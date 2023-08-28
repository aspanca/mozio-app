import { CalculationsResultType, CityType, LocationType } from '@/shared';
import haversineDistance from 'haversine-distance';

const metersToKilometers = (meters: number): string => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2) + ' km';
};

export const calculations = (
  cities: LocationType[]
): Promise<CalculationsResultType> => {
  const distance = cities.reduce(
    (acc: number, el: LocationType, index: number) =>
      (acc = cities[index + 1]
        ? acc +
          haversineDistance(
            { latitude: el.lat, longitude: el.lng },
            {
              latitude: cities[index + 1].lat,
              longitude: cities[index + 1].lng,
            }
          )
        : acc),
    0
  );

  const pinPointDistance = cities.map((city: LocationType, index: number) => {
    if (index === cities.length - 1) {
      return {
        ...city,
        distance: null,
      };
    } else {
      return {
        ...city,
        distance: metersToKilometers(
          haversineDistance(
            {
              latitude: city.lat,
              longitude: city.lng,
            },
            {
              latitude: cities[index + 1].lat,
              longitude: cities[index + 1].lng,
            }
          )
        ),
      };
    }
  });

  const distanceInKm = metersToKilometers(distance);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cities.map((city: CityType) => city.city).includes('Dijon')) {
        reject(new Error('An unexpected error occurred!'));
      } else {
        resolve({
          pinPointDistance,
          distanceInKm,
        });
      }
    }, 300);
  });
};
