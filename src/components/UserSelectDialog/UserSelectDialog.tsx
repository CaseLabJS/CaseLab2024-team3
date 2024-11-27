import { useState, useMemo } from "react";
import Select from "react-select";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/UI";

import { ChangeUser, UserRegister } from "@/types/index";

interface UserSelectDialogProps {
  users: ChangeUser[];
  currentUser: UserRegister | ChangeUser | null;
  dialogTitle?: string;
  dialogDescription?: string;
  triggerButtonText: string;
  onConfirm: (selectedUserId: string) => void;
}

export const UserSelectDialog: React.FC<UserSelectDialogProps> = ({
  users,
  currentUser,
  dialogTitle = "Отправка на подпись",
  dialogDescription = "Выберите пользователя, которому хотите отправить документ на подпись.",
  triggerButtonText,
  onConfirm,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ChangeUser | null>(null);

  const userOptions = useMemo(
    () =>
      users.filter((user) => user.id !== currentUser?.id).map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName} (${user.email})`,
      })),
    [users]
  );

  const handleSelectChange = (option: { value: string; label: string } | null) => {
    const user = users.find((u) => u.id === option?.value) || null;
    setSelectedUser(user);
  };

  const handleConfirm = () => {
    if (selectedUser) {
      onConfirm(selectedUser.id);
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-green-600 bg-green-600 text-white hover:bg-green-700">
          {triggerButtonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Select
            options={userOptions}
            placeholder="Выберите пользователя"
            value={selectedUser ? { value: selectedUser.id, label: `${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.email})` } : null}
            onChange={handleSelectChange}
            classNamePrefix="select"
            className="basic-multi-select"
          />
        </div>

        <DialogFooter>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="hover:bg-bg-header"
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedUser}
            className={`${
              selectedUser
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            Отправить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
