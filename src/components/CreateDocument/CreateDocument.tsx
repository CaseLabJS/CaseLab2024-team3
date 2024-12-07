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

import { fieldLabels } from '@constants/createDocument';
import { useMemo, useState } from 'react';
import Select from 'react-select';
import {
  ChangeAttribute,
  ChangeDocumentType,
  CreateDocument,
} from 'src/types/index';
import { CreateDocumentProps, OptionItem } from './createDocuments.types';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

export const CreateDocumentForm = ({
  data,
  documentTypes,
  documentAttributes,
  dialogTexts,
  onSave,
  updateTableData,
}: CreateDocumentProps<
  CreateDocument,
  ChangeDocumentType,
  ChangeAttribute
>) => {
  const [selectedDocumentType, setSelectedDocumentType] = useState<
    number | null
  >(null);
  const [inputs, setInputs] = useState(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [base64str, setBase64str] = useState<string>('');
  const [filteredAttributes, setFilteredAttributes] = useState<
    ChangeAttribute[]
  >([]);

  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const documentTypesOptions: OptionItem[] = useMemo(
    () =>
      documentTypes?.map((type) => ({
        value: type.id.toString(),
        label: type.name || 'Без названия',
      })) ?? [],
    [documentTypes, data]
  );

  const handleOnDocumentTypeChange = (selectedOption: OptionItem | null) => {
    if (!selectedOption) {
      return;
    }

    const documentTypeId = Number(selectedOption.value);

    if (!documentTypes) {
      console.warn('documentTypes не определены');
      setFilteredAttributes([]);
      return;
    }

    const selectedDocumentTypeId = documentTypes.find(
      (type) => type.id === documentTypeId
    );

    if (selectedDocumentTypeId) {
      setSelectedDocumentType(selectedDocumentTypeId.id);

      const attributes =
        documentAttributes?.filter((attribute) =>
          selectedDocumentTypeId.attributeIds?.includes(attribute.id)
        ) || [];
      setFilteredAttributes(attributes);

      setInputs((prev) => ({
        ...prev,
        documentTypeId,
        attributeValues: attributes.map((attribute) => ({
          attributeId: attribute.id,
          value: '',
        })),
      }));
    } else {
      console.warn('Выбранный тип документа не найден');
      setFilteredAttributes([]);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAttributeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attributeId: number
  ) => {
    const newValue = e.target.value;
    setInputs((prev) => ({
      ...prev,
      attributeValues: prev.attributeValues?.map((attribute) =>
        attribute.attributeId === attributeId
          ? { ...attribute, value: newValue }
          : attribute
      ),
    }));
  };

  const handleOnSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (!base64str || !uploadedFileName) {
      console.error('Файл обязателен для загрузки');
      return;
    }
    const newData: CreateDocument = {
      ...inputs,
      documentTypeId: inputs.documentTypeId ?? 0,
      attributeValues: inputs.attributeValues ?? [],
      file: base64str
        ? {
            base64Data: base64str,
            fileName: uploadedFileName || '',
          }
        : undefined,
    };

    if (onSave) {
      onSave?.(newData)
        .then(() => {
          setIsDialogOpen(false);
          updateTableData?.();
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
        const arrayBuffer = reader.result as ArrayBuffer;
        const binary = new Uint8Array(arrayBuffer).reduce(
          (acc, byte) => acc + String.fromCharCode(byte),
          ''
        );
        const base64 = btoa(binary);
        resolve(base64);
        setBase64str(base64);
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
          <DialogTitle className="text-center mb-2">
            {dialogTitleText}
          </DialogTitle>
          <DialogDescription className="text-center">
            {dialogDescriptionText}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleOnSave}
          name="createDocument"
          className="space-y-2"
        >
          <div >
            <div>
              <Label
                htmlFor="documentTypeId"
                className="text-indigo-700 text-sm font-medium flex mb-2"
              >
                Тип документа*
              </Label>
              <div className="col-span-3">
                <Select
                  name="Выбор типа документа"
                  placeholder="Выберите тип документа"
                  required
                  className="basic-multi-select col-span-3"
                  classNamePrefix="select"
                  options={documentTypesOptions}
                  defaultValue={documentTypesOptions.find(
                    (option) => +option.value === selectedDocumentType
                  )}
                  onChange={(selectedOption) => {
                    if (!selectedOption) return;
                    handleOnDocumentTypeChange(selectedOption);
                  }}
                />
              </div>
            </div>

            {filteredAttributes.length > 0 && (
              <>
                {filteredAttributes.map((attribute: ChangeAttribute) => (
                  <div key={attribute.id}>
                    <Label
                      htmlFor={`attribute-${attribute.id}`}
                      className="text-indigo-700 text-sm font-medium flex mb-2"
                    >
                      {attribute.name}
                      {attribute.required ? '*' : ''}
                    </Label>
                    <Input
                      name={`attribute-${attribute.id}`}
                      value={
                        inputs.attributeValues?.find(
                          (attr) => attr.attributeId === attribute.id
                        )?.value || ''
                      }
                      required={attribute.required}
                      onChange={(e) => handleAttributeChange(e, attribute.id)}
                    />
                  </div>
                ))}
              </>
            )}
            {Object.entries(inputs)
              .filter(([key]) => !fieldLabels[key]?.hidden)
              .map(([key]) => (
                <div key={key}>
                  <Label
                    htmlFor={key}
                    className="text-indigo-700 text-sm font-medium flex mb-2"
                  >
                    {fieldLabels[key]?.label || key}
                    {fieldLabels[key].label === 'Название документа' ? '*' : ''}
                  </Label>
                  {key === 'file' ? (
                    <div className="col-span-3">
                      {inputs.file &&
                      inputs.file.base64Data &&
                      inputs.file.fileName ? (
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
                                file: { fileName: '', base64Data: '' },
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
                          type="button"
                          onClick={() => {
                            const fileInput = document.createElement('input');
                            fileInput.type = 'file';
                            fileInput.onchange = async (event: Event) => {
                              const target = event.target as HTMLInputElement;
                              const file = target?.files?.[0];
                              if (file) {
                                try {
                                  const base64 =
                                    await convertFileToBase64(file);
                                  setInputs((prev) => ({
                                    ...prev,
                                    file: {
                                      fileName: file.name,
                                      base64Data: base64,
                                    },
                                  }));
                                  setUploadedFileName(file.name);
                                } catch (error) {
                                  console.error(
                                    'Ошибка при загрузке файла',
                                    error
                                  );
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
                  ) : (
                    <Input
                      name={key}
                      required
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
              disabled={
                !uploadedFileName ||
                !inputs.documentTypeId ||
                !inputs.name?.trim() ||
                filteredAttributes.some((attribute) => {
                  const attributeValue = inputs.attributeValues?.find(
                    (attr) => attr.attributeId === attribute.id
                  );
                  return (
                    attribute.required &&
                    (!attributeValue || attributeValue.value?.trim() === '')
                  );
                })
              }
            >
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
