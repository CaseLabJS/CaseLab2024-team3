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
import { UpdateDocumentProps } from './UpdateDocument.types';
import {
  ChangeAttribute,
  ChangeDocument,
  CreateDocumentResponse,
} from 'src/types/index';
import { fieldLabels } from '@constants/updateDocument';
import { useParams } from 'react-router-dom';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

export const UpdateDocumentForm = ({
  data,
  documentAttributes,
  dialogTexts,
  onSave,
  onSetInputs,
}: UpdateDocumentProps<CreateDocumentResponse, any, ChangeAttribute[]>) => {
  const { documentId } = useParams();

  {
    /* При изменении документа обязательным является только поле attributeValues;
      name и base64Data являются опциональными, поэтому на каждое поле создано отдельное состояние,
      таким образом мы не перезапишем ранее прикрепленный файл к документу, если изменим документ без прикрепления нового файла */
  }
  const [documentName, setDocumentName] = useState(data?.documentName);
  const [inputs, setInputs] = useState(data?.attributeValues);
  const [file, setFile] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [base64str, setBase64str] = useState<string>('');
  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) =>
      prevInputs.map((input) => {
        if (input.attributeId === +name) {
          return { ...input, value };
        } else {
          return input;
        }
      })
    );
  };

  const handleOnFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'Название документа') {
      setDocumentName(e.target.value);
    } else if (e.target.name === 'Файл') {
      setFile(e.target.value);
    }
  };

  const handleOnSave = (event: React.FormEvent) => {
    event.preventDefault();
    const newData: ChangeDocument = {
      attributeValues: inputs.map((input) => ({
        attributeId: input.attributeId,
        value: input.value,
        file: base64str
          ? {
              base64Data: base64str,
              fileName: uploadedFileName ?? '',
            }
          : undefined,
      })),
      name: documentName,
      ...(file !== null && {
        file: { base64Data: file, fileName: uploadedFileName },
      }),
    };

    if (documentId) {
      onSave?.(+documentId, newData)
        .then(() => {
          onSetInputs(+documentId);
          setIsDialogOpen(false);
        })
        .catch((error) => {
          console.error('Ошибка при сохранении', error);
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
          <DialogTitle className="text-center mb-2">{dialogTitleText}</DialogTitle>
          <DialogDescription className="text-center">
            {dialogDescriptionText}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleOnSave}>
          <div className="grid gap-4 py-4">
            <div>
              {/* Название документа */}
              <Label className="text-indigo-700 text-sm font-medium flex mb-2">
                {fieldLabels.name.label}*:
              </Label>
              <Input
                name={fieldLabels.name.label}
                required
                value={documentName}
                onChange={handleOnFieldsChange}
                className="col-span-3"
              />
            </div>
            {inputs &&
              inputs.map((input) => (
                <div key={input.attributeId}>
                  <Label className="text-indigo-700 text-sm font-medium flex mb-2">
                    {(() => {
                      const attribute = documentAttributes?.find(
                        (attr) => attr.id === input.attributeId
                      );
                      return (
                        <>
                          {attribute?.name}
                          {attribute?.required ? '*' : ''}:
                        </>
                      );
                    })()}
                  </Label>
                  <Input
                    name={input.attributeId.toString()}
                    value={input.value}
                    required={
                      documentAttributes &&
                      documentAttributes?.find(
                        (attr) => attr.id === input.attributeId
                      )?.required
                    }
                    onChange={handleOnChange}
                    className="col-span-3"
                  />
                </div>
              ))}
          </div>

          <div>
            <Label className="text-indigo-700 text-sm font-medium flex mb-2">
              Файл:
            </Label>
            <div className="col-span-3">
              {file ? (
                <div className="flex items-center gap-4">
                  <div className="text-sm text-green-600">
                    Файл <strong>{uploadedFileName}</strong> успешно загружен
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFile('')}
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
                          const base64 = await convertFileToBase64(file);
                          setFile(base64);
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
          </div>

          <DialogFooter>
            <Button
              className="block hover:opacity-75 my-3 bg-bg-header hover:bg-bg-header"
              type="submit"
            >
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
