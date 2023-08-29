import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';

type BackButtonProps = {
  goBack: () => void;
};

export const BackButton = (props: BackButtonProps) => {
  const { goBack } = props;
  return (
    <Box className="p-3 text-center">
      <Button onClick={goBack}>Back</Button>
    </Box>
  );
};
