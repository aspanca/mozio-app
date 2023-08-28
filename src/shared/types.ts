export type PinPoint = {
  lat: number;
  lng: number;
  city: string;
  distance: string | null;
};

export type CalculationsResult = {
  pinPointDistance: PinPoint[];
  distanceInKm: string;
};

export type Destination = {
  lat: number;
  lng: number;
  city: string;
};

export type City = {
  city: string;
};

export type SearchParamsType = {
  date: Date;
  passengers: number;
  destinations: string[];
};

export type FormObjectType = {
  date: Date;
  passengers: number;
  destinations: City[];
};

type SearchKeys = 'destinations' | 'date' | 'passengers';
type DestinationKeys = `destinations.${number}` | `destinations.${number}.city`;

export type ValidKeys = SearchKeys | DestinationKeys;
