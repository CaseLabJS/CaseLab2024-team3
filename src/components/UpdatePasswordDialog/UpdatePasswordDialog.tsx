import { Label } from '@components/UI/Label/Label';
import { Button } from '@components/UI/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/UI/Dialog/Dialog';
import { Input } from '@components/UI/Input/Input';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { usersStore } from '@/stores';
import { Lock } from 'lucide-react';

const DEFAULT_DIALOG_FORM_WIDTH = 625;

function UpdatePasswordDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [password, setPassword] = useState<string>('');
  const [oldpassword, setOldPassword] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const isAdmin = roles.includes('ADMIN');
  useEffect(() => {
    const userRoles = usersStore?.user?.roles;
    if (userRoles) {
      setRoles(userRoles.map((role) => role.name));
    }
  }, [usersStore?.user?.roles]);
  function handleOnSave() {
    if (!isAdmin) {
      usersStore.updateUserPasswordForUser(oldpassword, password);
      setIsDialogOpen(false);
    } else {
      if (selectedUser && password) {
        usersStore.updateUserPasswordForAdmin(selectedUser?.value, password);
        setIsDialogOpen(false);
      } else {
        alert('Пожалуйста, выберите пользователя и введите пароль.');
      }
    }
  }
  const userOptions = usersStore.users.map((user) => ({
    value: user.id,
    label: `${user.lastName} ${user.firstName} ${user.patronymic ?? ''}`.trim(),
  }));

  return (
    <div>
      <div>
        {isAdmin ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button variant="outline" className="max-w-fit">
                Изменить пароль пользователя
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader
                className={`sm:max-w-[${DEFAULT_DIALOG_FORM_WIDTH}px]`}
              >
                <DialogTitle style={{ marginBottom: '20px' }}>
                  Форма обновления пароля пользователя
                </DialogTitle>
                <DialogDescription>
                  Выберите в выпадающем списке пользователя и присвойте ему
                  новый пароль, затем нажмите кнопку Сохранить.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-5">
                <Select
                  placeholder="Выберите пользователя"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={userOptions}
                  onChange={(selectedOption) => setSelectedUser(selectedOption)}
                />

                <Label htmlFor="newPassword" className="text-left mb-2">
                  Введите новый пароль:
                </Label>
                <Input
                  name="newPassword"
                  type="text"
                  className="col-span-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button
                  className="block hover:opacity-75 mb-3 bg-bg-header hover:bg-bg-header"
                  type="button"
                  onClick={handleOnSave}
                >
                  Сохранить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <span title="Изменить пароль">
                <Lock className="text-indigo-200" />
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader
                className={`sm:max-w-[${DEFAULT_DIALOG_FORM_WIDTH}px]`}
              >
                <DialogTitle style={{ marginBottom: '20px' }}>
                  Форма обновления пароля
                </DialogTitle>
                <DialogDescription>
                  Введите старый и новый пароль, затем нажмите кнопку Сохранить.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col space-y-5">
                <Label htmlFor="oldPassword" className="text-left mb-2">
                  Введите старый пароль:
                </Label>
                <Input
                  name="oldPassword"
                  type="text"
                  className="col-span-3"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Label htmlFor="newPassword" className="text-left mb-2">
                  Введите новый пароль:
                </Label>
                <Input
                  name="newPassword"
                  type="text"
                  className="col-span-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button
                  className="block hover:opacity-75 mb-3 bg-bg-header hover:bg-bg-header"
                  type="button"
                  onClick={handleOnSave}
                >
                  Сохранить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default UpdatePasswordDialog;
