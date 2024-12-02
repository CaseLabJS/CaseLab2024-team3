import { useState, useMemo } from "react";
import Select, { MultiValue } from "react-select";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "src/components/UI";

import { ChangeUser, UserRegister, Voting } from "@/types/index";
import { DateTimePicker } from "@components/UI/DateTimePicker";
import { useParams } from "react-router-dom";

interface UserSelectDialogProps {
  process: 'signing' | 'voting';
  users: ChangeUser[];
  currentUser: UserRegister | ChangeUser | null;
  dialogTitle?: string;
  dialogDescription?: string;
  triggerButtonText: string;
  onConfirmSigning?: (selectedUserId: string) => Promise<void>;
  onConfirmVoting?: (votingData: Voting) => Promise<void>;
  getVotingResult?: (id: number) => Promise<void>;
}

interface SelectedVoter {
  value: string;
  label: string;
}

export const UserSelectDialog: React.FC<UserSelectDialogProps> = ({
  process,
  users,
  currentUser,
  dialogTitle,
  dialogDescription,
  triggerButtonText,
  onConfirmSigning,
  onConfirmVoting,
  getVotingResult,
}) => {
  const { documentId } = useParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ChangeUser | null>(null);
  // voting fields
  const [deadline, setDeadline] = useState<Date>();
  const [agreementPercent, setAgreementPercent] = useState<number | null>(null);
  const [selectedVoters, setSelectedVoters] = useState<
    { value: string; label: string }[] | []
  >([]);

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

  const handleSelectVoters = (newValue: MultiValue<SelectedVoter>) => {
    setSelectedVoters(newValue as SelectedVoter[]);
  };

  const handleConfirm = () => {
    if (
      process === 'voting' &&
      documentId &&
      documentId !== undefined &&
      selectedVoters.length > 0 &&
      deadline
    ) {
      const votingData: Voting = {
        documentId: +documentId,
        deadline: deadline.toISOString(),
        ...(agreementPercent && { agreementPercent: agreementPercent }),
        usersIds: selectedVoters.map((voter) => voter.value),
      };
      onConfirmVoting?.(votingData)
        .then(() => getVotingResult?.(+documentId))
        .catch((err) => console.error('Ошибка при отправке', err));
    }
    if (selectedUser) {
      // process === 'signing'
      onConfirmSigning?.(selectedUser.id);
      setIsDialogOpen(false);
    }
  };

  const buttonColors = {
    signing: 'border-green-600 bg-green-600 text-white hover:bg-green-700',
    voting: 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700',
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {
          <Button variant="outline" className={buttonColors[process]}>
            {triggerButtonText}
          </Button>
        }
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {process === 'signing' && (
            <Select
              options={userOptions}
              placeholder="Выберите пользователя"
              value={selectedUser ? { value: selectedUser.id, label: `${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.email})` } : null}
              onChange={handleSelectChange}
              classNamePrefix="select"
              className="basic-multi-select"
            />
          )}
          {process === 'voting' && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Голосующие: </Label>
                <div className="col-span-3">
                  <Select
                    options={userOptions}
                    isMulti
                    placeholder="Выберите голосующих"
                    value={selectedVoters}
                    onChange={handleSelectVoters}
                    classNamePrefix="select"
                    className="basic-multi-select"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Процент одобрения: </Label>
                <div className="col-span-3">
                  <Input
                    type="number"
                    required
                    value={agreementPercent || ''}
                    onChange={(e) =>
                      setAgreementPercent(
                        Math.min(100, Math.max(0, parseInt(e.target.value)))
                      )
                    }
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Крайний срок голосования: </Label>
                <div className="col-span-3">
                  {/* source: https://time.openstatus.dev/ */}
                  <DateTimePicker
                    setDeadline={setDeadline}
                    deadline={deadline}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="hover:bg-bg-header"
          >
            Отмена
          </Button>
          {process === 'signing' && (
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
          )}
          {process === 'voting' && (
            <Button
              onClick={handleConfirm}
              disabled={!selectedVoters.length || !deadline}
              className={`${
                selectedVoters.length && deadline
                  ? 'bg-green-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Отправить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
