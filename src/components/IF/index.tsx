import React from 'react';
import { FC } from 'react';

type IFProps = {
  children: React.ReactNode;
  condition: boolean;
};

export const IF: FC<IFProps> = (props) => {
  const { condition, children } = props;

  if (!condition) return null;
  return <>{children}</>;
};
