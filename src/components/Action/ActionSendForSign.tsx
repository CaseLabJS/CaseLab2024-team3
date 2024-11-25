import { useState } from 'react';
import Select from 'react-select';
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
import { PenTool } from 'lucide-react';
import { DocumentState } from '@/types/state';
import { ChangeUser, UserRegister } from '@/types/index';

interface ActionSendForSignProps<TData>
  extends ActionDefaultData<TData>,
    ButtonProps {
  onSendForSign: (id: number, userId: string) => Promise<void>;
  currentUser: UserRegister | ChangeUser | null;
  users: ChangeUser[];
}

export const ActionSendForSign = <
  TData extends { id: number; state: DocumentState },
>({
  onSendForSign,
  data,
  currentUser,
  users,
  ...props
}: ActionSendForSignProps<TData>) => {
  const [selectedUser, setSelectedUser] = useState<ChangeUser | null>(null);

  const options = users.filter((user) => user.id !== currentUser?.id).map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName} ${user.email}`,
  }));

  if (data?.state === DocumentState.AUTHOR_SIGNED) {
    return (
      <AlertDialog onOpenChange={(open) => {
        if (!open) {
          setSelectedUser(null);
        }}
      }>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" {...props}>
            <PenTool />
            Отправить на подпись
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Отправка на подпись</AlertDialogTitle>
            <AlertDialogDescription>
              Выберите пользователя, которому хотите отправить документ на
              подпись.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Select
              options={options}
              value={
                selectedUser
                  ? { value: selectedUser.id, label: `${selectedUser.firstName} ${selectedUser.lastName} ${selectedUser.email}` }
                  : null
              }
              onChange={(option) => {
                setSelectedUser(
                  users.find((user) => user.id === option?.value) || null
                );
              }}
              placeholder="Выберите пользователя"
              classNamePrefix="select"
              className="basic-multi-select"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="mb-3 hover:bg-bg-header">
              Отменить
            </AlertDialogCancel>
            <AlertDialogAction
              className="hover:opacity-75 mb-3 bg-bg-header hover:bg-bg-header"
              onClick={() => {
                if (data?.id && selectedUser) {
                  onSendForSign(data.id, selectedUser.id);
                }
              }}
              disabled={!selectedUser}
            >
              Отправить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
};
