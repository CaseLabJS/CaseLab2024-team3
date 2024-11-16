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

import { useMemo, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { CreateDocumentProps, OptionItem } from './createDocuments.types';
import { CreateDocument } from 'src/types/index';
import { calculateDiff } from '@components/AdminDialog/adminDialog.utils';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

export const CreateDocumentForm = ({
  data,
  documentTypes,
  documentAttributes,
  dialogTexts,
  onSave,
}: CreateDocumentProps<CreateDocument, any, any>) => {
  const [inputs, setInputs] = useState(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [chosenAttributeIds, setChosenAttributeIds] = useState<number[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [base64str, setBase64str] = useState<string>('');

  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const documentTypesOptions: OptionItem[] = useMemo(
    () =>
      documentTypes?.map((type) => ({
        value: type.id.toString(),
        label: type.name || 'Без названия',
        isSelected: type.id === data.documentTypeId,
      })) ?? [],
    [documentTypes, data]
  );

  const defaultSelectValues = useMemo(
    () => documentTypesOptions.filter((option) => option.isSelected),
    [documentTypesOptions]
  );

  const documentAttributesOptions: OptionItem[] = useMemo(
    () =>
      documentAttributes?.map((type) => ({
        value: type.id,
        label: type.name || 'Без названия',
        isSelected:
          data.attributeValues?.some((attr) => attr.attributeId === type.id) ??
          false,
      })) ?? [],
    [documentAttributes, data]
  );

  const handleOnAttributesChange = (newValue: MultiValue<OptionItem>) => {
    const newChosenAttributeIds = [
      ...newValue
        .map((el) => documentAttributes?.find((attr) => attr.id === el.value))
        .map((el) => el?.id),
    ].filter((id) => id !== undefined);
    setChosenAttributeIds(newChosenAttributeIds);
  };

  const handleOnDocumentTypeChange = (selectedOption: OptionItem | null) => {
    if (selectedOption) {
      setInputs((prev) => ({
        ...prev,
        documentTypeId: parseInt(selectedOption.value),
      }));
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSave = () => {
    const newData: CreateDocument = {
      ...inputs,
      attributeValues: chosenAttributeIds.map((id) => ({
        attributeId: id,
        value: '',
      })),
      documentTypeId: inputs.documentTypeId ?? 0,
    };

    const id = 'id' in data ? data.id : undefined;
    const patchData = calculateDiff(data, newData);

    if (typeof id === 'number' && Object.keys(patchData).length > 0) {
      onSave?.(id, patchData as Partial<CreateDocument>)
        .then(() => {
          setIsDialogOpen(false);
        })
        .catch((error) => {
          console.error('Ошибка при сохранении', error);
        });
    } else if (!id) {
      onSave?.(newData)
        .then(() => {
          setIsDialogOpen(false);
        })
        .catch((error) => {
          console.error('Ошибка при создании документа', error);
        });
    } else {
      setIsDialogOpen(false);
    }
  };

  function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const binary = reader.result as string;
        const base64 = btoa(binary);
        resolve(base64);
        setBase64str(btoa(binary));
        setUploadedFileName(file.name);
      };
      reader.onerror = () => reject(new Error('Ошибка при чтении файла'));
      reader.readAsArrayBuffer(file);
    });
  }

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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documentTypeId" className="text-right">
              Тип документа
            </Label>
            <div className="col-span-3">
              <Select
                placeholder="Выберите тип документа"
                className="col-span-3"
                options={documentTypesOptions}
                defaultValue={documentTypesOptions.find(
                  (option) => option.isSelected
                )}
                onChange={handleOnDocumentTypeChange}
              />
            </div>
          </div>
          {Object.entries(inputs).map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {key}
              </Label>
              {key === 'base64Data' ? (
                <div className="col-span-3">
                  {inputs.base64Data ? (
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-green-600">
                        Файл <strong>{uploadedFileName}</strong> успешно
                        загружен
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setInputs((prev) => ({
                            ...prev,
                            base64Data: '',
                          }))
                        }
                      >
                        Заменить файл
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.onchange = async (event: Event) => {
                          const target = event.target as HTMLInputElement;
                          const file = target?.files?.[0];
                          if (file) {
                            try {
                              const base64 = await convertFileToBase64(file);
                              setInputs((prev) => ({
                                ...prev,
                                base64Data: base64,
                              }));
                              setUploadedFileName(file.name);
                            } catch (error) {
                              console.error('Ошибка при загрузке файла', error);
                            }
                          }
                        };
                        fileInput.click();
                      }}
                    >
                      Загрузить файл
                    </Button>
                  )}
                </div>
              ) : Array.isArray(value) || value === null ? (
                <div className="col-span-3">
                  <Select
                    placeholder="Выберите значение"
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    defaultValue={defaultSelectValues}
                    options={documentAttributesOptions}
                    onChange={handleOnAttributesChange}
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
          ))}
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
