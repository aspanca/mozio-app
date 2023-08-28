type SearchKeys = 'cities' | 'date' | 'passengers';
type DestinationKeys = `cities.${number}` | `cities.${number}.city`;

export type ValidKeys = SearchKeys | DestinationKeys;

export type QueryParamsType = {
  date?: string;
  cities?: string | string[];
  passengers?: number;
};

export type CityType = {
  city: string;
};

export type LocationType = {
  lat: number;
  lng: number;
  city: string;
};

export type FormObjectTypeT = {
  passengers: number;
  date: Date;
  cities: CityType[];
};

export type PinPointType = LocationType & {
  distance: string | null;
};

export type CalculationsResultType = {
  pinPointDistance: PinPointType[];
  distanceInKm: string;
};

export type StringifiedQueryParamsType = {
  passengers: number;
  date: Date;
  cities: string[];
};
