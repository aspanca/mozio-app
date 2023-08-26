"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IF } from "@/components/IF";
import { IncrementDecrement } from "@/components/ui/increment-decrement";
import { Input } from "@/components/ui/input";

const locations = [
  {
    city: "Paris",
    lat: 48.856614,
    lng: 2.352222,
  },
  {
    city: "Marseille",
    lat: 43.296482,
    lng: 5.36978,
  },
  {
    city: "Lyon",
    lat: 45.764043,
    lng: 4.835659,
  },
  {
    city: "Toulouse",
    lat: 43.604652,
    lng: 1.444209,
  },
  {
    city: "Nice",
    lat: 43.710173,
    lng: 7.261953,
  },
  {
    city: "Nantes",
    lat: 47.218371,
    lng: -1.553621,
  },
  {
    city: "Strasbourg",
    lat: 48.573405,
    lng: 7.752111,
  },
  {
    city: "Montpellier",
    lat: 43.610769,
    lng: 3.876716,
  },
  {
    city: "Bordeaux",
    lat: 44.837789,
    lng: -0.57918,
  },
  {
    city: "Lille",
    lat: 50.62925,
    lng: 3.057256,
  },
  {
    city: "Rennes",
    lat: 48.117266,
    lng: -1.677793,
  },
  {
    city: "Reims",
    lat: 49.258329,
    lng: 4.031696,
  },
  {
    city: "Le Havre",
    lat: 49.49437,
    lng: 0.107929,
  },
  {
    city: "Saint-Étienne",
    lat: 45.439695,
    lng: 4.387178,
  },
  {
    city: "Toulon",
    lat: 43.124228,
    lng: 5.928,
  },
  {
    city: "Angers",
    lat: 47.478419,
    lng: -0.563166,
  },
  {
    city: "Grenoble",
    lat: 45.188529,
    lng: 5.724524,
  },
  {
    city: "Dijon",
    lat: 47.322047,
    lng: 5.04148,
  },
  {
    city: "Nîmes",
    lat: 43.836699,
    lng: 4.360054,
  },
  {
    city: "Aix-en-Provence",
    lat: 43.529742,
    lng: 5.447427,
  },
] as const;

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  destinations: z.array(
    z.object({
      city: z.string().nonempty("City is required"),
    })
  ),
  passengers: z.number().gt(0, {
    message: 'Number of passengers must be greater than zero'
  }),
});

export function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destinations: [{ city: "" }, { city: "" }],
      passengers: 0
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinations",
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    alert(JSON.stringify(data));
  };

  const handleAppend = () => {
    append({ city: "" });
  };

  return (
    <div className="m-4 w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => {
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`destinations.${index}.city`}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <IF condition={index === 0}>City of origin</IF>
                      <IF condition={index !== 0}>City of Destination</IF>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? locations.find(
                                  (location) => location.city === field.value
                                )?.city
                              : "Select language"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="w-[500px]">
                          <CommandInput placeholder="Search framework..." />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {locations.map((location) => (
                              <CommandItem
                                value={location.city}
                                key={location.city}
                                onSelect={() => {
                                  form.setValue(
                                    `destinations.${index}.city`,
                                    location.city
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    location.city === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {location.city}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                    <MinusCircle size={15} onClick={() => remove(index)} />
                  </FormItem>
                )}
              />
            );
          })}
          <div>
            <PlusCircle size={15} onClick={handleAppend} />
          </div>
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
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passengers"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Passengers</FormLabel>
                <IncrementDecrement
                  value={field.value}
                  onChange={(value) => {
                    form.setValue(`passengers`, value);
                  }}
                >
                  <Input {...field} type="text" className="appearance-none border-none text-center focus-visible:ring-0 p-0" onChange={() => {
                    return;
                  }} />
                </IncrementDecrement>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
