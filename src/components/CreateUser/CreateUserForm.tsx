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
import {
  CreateUser,
  CreateUserProps,
  OptionItem,
} from './createUsersForm.types';

import { FIELD_LABELS, ROLES } from '@constants/admin';
import { formatValueForInput } from '@components/AdminDialog/adminDialog.utils';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

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
  const handleOnRolesChange = (newValue: MultiValue<OptionItem>) => {
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
                      defaultValue={inputs.roles?.map((role) => ({
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
                ) : (
                  <Input
                    name={key}
                    value={formatValueForInput(value)}
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
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};