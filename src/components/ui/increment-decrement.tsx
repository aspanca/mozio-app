import { Button } from "./button";
import { Card } from "./card";
import { Minus, Plus } from "lucide-react";

type IncrementDecrementProps = {
  children: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
};

export function IncrementDecrement(props: IncrementDecrementProps) {
  const { children, value, onChange } = props;

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <Card className="w-[120px] p-1 justify-center items-center flex">
      <Button
        className="w-[25px] h-[25px] p-0"
        onClick={handleDecrement}
        type="button"
      >
        <Minus size={15} />
      </Button>
      <div className="w-[30px] h-[30px] p-0 justify-center items-center flex">
        {children}
      </div>
      <Button
        className="w-[25px] h-[25px] p-0"
        onClick={handleIncrement}
        type="button"
      >
        <Plus size={15} />
      </Button>
    </Card>
  );
}
