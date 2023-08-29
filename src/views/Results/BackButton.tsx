import { Button } from '@/components/ui/button';

type BackButtonProps = {
  goBack: () => void;
};

export const BackButton = (props: BackButtonProps) => {
  const { goBack } = props;
  return (
    <div className="p-3 text-center">
      <Button onClick={goBack}>Back</Button>
    </div>
  );
};
