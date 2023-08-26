import { useState } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { Minus, Plus } from "lucide-react";

export function IncrementDecrement() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Card className="w-[120px] p-3 justify-center flex">
      <Button className="w-[25px] h-[25px] p-0" onClick={handleDecrement}>
        <Minus size={15}/>
      </Button>
      <div className="w-[30px] h-[30px] p-0 justify-center items-center flex">
        {count}
      </div>
      <Button className="w-[25px] h-[25px] p-0" onClick={handleIncrement}>
        <Plus size={15}/>
      </Button>
    </Card>
  );
}
