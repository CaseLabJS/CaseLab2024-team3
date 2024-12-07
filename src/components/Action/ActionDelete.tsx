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
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteValidStates } from '@constants/userDocument';
import { DocumentState } from '@/types/state';

interface ActionDeleteProps<TData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  onDeleteWithStringId?: (id: string) => Promise<void>;
  onDeleteWithNumberId?: (id: number) => Promise<void>;
}

export const ActionDelete = <
  TData extends { id: number; state: DocumentState },
>({
  onDeleteWithNumberId,
  onDeleteWithStringId,
  data,
  ...props
}: ActionDeleteProps<TData>) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const id = typeof data === 'object' && data && 'id' in data && data?.id;

    const handleNavigation = () => {
      if (location.pathname.startsWith(`/app/${id as number}`)) {
        navigate('../documents');
      }
    };

    if (typeof id === 'number' && onDeleteWithNumberId) {
      onDeleteWithNumberId(id);
      handleNavigation();
    } else if (typeof id === 'string' && onDeleteWithStringId) {
      onDeleteWithStringId(id);
      handleNavigation();
    } else {
      console.warn('Missing or invalid "id" property in data');
    }
  };

  if (data && deleteValidStates.includes(data?.state)) {
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
  }
};
