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
import { Alert, AlertTitle } from "@/components/ui/alert";

import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import { paths } from "@/router";
import { useEffect } from "react";
import { locations } from "@/api";

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
    message: "Number of passengers must be greater than zero",
  }),
});

export function Home() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destinations: [{ city: "" }, { city: "" }],
      passengers: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinations",
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    navigate({
      pathname: paths.results,
      search: queryString.stringify({
        ...data,
        destinations: data.destinations.map((destination) => destination.city),
      }),
    });
  };

  const handleAppend = () => {
    append({ city: "" });
  };

  const search = queryString.parse(location.search, { parseNumbers: true });

  useEffect(() => {
    if (Object.keys(search).length) {
      form.reset({
        ...search,
        date: new Date(search.date as string),
        destinations: (search?.destinations as string[])?.map((destination) => {
          return {
            city: destination,
          };
        }),
      });
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="m-4 w-[700px] grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {fields.map((field, index) => {
              return (
                <div className="p-3 flex items-start" key={field.id}>
                  <div className="w-[80%]">
                    <FormField
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
                                        (location) =>
                                          location.city === field.value
                                      )?.city
                                    : "Select language"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command className="w-[500px]">
                                <CommandInput
                                  placeholder="Search framework..."
                                  onKeyUp={(
                                    e: React.KeyboardEvent<HTMLInputElement>
                                  ) => console.log(e.currentTarget.value)}
                                />
                                <Alert variant="destructive">
                                  <AlertTitle>
                                    Oops! failed to search with this keyword.{" "}
                                    {field.value}
                                  </AlertTitle>
                                </Alert>
                                <IF condition={field.value === "Fail"}>
                                  <CommandEmpty>
                                    No framework found.
                                  </CommandEmpty>
                                </IF>
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
                        </FormItem>
                      )}
                    />
                  </div>
                  <IF condition={fields.length > 2}>
                    <div className="w-[20%] flex justify-center mt-8">
                      <MinusCircle
                        size={15}
                        onClick={() => remove(index)}
                        className="cursor-pointer"
                      />
                    </div>
                  </IF>
                </div>
              );
            })}
            <div className="m-3">
              <Button variant="ghost" type="submit" onClick={handleAppend}>
                {" "}
                <PlusCircle className="mr-2 h-4 w-4" /> Add Destination
                destination
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <div className="p-1">
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
                          disabled={(date) => date < new Date()}
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
                      onChange={(value) => {
                        form.setValue(`passengers`, value);
                      }}
                    >
                      <Input
                        {...field}
                        type="text"
                        className="appearance-none border-none text-center focus-visible:ring-0 p-0"
                        onChange={() => {
                          return;
                        }}
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
  );
}
