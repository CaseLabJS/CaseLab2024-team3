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
import { Trash } from 'lucide-react';
import { ActionDefaultData } from './types';

interface ActionDeleteProps<TData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  onDeleteWithStringId?: (id: string) => Promise<void>;
  onDeleteWithNumberId?: (id: number) => Promise<void>;
}

export const ActionDelete = <TData,>({
  onDeleteWithNumberId,
  onDeleteWithStringId,
  data,
  ...props
}: ActionDeleteProps<TData>) => {
  const handleClick = () => {
    const id = typeof data === 'object' && data && 'id' in data && data?.id;

    if (typeof id === 'number' && onDeleteWithNumberId) {
      onDeleteWithNumberId(id);
    } else if (typeof id === 'string' && onDeleteWithStringId) {
      onDeleteWithStringId(id);
    } else {
      console.warn('Missing or invalid "id" property in data');
    }
  };

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
            onClick={handleClick}
          >
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
