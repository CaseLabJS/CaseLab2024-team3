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
import { PenTool } from 'lucide-react';
import { DocumentState } from '@/types/state';

interface ActionSignProps<TData> extends ActionDefaultData<TData>, ButtonProps {
  onSignByAuthor: (id: number, status: DocumentState) => Promise<void>;
}

export const ActionSignByAuthor = <
  TData extends { id: number; state: DocumentState },
>({
  onSignByAuthor,
  data,
  ...props
}: ActionSignProps<TData>) => {
  if (
    data?.state === DocumentState.DRAFT ||
    data?.state === DocumentState.PENDING_AUTHOR_SIGN
  ) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" {...props}>
            <PenTool />
            Подписать
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтверждение подписания</AlertDialogTitle>
            <AlertDialogDescription>
              Вы собираетесь подписать этот документ. Убедитесь, что вы
              ознакомились с его содержимым.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="mb-3 hover:bg-bg-header">
              Отменить
            </AlertDialogCancel>
            <AlertDialogAction
              className="hover:opacity-75 mb-3 bg-bg-header hover:bg-bg-header"
              onClick={() => {
                if (!isEmpty(data) && data?.id && data?.state) {
                  onSignByAuthor(data.id, data.state);
                }
              }}
            >
              Подписать
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
};
