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
import { Stepper } from '@/components/ui/stepper';
import { Dropdown } from './Dropdown';
import { LocationType, ValidKeys } from '@/shared';
import { formatCalendarDate, isBeforeToday } from '@/utils/date';
import { useHome } from '@/hooks';

const displayIcon = (index: number, totalLength: number) => {
  return index === totalLength - 1 ? (
    <MapPin size={16} className="text-red-500" />
  ) : (
    <Circle size={16} />
  );
};

export const Home = () => {
  const { form, fields, onSubmit, handleAppend, handleRemove } = useHome();

  return (
    <div className="w-[800px] m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="m-4 w-full grid grid-cols-3">
            <div className="col-span-2">
              <Stepper
                steps={fields.map((field, index) => {
                  return {
                    icon: displayIcon(index, fields.length),
                    element: (
                      <div className="p-3 flex items-start" key={field.id}>
                        <div className="w-[80%]">
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
                                  onSelect={(key: string, value: string) =>
                                    form.setValue(key as ValidKeys, value, {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    })
                                  }
                                  index={index}
                                />

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <IF condition={fields.length > 2}>
                          <div className="w-[20%] flex justify-center mt-8">
                            <MinusCircle
                              size={15}
                              onClick={() => handleRemove(index)}
                              className="cursor-pointer"
                            />
                          </div>
                        </IF>
                      </div>
                    ),
                  };
                })}
              />
              <div
                className="flex mt-3 items-center cursor-pointer"
                onClick={handleAppend}
              >
                <PlusCircle className="-ml-2 h-4 w-4" />
                <p className="ml-7">Add destination</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="p-3">
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
              </div>
              <div className="p-3">
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Passengers</FormLabel>
                      <IncrementDecrement
                        value={field.value}
                        onChange={value => {
                          form.setValue(`passengers`, value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
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
              </div>
            </div>
            <div className="col-span-3 grid justify-center">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
