import { CalculationsResult, Destination } from '@/shared';
import haversineDistance from 'haversine-distance';

const metersToKilometers = (meters: number): string => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2) + ' km';
};

export const calculations = (
  destinations: Destination[]
): Promise<CalculationsResult> => {
  const distance = destinations.reduce(
    (acc: number, el: Destination, index: number) =>
      (acc = destinations[index + 1]
        ? acc +
          haversineDistance(
            { latitude: el.lat, longitude: el.lng },
            {
              latitude: destinations[index + 1].lat,
              longitude: destinations[index + 1].lng,
            }
          )
        : acc),
    0
  );

  const pinPointDistance = destinations.map(
    (destination: Destination, index: number) => {
      if (index === destinations.length - 1) {
        return {
          ...destination,
          distance: null,
        };
      } else {
        return {
          ...destination,
          distance: metersToKilometers(
            haversineDistance(
              {
                latitude: destination.lat,
                longitude: destination.lng,
              },
              {
                latitude: destinations[index + 1].lat,
                longitude: destinations[index + 1].lng,
              }
            )
          ),
        };
      }
    }
  );

  const distanceInKm = metersToKilometers(distance);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        destinations
          .map((destination: Destination) => destination.city)
          .includes('Dijon')
      ) {
        reject(new Error('An unexpected error occurred!'));
      } else {
        resolve({
          pinPointDistance,
          distanceInKm,
        });
      }
    }, 500);
  });
};
