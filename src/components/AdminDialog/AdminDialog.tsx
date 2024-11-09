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
import { calculateDiff } from '@/lib/utils';
import { useMemo, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { ChangeAttribute } from 'src/types/index';
import {
  AdminDialogProps,
  DocumentType,
  OptionItem,
} from './adminDialogs.types';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

export const AdminDialog = <
  TData extends DocumentType,
  TRelatedData extends ChangeAttribute,
>({
  data,
  relatedData,
  dialogTexts,
  onSave,
}: AdminDialogProps<TData, TRelatedData>) => {
  const [inputs, setInputs] = useState<TData>(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chosenAttributeIds, setChosenAttributeIds] = useState<number[]>([]);

  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const selectOptions: OptionItem[] = useMemo(
    () =>
      relatedData?.map(({ name, documentTypeIds }) => ({
        value: name,
        label: name,
        isSelected: 'id' in data && documentTypeIds?.includes(Number(data.id)),
      })) ?? [],
    [relatedData, data]
  );

  const defaultSelectValues = useMemo(
    () => selectOptions.filter((option) => option.isSelected),
    [selectOptions]
  );

  const handleOnSelectChange = (newValue: MultiValue<OptionItem>) => {
    const newChosenAttributeIds = [
      ...newValue
        .map((el) => relatedData?.find((attr) => attr.name === el.value))
        .map((el) => el?.id),
    ].filter((id) => id !== undefined);
    setChosenAttributeIds(newChosenAttributeIds);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: TData) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSave = () => {
    const newData: TData = { ...inputs, attributeIds: chosenAttributeIds };

    const id = 'id' in data ? data.id : undefined;
    const patchData = calculateDiff(data, newData);

    if (typeof id === 'number' && Object.keys(patchData).length !== 0) {
      onSave?.(id, patchData);
    } else if (btnTriggerText !== 'Редактировать') {
      onSave?.(newData);
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
            return (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {key}
                </Label>
                {Array.isArray(value) || value === null ? (
                  <div className="col-span-3">
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
                    value={value ?? ''}
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
