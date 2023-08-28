'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useNavigate } from 'react-router-dom';
import { paths } from '@/router';
import { useEffect, useState } from 'react';
import {
  constructFormObjectFromSearch,
  constructSearchObjectFromForm,
  debounce,
  stringifySearch,
  updateQueryParams,
} from '@/utils';
import { FormObjectTypeT, FormSchema } from '@/shared';
import { fetchLocations } from '@/api/locations';
import { useQuery } from 'react-query';

export const useHome = () => {
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'all',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      cities: [{ city: '' }],
      passengers: 0,
      date: new Date(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'cities',
  });

  const { data, isLoading, isError } = useQuery(
    ['locations', searchValue],
    () => fetchLocations(searchValue)
  );

  const handleChange = debounce((e: React.KeyboardEvent<HTMLInputElement>) => {
    setSearchValue((e.target as HTMLInputElement).value);
  }, 500);

  const values: FormObjectTypeT = form.getValues() as FormObjectTypeT;

  useEffect(() => {
    if (form.formState.isDirty) {
      updateQueryParams(values);
    }
  }, [values, form.formState.isDirty]);

  useEffect(() => {
    const formObject = constructFormObjectFromSearch();

    form.reset(formObject);
  }, [form]);

  const onSubmit = (data: FormObjectTypeT) => {
    const searchObject = constructSearchObjectFromForm(data);

    navigate({
      pathname: paths.results,
      search: stringifySearch(searchObject),
    });
  };

  const handleAppend = () => {
    append({ city: '' });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return {
    onSubmit,
    handleAppend,
    handleRemove,
    handleChange,
    form,
    fields,
    data,
    isLoading,
    isError,
  };
};
