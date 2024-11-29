import { usersStore } from '@/stores';
import { ActionDelete, ActionEdit } from '@components/Action';
import { CreateUserForm } from '@components/CreateUser/CreateUserForm';
import { CreateUser } from '@components/CreateUser/createUsersForm.types';
import { DataTable2 } from '@components/DataTable2';
import { Spinner } from '@components/UI';
import UpdatePasswordDialog from '@components/UpdatePasswordDialog/UpdatePasswordDialog';
import { DIALOGS_VALUES, EMPTY_USER_ATTRIBUTE } from '@constants/admin';
import {
  CONFIG_FIELDS_USER_EDIT,
  TABLE_USERS_LIST_CONFIG,
  mapSubmitPayloadUserEdit,
} from '@constants/usersListTable';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NumberParam, useQueryParams } from 'use-query-params';

const UsersAdminPage = observer(() => {
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    limit: NumberParam,
  });
  const { updateUser, deleteUser, fetchUsers, users, isLoading, createUser } =
    usersStore;
  useEffect(() => {
    void usersStore.fetchUsers(
      query.page ?? 0, //+ 1
      query.limit ?? 20
    );
  }, [query.limit, query.page]);

  useEffect(() => {
    void fetchUsers(0, 100);
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Spinner />
      </div>
    );
  }

  const refreshTableData = () => {
    usersStore.fetchUsers();
  };
  return (
    <div className="p-10 flex flex-col h-layout gap-4 overflow-y-auto">
      <div></div>
      {users && users.length > 0 ? (
        <>
          <div style={{ display: 'flex', gap: '30px' }}>
            <CreateUserForm
              dialogTexts={DIALOGS_VALUES.userCreate}
              data={EMPTY_USER_ATTRIBUTE}
              onSave={createUser as (data: CreateUser) => Promise<void>}
              updateTableData={refreshTableData}
            />
            <UpdatePasswordDialog />
          </div>

          <section className="flex-grow overflow-auto flex py-5">
            <DataTable2
              columns={TABLE_USERS_LIST_CONFIG}
              data={users}
              initialState={{
                page: query.page!,
                limit: query.limit!,
              }}
              handlers={{
                onPaginationChange: (updater) => {
                  const newSortingValue =
                    updater instanceof Function
                      ? updater({
                          pageIndex: query.page ?? 0,
                          pageSize: query.limit ?? 20,
                        })
                      : updater;
                  setQuery({
                    page: newSortingValue.pageIndex,
                    limit: newSortingValue.pageSize,
                  });
                },
              }}
              meta={{
                pagination: {
                  //totalPages: Pagination.totalPages,
                },
                actionMore: {
                  onEdit: (props) => (
                    <ActionEdit
                      onUpdate={updateUser}
                      mapSubmitPayload={mapSubmitPayloadUserEdit}
                      dialogTexts={DIALOGS_VALUES.userEdit}
                      configFields={CONFIG_FIELDS_USER_EDIT}
                      {...props}
                    />
                  ),
                  onDelete: (props) => (
                    <ActionDelete onDelete={deleteUser} {...props} />
                  ),
                },
              }}
            />
          </section>
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
