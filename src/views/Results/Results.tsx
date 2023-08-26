import { Datepicker } from "@/components/ui/datepicker";
import { IncrementDecrement } from "@/components/ui/increment-decrement";
import { SelectCityInput } from "@/components/ui/select-city-input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { paths } from "@/router";

export const Results = () => {
  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
        <h6>Paris</h6>
        <h6>Alx-en-Proence</h6>
        <h6>Montpellier</h6>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4"></div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
        <h6>765.16 km is total distance</h6>
        <h6>10 passengers</h6>
        <h6>Feb 14, 2023</h6>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 m-4">
        <Button asChild>
          <NavLink to={paths.home}>Back</NavLink>
        </Button>
      </div>
    </div>
  );
};
