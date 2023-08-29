import { calculations, locations } from '@/api';
import { useQuery } from 'react-query';
import { parseLocationSerch } from '@/utils';
import { LocationType, QueryParamsType } from '@/shared';
import { useNavigate } from 'react-router-dom';

export const useSearchResults = () => {
  const navigate = useNavigate();

  const search: QueryParamsType = parseLocationSerch();

  const cities: LocationType[] = Array.isArray(search.cities)
    ? search.cities.map(city => {
        return locations.find(
          (location: LocationType) => location.city === city
        ) as LocationType;
      })
    : [
        locations.find(
          (location: LocationType) => location.city === search.cities
        ) as LocationType,
      ];

  const { data, isLoading, isError } = useQuery('calculations', () =>
    calculations(cities)
  );

  const { pinPointDistance, distanceInKm } = data ?? {};
  const { date, passengers } = search ?? {};

  const goBack = () => {
    navigate(-1);
  };

  return {
    pinPointDistance,
    distanceInKm,
    date,
    passengers,
    isLoading,
    isError,
    goBack,
  };
};
