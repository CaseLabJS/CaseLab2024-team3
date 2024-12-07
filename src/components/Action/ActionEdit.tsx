import { isEmpty } from '@/lib';
import { DialogTexts } from '@/types/adminTypes';
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
import { FieldTypes, FormSwitcherProps } from '@components/UI/Form/types';
import { ROLES } from '@constants/usersListTable';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Path, PathValue, useForm } from 'react-hook-form';
import Select, { MultiValue } from 'react-select';
import { z, ZodType } from 'zod';
import { ActionDefaultData } from './types';
import { UserRegister } from '@/types/index';

interface ActionEditProps<TData, UData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  dialogTexts: DialogTexts;
  configFields: FormSwitcherProps[];
  onUpdate: (id: string, payload: UData) => Promise<void>;
  mapSubmitPayload: <TNewData>(payload: UData) => TNewData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSchemaValidate?: z.infer<ZodType<any, any, any>>;
}

export const ActionEdit = <TData extends UserRegister, UData>({
  dialogTexts,
  configFields,
  onUpdate,
  mapSubmitPayload,
  formSchemaValidate,
  data,
  ...props
}: ActionEditProps<TData, UData>) => {
  const form = useForm<TData>({
    resolver: formSchemaValidate ? zodResolver(formSchemaValidate) : undefined,
    values: data,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

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
    const isArrayString =
      Array.isArray(payload.roles) &&
      payload.roles.every((role) => typeof role === 'string');

    if (!isArrayString) {
      payload.roles = payload.roles?.map((role) =>
        typeof role === 'string' ? role : role.name
      );
    }
    if (data?.id && !isEmpty(payload)) {
      await onUpdate(
        data.id,
        mapSubmitPayload({
          ...payload,
          roles: payload.roles,
        } as unknown as UData)
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
          <DialogTitle className="text-center mb-2">
            {dialogTitleText}
          </DialogTitle>
          <DialogDescription className="text-center">
            {dialogDescriptionText}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {configFields.map((field) => {
              // Условие для рендера Select вместо стандартного поля
              if (
                field.baseFieldProps.type === FieldTypes.Select &&
                field.baseFieldProps.name === 'roles'
              ) {
                return (
                  <div key={field.baseFieldProps.name} className="space-y-2">
                    <label className="text-indigo-700 text-sm font-medium flex mb-2">
                      {field.baseFieldProps.label}
                    </label>
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
                <FormSwitcher key={field.baseFieldProps.name} {...field} />
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
