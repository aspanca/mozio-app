import { Box } from "@/components/ui/box";

type TripInfoProps = {
  distanceInKm?: string;
  passengers?: number;
  date: string;
};

export const TripInfo = (props: TripInfoProps) => {
  const { distanceInKm, passengers, date } = props;
  return (
    <Box className="p-3 text-center">
      <h6>{distanceInKm} is total distance</h6>
      <h6>{passengers} passengers</h6>
      <h6>{date}</h6>
    </Box>
  );
};
