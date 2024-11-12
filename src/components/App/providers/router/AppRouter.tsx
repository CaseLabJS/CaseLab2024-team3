import { DocAttributesAdminPage } from '@pages/DocAttributesAdminPage';
import { DocTypesAdminPage } from '@pages/DocTypesAdminPage';
import { UserAwaitingSignPage } from '@pages/UserAwaitingSignPage';
import { UserDashboardIndexPage } from '@pages/UserDashboardIndexPage';
import UserDocumentsPage from '@pages/UserDocumentsPage/UserDocumentsPage';
import { UsersAdminPage } from '@pages/UsersAdminPage';
import { UserSentForSignPage } from '@pages/UserSentForSignPage';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'src/components/Layout/Layout';
import ProtectedRoute from 'src/components/ProtectedRoute/ProtectedRoute';
import { Spinner } from 'src/components/UI';
import { ROUTE_CONSTANTS } from 'src/constants/routes';
import { AdminPage } from 'src/pages/AdminPage';
import NotFoundPage from 'src/pages/NotFoundPage';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { UserDashboardPage } from 'src/pages/UserDashboardPage';

const AppRouter = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center flex-grow h-full">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path={ROUTE_CONSTANTS.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUpPage />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute role="USER" />}>
            <Route index element={<Navigate replace to="app" />} />
            <Route path={ROUTE_CONSTANTS.APP} element={<UserDashboardPage />}>
              <Route
                path={ROUTE_CONSTANTS.USER_DASHBOARD_INDEX}
                element={<UserDashboardIndexPage />}
              />
              <Route
                path={ROUTE_CONSTANTS.USER_DOCUMENTS}
                element={<UserDocumentsPage />}
              />
              <Route
                path={ROUTE_CONSTANTS.USER_SENT_FOR_SIGN}
                element={<UserSentForSignPage />}
              />
              <Route
                path={ROUTE_CONSTANTS.USER_AWAITING_SIGN}
                element={<UserAwaitingSignPage />}
              />
            </Route>
          </Route>
          <Route element={<ProtectedRoute role="ADMIN" />}>
            <Route path={ROUTE_CONSTANTS.ADMIN} element={<AdminPage />}>
              <Route
                path={ROUTE_CONSTANTS.USERS}
                element={<UsersAdminPage />}
              />
              <Route
                path={ROUTE_CONSTANTS.DOC_TYPES_ADMIN}
                element={<DocTypesAdminPage />}
              />
              <Route
                path={ROUTE_CONSTANTS.DOC_ATTRIBUTES_ADMIN}
                element={<DocAttributesAdminPage />}
              />
            </Route>
          </Route>
          <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
