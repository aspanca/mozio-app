type BoxProps = {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Box = (props: BoxProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};
