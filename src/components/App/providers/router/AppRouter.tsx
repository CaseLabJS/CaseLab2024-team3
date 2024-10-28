import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "src/components/Layout/Layout";
import ProtectedRoute from "src/components/ProtectedRoute/ProtectedRoute";
import { AdminPage } from "src/pages/AdminPage";
import DocumentsPage from "src/pages/DocumentsPage";
import NotFoundPage from "src/pages/NotFoundPage";
import { UserDashboardPage } from "src/pages/UserDashboardPage";
import UsersPage from "src/pages/UsersPage";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>...Загрузка</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate replace to='app' />} />
          <Route path='app' element={<UserDashboardPage />}>
            <Route path='documents' element={<DocumentsPage />} />
            <Route path='users' element={<UsersPage />} />
          </Route>
          <Route
            path='admin'
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
