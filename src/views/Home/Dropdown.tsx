import { IF } from '@/components/IF';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { Loader } from '@/components/ui/loader';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useHome } from '@/hooks';
import { cn } from '@/lib/utils';
import { LocationType } from '@/shared';
import { Check, ChevronsUpDown } from 'lucide-react';

type DropdownProps = {
  value: string;
  selectedValue: string;
  index: number;
  onSelect: (key: string, value: string) => void;
};

export const Dropdown = (props: DropdownProps) => {
  const { value, selectedValue, onSelect, index } = props;
  const { data, isLoading, isError, handleChange } = useHome();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between',
              !value && 'text-muted-foreground'
            )}
          >
            {selectedValue}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-[385px]">
          <CommandInput placeholder="Search city..." onKeyUp={handleChange} />
          <IF condition={!isError}>
            <CommandEmpty>No city found.</CommandEmpty>
          </IF>

          <Loader isLoading={isLoading}>
            <IF condition={isError}>
              <Alert variant="destructive">
                <AlertTitle>
                  Oops! failed to search with this keyword. {value}
                </AlertTitle>
              </Alert>
            </IF>
            <CommandGroup>
              {(data as LocationType[])?.map((location: LocationType) => (
                <CommandItem
                  value={location.city}
                  key={location.city}
                  onSelect={() => {
                    onSelect(`cities.${index}.city`, location.city);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      location.city === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {location.city}
                </CommandItem>
              ))}
            </CommandGroup>
          </Loader>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
