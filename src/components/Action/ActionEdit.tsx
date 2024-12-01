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
import { FormSwitcherProps } from '@components/UI/Form/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { ActionDefaultData } from './types';

interface ActionEditProps<TData, UData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  dialogTexts: DialogTexts;
  configFields: FormSwitcherProps[];
  onUpdate: (id: number, payload: UData) => Promise<void>;
  mapSubmitPayload: <TNewData>(payload: UData) => TNewData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSchemaValidate?: z.infer<ZodType<any, any, any>>;
}

export const ActionEdit = <TData extends { id: number }, UData>({
  dialogTexts,
  configFields,
  onUpdate,
  mapSubmitPayload,
  formSchemaValidate,
  data,
  ...props
}: ActionEditProps<TData, UData>) => {
  const form = useForm<TData>({
    resolver: formSchemaValidate ? zodResolver(formSchemaValidate) : undefined,
    values: data,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { btnTriggerText, dialogDescriptionText, dialogTitleText } =
    dialogTexts;

  const onSubmit = async (payload: UData) => {
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
              <FormSwitcher key={field.baseFieldProps.name} {...field} />
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
