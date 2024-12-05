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
} from '@/components/UI';
import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { CreateUser, CreateUserProps } from './createUsersForm.types';
import { FIELD_LABELS, ROLES } from '@constants/usersListTable';

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
}: CreateUserProps<CreateUser>) => {
  const [inputs, setInputs] = useState(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
  };

  // Обработчик для изменения текстовых полей
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Обработчик для сохранения нового пользователя
  const handleOnSave = () => {
    const newData = {
      ...inputs,

      roles: inputs.roles,
    };
    if (onSave) {
      onSave(newData);
    }

    setIsDialogOpen(false);
    setInputs(data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="max-w-fit">
          {btnTriggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[${DEFAULT_DIALOG_FORM_WIDTH}px]`}>
        <DialogHeader>
          <DialogTitle>{dialogTitleText}</DialogTitle>
          <DialogDescription>{dialogDescriptionText}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {Object.entries(inputs).map(([key, value]) => {
            const label = FIELD_LABELS[key] || key; // Подпись на русском
            return (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {label}
                </Label>
                {key === 'roles' ? (
                  <div className="col-span-3">
                    <Select
                      placeholder="Выберите значение"
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      defaultValue={inputs.roles?.map((role) =>
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
                  </div>
                ) : (
                  <Input
                    name={key}
                    value={formatValueForInput(value as string)}
                    disabled={key === 'id'}
                    className="col-span-3"
                    onChange={handleOnChange}
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
            onClick={handleOnSave}
            disabled={
              !inputs.firstName ||
              !inputs.lastName ||
              !inputs.email ||
              !inputs.password ||
              !inputs.login
            }
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
