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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActionDefaultData } from './types';
import { DialogTexts } from '@/types/adminTypes';
import { Pencil } from 'lucide-react';
import { BaseFieldProps } from '@components/UI/Form/types';
import { isEmpty } from '@/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

interface ActionEditProps<TData> extends ActionDefaultData<TData>, ButtonProps {
  dialogTexts: DialogTexts;
  configFields: BaseFieldProps[];
  onUpdate: (id: number, payload: TData) => Promise<void>;
  mapSubmitPayload: <TNewData>(payload: TData) => TNewData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSchemaValidate?: z.infer<ZodType<any, any, any>>;
}

export const ActionEdit = <TData extends { id: number }>({
  dialogTexts,
  configFields,
  onUpdate,
  mapSubmitPayload,
  formSchemaValidate,
  data,
  ...props
}: ActionEditProps<TData>) => {
  const form = useForm<TData>({
    resolver: formSchemaValidate ? zodResolver(formSchemaValidate) : undefined,
    values: data,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const onSubmit = async (payload: TData) => {
    if (data?.id && !isEmpty(payload)) {
      await onUpdate(data.id, mapSubmitPayload(payload));
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
          <DialogTitle>{dialogTitleText}</DialogTitle>
          <DialogDescription>{dialogDescriptionText}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {configFields.map((field) => (
              <FormSwitcher key={field.name} {...field} />
            ))}
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
