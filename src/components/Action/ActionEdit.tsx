import {
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormSwitcher,
} from '@components/UI';
import { useState } from 'react';
import { Path, PathValue, useForm } from 'react-hook-form';
import { ActionDefaultData } from './types';
import { DialogTexts } from '@/types/adminTypes';
import { Pencil } from 'lucide-react';
import { BaseFieldProps, FieldTypes } from '@components/UI/Form/types';
import { isEmpty } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import Select, { MultiValue } from 'react-select';
import { ROLES } from '@constants/admin';

interface ActionEditProps<TData> extends ActionDefaultData<TData>, ButtonProps {
  dialogTexts: DialogTexts;
  configFields: BaseFieldProps[];
  onUpdate: (id: number | string, payload: TData) => Promise<void>;
  mapSubmitPayload: <TNewData>(payload: TData) => TNewData;
  formSchemaValidate?: z.infer<ZodType<any, any, any>>;
}

export const ActionEdit = <
  TData extends {
    [x: string]: any[] | undefined;
    id: number | string | undefined;
    roles?: string[];
  },
>({
  dialogTexts,
  configFields,
  onUpdate,
  mapSubmitPayload,
  formSchemaValidate,
  data,
  ...props
}: ActionEditProps<TData>) => {
  const form = useForm<TData>({
    resolver: formSchemaValidate ? zodResolver(formSchemaValidate) : undefined,
    values: data,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  // Обработчик для изменения ролей
  const handleOnRolesChange = (
    newValue: MultiValue<{ label: string; value: string }>
  ) => {
    const newRoles = newValue.map((option) => option.value);
    const fieldName: keyof TData = 'roles';
    form.setValue(
      fieldName as Path<TData>,
      newRoles as PathValue<TData, Path<TData>>
    );
  };
  const onSubmit = async (payload: TData) => {
    console.log('Form data before submit:', payload);
    const isArrayString =
      Array.isArray(payload.roles) &&
      payload.roles.every((role) => typeof role === 'string');
    console.log('isArray', isArrayString, payload.roles);
    if (!isArrayString) {
      payload.roles = payload.roles?.map((role) => role.name);
    }
    if (data?.id && !isEmpty(payload)) {
      await onUpdate(
        data.id,
        mapSubmitPayload({
          ...payload,
          roles: payload.roles,
        })
      );
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" {...props}>
          <Pencil />
          {btnTriggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitleText}</DialogTitle>
          <DialogDescription>{dialogDescriptionText}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {configFields.map((field) => {
              // Условие для рендера Select вместо стандартного поля
              if (field.type === FieldTypes.Select && field.name === 'roles') {
                return (
                  <div key={field.name} className="space-y-2">
                    <label>{field.label}</label>
                    <Select
                      placeholder="Выберите значение"
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      defaultValue={(
                        data?.roles as unknown as Array<{ name: string }>
                      )?.map((role) => ({
                        label: role.name,
                        value: role.name,
                      }))}
                      options={ROLES.map((role) => ({
                        label: role.name,
                        value: role.name,
                      }))}
                      onChange={handleOnRolesChange}
                    />
                  </div>
                );
              }

              return (
                <FormSwitcher
                  key={field.name}
                  {...field}
                  type={FieldTypes.Input}
                />
              );
            })}
            <DialogFooter>
              <Button type="submit" loading={form.formState.isSubmitting}>
                Сохранить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
