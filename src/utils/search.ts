import {
  CityType,
  FormObjectTypeT,
  QueryParamsType,
  StringifiedQueryParamsType,
} from '@/shared';
import queryString from 'query-string';

export const parseLocationSerch = (): QueryParamsType => {
  return queryString.parse(location.search, { parseNumbers: true });
};

export const stringifySearch = (data: StringifiedQueryParamsType) => {
  return queryString.stringify(data);
};

export const isSearchValid = () => {
  const search: QueryParamsType = parseLocationSerch();

  if (!search.date) return false;
  if (!search.passengers) return false;
  if (!search.cities) return false;

  return true;
};

export const constructFormObjectFromSearch = (): FormObjectTypeT => {
  const search: QueryParamsType = parseLocationSerch();

  const parseCity = (city: string | undefined): CityType => ({
    city: city ?? '',
  });

  return {
    passengers: search.passengers ?? 0,
    date: search.date ? new Date(search.date) : new Date(),
    cities: Array.isArray(search.cities)
      ? search.cities.map(parseCity)
      : [parseCity(search.cities)],
  };
};

export const constructSearchObjectFromForm = (data: FormObjectTypeT) => {
  return {
    passengers: data.passengers as number,
    date: data.date,
    cities: data.cities.map((destination: CityType) => destination.city),
  };
};

export const updateQueryParams = (values: FormObjectTypeT) => {
  const url = new URL(window.location.href);

  if (values.date) url.searchParams.set('date', values.date.toString());
  else url.searchParams.delete('date');

  url.searchParams.delete('cities');
  values.cities.forEach(destination => {
    if (destination.city)
      url.searchParams.append('cities', destination.city.toString());
  });

  if (values.passengers)
    url.searchParams.set('passengers', values.passengers.toString());
  else url.searchParams.delete('passengers');

  window.history.pushState(null, '', url.toString());
};
