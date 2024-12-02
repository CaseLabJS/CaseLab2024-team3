import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  ButtonProps,
} from '@components/UI';
import { ActionDefaultData } from './types';
import { isEmpty } from '@/lib';
import { Trash } from 'lucide-react';

interface ActionDeleteProps<TData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  onDeleteWithStringId?: (id: string) => Promise<void>;
  onDeleteWithNumberId?: (id: number) => Promise<void>;
}

export const ActionDelete = <TData extends { id: number | string }>({
  onDeleteWithNumberId,
  onDeleteWithStringId,
  data,
  ...props
}: ActionDeleteProps<TData>) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" {...props}>
          <Trash />
          Удалить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы точно уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие не может быть отменено. Эта операция удалит данные с
            сервера.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="mb-3 hover:bg-bg-header">
            Отменить
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:opacity-75 mb-3 bg-bg-header hover:bg-bg-header"
            onClick={() => {
              if (!isEmpty(data) && data?.id && typeof data.id === 'number') {
                onDeleteWithNumberId?.(data?.id);
              } else if (typeof data?.id === 'string') {
                onDeleteWithStringId?.(data?.id);
              }
            }}
          >
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
