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
import { DocumentState } from '@/types/state';

interface ActionSignProps<TData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  onSign: (id: number, status: DocumentState) => Promise<void>;
  action_text: string;
  action_color: string;
  description: string;
  status: DocumentState;
  children?: React.ReactNode;
}

export const ActionSign = <TData extends { id: number }>({
  onSign,
  data,
  action_text,
  action_color,
  description,
  status,
  children,
  ...props
}: ActionSignProps<TData>) => {
  console.log(data)
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" {...props}>
          {children}
          {action_text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
          <AlertDialogDescription>
            {description} Убедитесь, что вы ознакомились с его содержимым.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="mb-3 hover:bg-bg-header">
            Отменить
          </AlertDialogCancel>
          <AlertDialogAction
            className={`hover:opacity-75 mb-3 ${action_color}`}
            onClick={() => {
              if (!isEmpty(data) && data?.id) {
                onSign(data.id, status);
              }
            }}
          >
            {action_text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
