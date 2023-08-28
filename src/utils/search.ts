import { City, FormObjectType, SearchParamsType } from '@/shared';
import queryString from 'query-string';

export const parseLocationSerch = () => {
  return queryString.parse(location.search, { parseNumbers: true });
};

export const stringifySearch = (data: SearchParamsType) => {
  return queryString.stringify(data);
};

export const isSearchValid = () => {
  const search = parseLocationSerch();

  if (!search.date) return false;
  if (!search.passengers) return false;
  if (!search.destinations) return false;

  return true;
};

export const constructFormObjectFromSearch = () => {
  const search = parseLocationSerch();

  return {
    passengers: search.passengers as number,
    date: search.date ? new Date(search.date as string) : new Date(),
    destinations: Array.isArray(search?.destinations)
      ? (search?.destinations as string[])?.map(destination => {
          return {
            city: destination as string,
          };
        })
      : [{ city: search.destinations as string }],
  };
};

export const constructSearchObjectFromForm = (data: FormObjectType) => {
  return {
    passengers: data.passengers as number,
    date: data.date,
    destinations: data.destinations.map(
      (destination: City) => destination.city
    ),
  };
};

export const updateQueryParams = (values: FormObjectType) => {
  const url = new URL(window.location.href);

  if (values.date) {
    url.searchParams.set('date', values.date?.toString());
  }

  if (values.destinations.length) {
    url.searchParams.delete('destinations');
    values.destinations.forEach((destination: City) => {
      url.searchParams.append('destinations', destination?.city.toString());
    });
  }

  if (values.passengers) {
    url.searchParams.set('passengers', values.passengers?.toString());
  }

  window.history.pushState(null, '', url.toString());
};
