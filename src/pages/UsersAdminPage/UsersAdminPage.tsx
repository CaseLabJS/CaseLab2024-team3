import { usersStore } from '@/stores';
import { AdminDialog } from '@components/AdminDialog/AdminDialog';
import { DataTable } from '@components/DataTable/DataTable';
import { Spinner } from '@components/UI';
import {
  DIALOGS_VALUES,
  EMPTY_USER_ATTRIBUTE,
  USERS_TABLE_COLUMNS,
} from '@constants/admin';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const UsersAdminPage = observer(() => {
  const { updateUser, deleteUser, fetchUsers, users, isLoading, createUser } =
    usersStore;
  useEffect(() => {
    void fetchUsers();
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="p-10 flex flex-col h-[calc(100vh-130px)] gap-4 overflow-y-auto">
      {users && users.length > 0 ? (
        <>
          <AdminDialog
            dialogTexts={DIALOGS_VALUES.userCreate}
            data={EMPTY_USER_ATTRIBUTE}
            onSave={createUser}
          />
          <div>
            <DataTable
              columns={USERS_TABLE_COLUMNS}
              data={users}
              onDelete={deleteUser}
              onEdit={updateUser}
            />
          </div>
        </>
      ) : (
        <div className="flex align-center w-full h-full">
          Данные пока не заполнены.
        </div>
      )}
    </div>
  );
});

export default UsersAdminPage;
