import {
  CalendarIcon,
  Circle,
  MapPin,
  MinusCircle,
  PlusCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { IF } from '@/components/IF';
import { IncrementDecrement } from '@/components/ui/increment-decrement';
import { Input } from '@/components/ui/input';
import { locations } from '@/api';
import { LocationStepper } from '@/components/ui/location-stepper';
import { Dropdown } from './Dropdown';
import { LocationType } from '@/shared';
import { formatCalendarDate, isBeforeToday } from '@/utils/date';
import { useHome } from '@/hooks';
import { Box } from '@/components/ui/box';

const renderIcon = (index: number, totalLength: number) => {
  return index === totalLength - 1 ? (
    <MapPin size={16} className="text-red-500" />
  ) : (
    <Circle size={16} />
  );
};

export const Home = () => {
  const {
    form,
    fields,
    onSubmit,
    handleAppend,
    handleRemove,
    handleUpdatePassengers,
    handleSelectCity,
  } = useHome();

  return (
    <Box className="w-[800px] m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Box className="m-4 w-full grid grid-cols-3">
            <Box className="col-span-2">
              <LocationStepper
                steps={fields.map((field, index) => {
                  return {
                    icon: renderIcon(index, fields.length),
                    element: (
                      <Box className="p-3 flex items-start" key={field.id}>
                        <Box className="w-[80%]">
                          <FormField
                            control={form.control}
                            name={`cities.${index}.city`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>
                                  <IF condition={index === 0}>
                                    City of origin
                                  </IF>
                                  <IF condition={index !== 0}>
                                    City of Destination
                                  </IF>
                                </FormLabel>
                                <Dropdown
                                  value={field.value}
                                  selectedValue={
                                    field.value
                                      ? (locations.find(
                                          (location: LocationType) =>
                                            location.city === field.value
                                        )?.city as string)
                                      : 'Select destination'
                                  }
                                  onSelect={handleSelectCity}
                                  index={index}
                                />

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </Box>
                        <IF condition={fields.length > 2}>
                          <Box className="w-[20%] flex justify-center mt-8">
                            <MinusCircle
                              size={15}
                              onClick={() => handleRemove(index)}
                              className="cursor-pointer"
                            />
                          </Box>
                        </IF>
                      </Box>
                    ),
                  };
                })}
              />
              <Box
                className="flex mt-3 items-center cursor-pointer"
                onClick={handleAppend}
              >
                <PlusCircle className="-ml-2 h-4 w-4" />
                <p className="ml-7">Add destination</p>
              </Box>
            </Box>
            <Box className="col-span-1">
              <Box className="p-3">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {formatCalendarDate(field.value)}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => isBeforeToday(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
              <Box className="p-3">
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Passengers</FormLabel>
                      <IncrementDecrement
                        value={field.value}
                        onChange={handleUpdatePassengers}
                      >
                        <Input
                          {...field}
                          value={field.value}
                          type="text"
                          className="appearance-none border-none text-center focus-visible:ring-0 p-0"
                          data-testid="increment-decrement-input"
                        />
                      </IncrementDecrement>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Box>
            </Box>
            <Box className="col-span-3 grid justify-center">
              <Button type="submit">Submit</Button>
            </Box>
          </Box>
        </form>
      </Form>
    </Box>
  );
};
