import { Loader2 } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type LoaderProps = {
  height?: string;
  isLoading: boolean;
};

export const Loader: FC<PropsWithChildren<LoaderProps>> = props => {
  const { children, height, isLoading } = props;

  if (isLoading) {
    return (
      <div
        className="flex items-center w-full justify-center"
        style={{ height: height ? height : '100px' }}
      >
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};
