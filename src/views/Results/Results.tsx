import { Loader } from '@/components/ui/loader';
import { Error } from '@/components/ui/error';
import { formatDate } from '@/utils';
import { useSearchResults } from '@/hooks';
import { TripInfo } from './TripInfo';
import { BackButton } from './BackButton';
import { TripLocations } from './TripLocations';
import { Box } from '@/components/ui/box';

export const Results = () => {
  const {
    pinPointDistance,
    distanceInKm,
    date,
    passengers,
    isLoading,
    isError,
    goBack,
  } = useSearchResults();

  if (isError) {
    return <Error />;
  }

  return (
    <Loader isLoading={isLoading}>
      <Box className="w-[500px] m-auto">
        <TripLocations pinPointDistance={pinPointDistance} />
        <TripInfo
          distanceInKm={distanceInKm}
          passengers={passengers}
          date={formatDate(new Date(date as string))}
        />
        <BackButton goBack={goBack} />
      </Box>
    </Loader>
  );
};
