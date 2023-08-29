import { DistanceStepper } from '@/components/ui/distance-stepper';
import { PinPointType } from '@/shared';
import { Box, Circle, MapPin } from 'lucide-react';

type TripLocationsProps = {
  pinPointDistance?: PinPointType[];
};

const renderIcon = (isLastItem: boolean) => {
  if (isLastItem) {
    return <MapPin size={16} className="text-red-500" />;
  }

  return <Circle size={16} />;
};

export const TripLocations = (props: TripLocationsProps) => {
  const { pinPointDistance } = props;

  return (
    <Box className="p-3">
      <DistanceStepper
        steps={
          pinPointDistance?.map((destination: PinPointType, index: number) => {
            return {
              icon: renderIcon(index === pinPointDistance.length - 1),
              element: destination.city,
              distance: destination.distance,
            };
          }) ?? []
        }
      />
    </Box>
  );
};
