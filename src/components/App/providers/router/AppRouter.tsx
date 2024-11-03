import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout/Layout";
import ProtectedRoute from "src/components/ProtectedRoute/ProtectedRoute";
import { Spinner } from "src/components/UI";
import { ROUTE_CONSTANTS } from "src/constants/routes";
import { AdminPage } from "src/pages/AdminPage";
import DocumentsPage from "src/pages/DocumentsPage";
import NotFoundPage from "src/pages/NotFoundPage";
import { SignInPage } from "src/pages/SignInPage";
import { SignUpPage } from "src/pages/SignUpPage";
import { UserDashboardPage } from "src/pages/UserDashboardPage";
import UsersPage from "src/pages/UsersPage";

const AppRouter = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center flex-grow h-full"><Spinner /></div>}>
      <Routes>
        <Route path={ROUTE_CONSTANTS.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTE_CONSTANTS.SIGN_UP} element={<SignUpPage />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute role="user" />}>
            <Route index element={<Navigate replace to='app' />} />
            <Route path='app' element={<UserDashboardPage />}>
              <Route path='documents' element={<DocumentsPage />} />
              <Route path='users' element={<UsersPage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
