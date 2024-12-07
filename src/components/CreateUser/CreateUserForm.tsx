import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Form,
} from '@/components/UI';

import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { CreateUser, CreateUserProps } from './createUsersForm.types';
import { FIELD_LABELS, ROLES } from '@constants/usersListTable';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

const formatValueForInput = (
  value: string | number | boolean | number[] | null
) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  } else if (typeof value === 'boolean') {
    return String(value);
  }

  return '';
};

export const CreateUserForm = ({
  data,
  dialogTexts,
  onSave,
  formSchemaValidate,
}: CreateUserProps<CreateUser>) => {
  const [inputs, setInputs] = useState(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<CreateUser>({
    resolver:
      onSave && formSchemaValidate
        ? zodResolver(formSchemaValidate)
        : undefined,
    values: data,
  });

  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  // Обработчик для изменения ролей
  const handleOnRolesChange = (
    newValue: MultiValue<{ label: string; value: string }>
  ) => {
    const newRoles = newValue.map((option) => option.label);
    setInputs((prev) => ({
      ...prev,
      roles: newRoles,
    }));
    form.setValue('roles', newRoles);
  };

  // Обработчик для сохранения нового пользователя
  const handleOnSave = () => {
    const newData = form.getValues();
    if (onSave) {
      onSave(newData);
    }
    form.clearErrors();
    setIsDialogOpen(false);
    setInputs(data);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="max-w-fit">
            {btnTriggerText}
          </Button>
        </DialogTrigger>
        <DialogContent className={`sm:max-w-[${DEFAULT_DIALOG_FORM_WIDTH}px]`}>
          <DialogHeader>
            <DialogTitle className="text-center mb-2">{dialogTitleText}</DialogTitle>
            <DialogDescription className="text-center">
              {dialogDescriptionText}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSave)}
              className="space-y-6"
            >
              <div className="grid gap-4 py-4">
                {Object.entries(data).map(([key]) => {
                  const label = FIELD_LABELS[key] || key; // Подпись на русском

                  return (
                    <div key={key} className="">
                      <Label
                        htmlFor={key}
                        className="text-indigo-700 text-sm font-medium flex mb-2"
                      >
                        {label}
                      </Label>
                      {key === 'roles' ? (
                        <Controller
                          name={key as keyof CreateUser}
                          control={form.control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Выберите значение"
                              isMulti
                              className="basic-multi-select"
                              classNamePrefix="select"
                              value={inputs.roles?.map((role) =>
                                typeof role === 'object' && 'name' in role
                                  ? { label: role.name, value: role.name }
                                  : { label: role, value: role }
                              )}
                              options={ROLES.map((role) => ({
                                label: role.name,
                                value: role.name,
                              }))}
                              onChange={handleOnRolesChange}
                            />
                          )}
                        />
                      ) : (
                        <Controller
                          name={key as keyof CreateUser}
                          control={form.control}
                          render={({ field }) => (
                            <>
                              <Input
                                {...field}
                                id={key}
                                disabled={key === 'id'}
                                value={formatValueForInput(
                                  field.value as string
                                )}
                              />
                              <ErrorMessage
                                errors={form.formState.errors}
                                name={key as keyof CreateUser}
                                render={({ message }) => (
                                  <div className="mt-1">
                                    <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                      {message}
                                    </p>
                                  </div>
                                )}
                              />
                            </>
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <DialogFooter>
                <Button
                  className="block hover:opacity-75 mb-3 bg-bg-header hover:bg-bg-header"
                  type="submit"
                  loading={form.formState.isSubmitting}
                >
                  Сохранить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
