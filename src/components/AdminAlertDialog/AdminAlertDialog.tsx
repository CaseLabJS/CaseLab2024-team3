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
} from '@/components/UI';
import { AdminDialogData, DialogTexts } from '@/types';

export interface AdminAlertDialogProps<TData extends AdminDialogData> {
  id?: number;
  data: TData;
  dialogTexts: DialogTexts;
  onDelete: (id: number) => void;
}

export function AdminAlertDialog<TData extends AdminDialogData>({
  onDelete,
  id,
}: AdminAlertDialogProps<TData>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Удалить</Button>
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
              if (id) {
                onDelete(id);
              }
            }}
          >
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
