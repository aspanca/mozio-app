import queryString from "query-string";

export const parseLocationSerch = () => {
  return queryString.parse(location.search, { parseNumbers: true });
};

export const stringifySearch = (data: any) => {
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
    date: new Date(search.date as string),
    destinations: (search?.destinations as string[])?.map((destination) => {
      return {
        city: destination,
      };
    }),
  };
};

export const constructSearchObjectFromForm = (data: any) => {
  return {
    passengers: data.passengers as number,
    date: data.date,
    destinations: data.destinations.map((destination: any) => destination.city),
  };
};
