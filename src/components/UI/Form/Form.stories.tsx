import { Meta, StoryObj } from '@storybook/react';
import { Form, FormField, useFormField } from './Form';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { InputHTMLAttributes, useState } from 'react';
import { FormFieldInput } from './FormFieldInput';

const meta = {
  title: 'UI/Form',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: {
        type: 'text',
        disable: true,
      },
      description: 'datapath поля для библиотеке react-hook-form',
    },
  },
  decorators: [
    (Story) => {
      const [data, setData] = useState<unknown>();
      const form = useForm({
        values: {},
      });
      const onSubmit = async (payload: unknown) => {
        setData(payload);
      };

      return (
        <Form {...form}>
          <form
            className="flex flex-col w-96 gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Story />
            <Button size="sm" type="submit">
              Отправить
            </Button>
          </form>
          {data ? <div>{JSON.stringify(data)}</div> : null}
        </Form>
      );
    },
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story<T> = StoryObj<typeof meta & T>;

const defaultArgs = {
  name: 'test',
  label: 'test',
  placeholder: 'test',
  defaultValue: '',
  disabled: false,
  required: true,
};

export const Default: Story<InputHTMLAttributes<HTMLInputElement>> = {
  render: ({ name, defaultValue, ...args }) => {
    const form = useFormField();
    return (
      <FormField
        name={name ?? ''}
        control={form.control}
        defaultValue={defaultValue ?? ''}
        render={({ field }) => (
          <input
            className="border"
            {...field}
            {...args}
            name={name}
            defaultValue={defaultValue}
          />
        )}
      />
    );
  },
  args: defaultArgs,
};

export const FormInput: Story<typeof FormFieldInput> = {
  render: (args) => <FormFieldInput {...args} />,
  args: defaultArgs,
};
