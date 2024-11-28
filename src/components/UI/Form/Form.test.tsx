import { render, renderHook, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from './Form';
import { useForm, FormProvider } from 'react-hook-form';

describe('UI Form', () => {
  it('Рендер Form компонент', () => {
    const { result } = renderHook(() => useForm());
    const { container } = render(
      <Form {...result.current}>
        <div>Form Item Content</div>
      </Form>
    );
    expect(container).toBeInTheDocument();
  });

  it('Рендер FormItem компонент', () => {
    render(
      <FormItem className="test-class">
        <div>Form Item Content</div>
      </FormItem>
    );
    expect(screen.getByText('Form Item Content')).toBeInTheDocument();
  });

  it('Рендер FormLabel компонент', () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <FormField
          control={result.current.control}
          name={'test'}
          render={() => (
            <FormControl>
              <FormItem>
                <FormLabel>Test Label</FormLabel>
                <input />
              </FormItem>
            </FormControl>
          )}
        />
      </FormProvider>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('Рендер FormControl компонент', () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <FormField
          control={result.current.control}
          name={'test'}
          render={() => (
            <FormControl>
              <input />
            </FormControl>
          )}
        />
      </FormProvider>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Рендер FormDescription компонент', () => {
    const { result } = renderHook(() => useForm());
    render(
      <FormProvider {...result.current}>
        <FormField
          name="test"
          render={() => <FormDescription>Test Description</FormDescription>}
        />
      </FormProvider>
    );
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('Рендер FormMessage компонент с ошибкой', () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { test: '' } })
    );
    render(
      <FormProvider {...result.current}>
        <FormField
          name="test"
          render={() => <FormMessage>Test Error Message</FormMessage>}
        />
      </FormProvider>
    );
    expect(screen.getByText('Test Error Message')).toBeInTheDocument();
  });
});
