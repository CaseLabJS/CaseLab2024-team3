import { toJS } from 'mobx';
import { useMemo, useState } from 'react';
import Select, { MultiValue } from 'react-select';
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
} from 'src/components/UI';
import {
  AdminDialogData,
  AdminDialogProps,
  OptionItem,
} from 'src/types/adminTypes';
import {
  calculateDiff,
  formatValueForInput,
  getKeyName,
  getKeyType,
} from './adminDialog.utils';
import { FIELD_LABELS, ROLES } from '@constants/admin';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

export const AdminDialog = <
  TData extends AdminDialogData,
  TRelatedData extends AdminDialogData,
>({
  data,
  relatedData,
  dialogTexts,
  onSave,
}: AdminDialogProps<TData, TRelatedData>) => {
  const [inputs, setInputs] = useState<TData>(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chosenIds, setChosenIds] = useState<number[]>(() => {
    if ('attributeIds' in data) {
      return data.attributeIds ?? [];
    } else if ('documentTypeIds' in data) {
      return data.documentTypeIds ?? [];
    } else {
      return [];
    }
  });

  const firstElemOfRelatedData = relatedData ? relatedData[0] : undefined;
  const keyNameForSelectUse = getKeyName(firstElemOfRelatedData);

  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const selectOptions: OptionItem[] = useMemo(
    () =>
      relatedData?.map((elem) => {
        const listOfIds = elem[keyNameForSelectUse as keyof AdminDialogData];

        return {
          value: elem.name,
          label: elem.name,
          isSelected:
            'id' in data &&
            Array.isArray(listOfIds) &&
            listOfIds?.includes(Number(data.id)),
        };
      }) ?? [],
    [relatedData, keyNameForSelectUse, data]
  );

  const defaultSelectValues = useMemo(
    () => selectOptions.filter((option) => option.isSelected),
    [selectOptions]
  );

  const handleOnSelectChange = (newValue: MultiValue<OptionItem>) => {
    if (relatedData) {
      const entitiesNames = newValue.map((option) => option.value);
      const newChosenIds = relatedData
        .filter((data) => entitiesNames.includes(data.name))
        .map((data) => ('id' in data ? data.id : undefined))
        .filter((el) => el !== undefined);

      setChosenIds(newChosenIds);
    }
  };
  const handleOnRolesChange = (newValue: MultiValue<OptionItem>) => {
    const newRoles = newValue.map((option) => option.label);

    setInputs((prev: TData) => ({
      ...prev,
      roles: newRoles,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: TData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSave = () => {
    const newData: TData = {
      ...inputs,
      [getKeyName(data)]: chosenIds,
      roles: inputs.roles,
    };

    const id = 'id' in data ? data.id : undefined;
    const patchData = calculateDiff(data, newData);
    console.log('ON SAVE HANDLE', {
      chosenIds: toJS(chosenIds),
      newData,
      patchData,
      data: toJS(data),
      id,
      defaultSelectValues,
      relatedData: toJS(relatedData),
      selectOptions,
    });

    if (typeof id && Object.keys(patchData).length !== 0) {
      console.log('ON_EDIT', { id, patchData });
      void onSave?.(patchData, id);
    } else if (btnTriggerText !== 'Редактировать') {
      console.log('ON_CREATE', { id, patchData });
      void onSave?.(newData);
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
                  {key}
                </Label>
                {key === 'roles' ? (
                  <div className="col-span-3">
                    {console.log(inputs)}
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
                ) : typeof value === 'object' && getKeyType(key) === 'array' ? (
                  <div className="col-span-3">
                    {console.log(selectOptions)}
                    <Select
                      placeholder="Выберите значение"
                      isMulti
                      className="basic-multi-select"
                      classNamePrefix="select"
                      defaultValue={defaultSelectValues}
                      options={selectOptions}
                      onChange={handleOnSelectChange}
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
