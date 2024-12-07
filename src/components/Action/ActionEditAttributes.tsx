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
import { FormSwitcherProps, OptionItem } from '@components/UI/Form/types';
import { DIALOGS_ATTRIBUTES } from '@constants/adminAttributes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MultiValue } from 'react-select';
import { ChangeAttribute } from 'src/types/index';
import { z, ZodType } from 'zod';
import { ActionDefaultData } from './types';

interface ActionEditAttributesProps<TData, RData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  dialogTexts: DialogTexts;
  configFields: FormSwitcherProps[];
  onUpdate?: (id: number, payload: TData) => Promise<void>;
  onCreate?: (payload: TData) => Promise<void>;
  mapSubmitPayload: <TNewData>(payload: TData) => TNewData;
  relatedData?: RData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSchemaValidate?: z.infer<ZodType<any, any, any>>;
}

type StringMap = Record<string, string>;

export const ActionEditAttributes = <TData extends { id: number }, RData>({
  dialogTexts,
  configFields,
  onUpdate,
  onCreate,
  mapSubmitPayload,
  formSchemaValidate,
  data,
  relatedData,
  ...props
}: ActionEditAttributesProps<TData, RData>) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState(
    (data as unknown as ChangeAttribute).required ?? true
  );

  const form = useForm<TData>({
    resolver:
      onCreate && formSchemaValidate
        ? zodResolver(formSchemaValidate)
        : undefined,
    values: data,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const onSubmit = async (payload: TData) => {
    payload = { ...payload, documentTypeIds: selectedIds, required: isChecked };

    if (data && !isEmpty(payload)) {
      await (onUpdate
        ? onUpdate(data.id, mapSubmitPayload(payload))
        : onCreate?.(mapSubmitPayload(payload)));
      setIsDialogOpen(false);
    }
  };

  const getDefaultValues = (
    attribute: ChangeAttribute,
    docTypesNamesWithIds: StringMap
  ) => {
    return (
      attribute.documentTypeIds?.map((id) => {
        return {
          value: docTypesNamesWithIds[id],
          label: docTypesNamesWithIds[id],
        };
      }) ?? []
    );
  };

  const handleOnCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleOnSelectChange = (newValue: unknown) => {
    const attributesValues = (newValue as MultiValue<OptionItem>).map(
      (val) => val.value
    );

    if ((newValue as MultiValue<OptionItem>).length && relatedData) {
      const ids = Object.entries(relatedData as unknown as StringMap)
        .filter(([, value]) => attributesValues.includes(value))
        .map(([key]) => Number(key));
      setSelectedIds(ids);
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" {...props}>
          {btnTriggerText === DIALOGS_ATTRIBUTES.EDIT.btnTriggerText && <Pencil />}
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
              const defaultValue: OptionItem[] = getDefaultValues(
                data as unknown as ChangeAttribute,
                relatedData as StringMap
              );

              const newSelectFieldProps = {
                ...field.selectFieldProps,
                defaultValue,
                onChange: handleOnSelectChange,
              };

              const newCheckboxFieldProps = {
                checked: isChecked,
                onChange: handleOnCheckboxChange,
              };

              const newField = {
                ...field,
                selectFieldProps: newSelectFieldProps,
                checkboxFieldProps: newCheckboxFieldProps,
              };

              return (
                <FormSwitcher key={field.baseFieldProps.name} {...newField} />
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
