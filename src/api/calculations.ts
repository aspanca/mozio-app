import haversineDistance from "haversine-distance";

const metersToKilometers = (meters: number): string => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2) + " km";
};

export const calculations = (destinations: any): any => {
  const distance = destinations.reduce(
    (acc: number, el: any, index: number) =>
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

  const pinPointDistance = destinations.map(
    (destination: any, index: number) => {
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
                latitude: (destination as any).lat,
                longitude: (destination as any).lng,
              },
              {
                latitude: (destinations[index + 1] as any).lat,
                longitude: (destinations[index + 1] as any).lng,
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
          .map((destination: any) => destination.city)
          .includes("Dijon")
      ) {
        reject(new Error("An unexpected error occurred!"));
      } else {
        resolve({
          pinPointDistance,
          distanceInKm,
        });
      }
    }, 500);
  });
};
