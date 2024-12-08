import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStore, usersStore } from 'src/stores';
import { STATUS } from 'src/types/status';
import { Spinner } from '../UI';
import { ROUTE_CONSTANTS } from 'src/constants/routes';

interface ProtectedRouteProps {
  role: string;
}

const MapComponent: Record<STATUS, (props: { role: string }) => JSX.Element> = {
  [STATUS.INITIAL]: () => <ProtectedRouteLoading />,
  [STATUS.LOADING]: () => <ProtectedRouteLoading />,
  [STATUS.SUCCESS]: (props) => <ProtectedRouteSuccess {...props} />,
  [STATUS.ERROR]: () => <Navigate to={ROUTE_CONSTANTS.SIGN_IN} />,
};

const ProtectedRouteLoading = () => {
  return (
    <div className="flex justify-center items-center flex-grow">
      <Spinner />
    </div>
  );
};

const ProtectedRouteSuccess: FC<{ role: string }> = observer(({ role }) => {
  if (authStore.isAuth) {
    const MapComponent: Record<STATUS, () => JSX.Element> = {
      [STATUS.INITIAL]: () => <ProtectedRouteLoading />,
      [STATUS.ERROR]: () => <ProtectedRouteLoading />,
      [STATUS.LOADING]: () => <ProtectedRouteLoading />,
      [STATUS.SUCCESS]: () => {
        if (
          usersStore.user &&
          Array.isArray(usersStore.user.roles) &&
          usersStore.user.roles.some(
            (roleUser) => typeof roleUser === 'object' && roleUser.name === role
          )
        )
          return <Outlet />;
        return <Navigate to={ROUTE_CONSTANTS.SIGN_IN} />;
      },
    };

    const renderComponent = MapComponent[usersStore.status] || (() => null);
    return renderComponent();
  } else {
    return <Navigate to={ROUTE_CONSTANTS.SIGN_IN} />;
  }
});

const ProtectedRoute: FC<ProtectedRouteProps> = observer(({ role }) => {
  const Component = MapComponent[authStore.status] ?? null;

  if (!Component) return null;

  if (!authStore.isAuth && authStore.status !== STATUS.LOADING) {
    return <Navigate to={ROUTE_CONSTANTS.SIGN_IN} />;
  }

  return <Component role={role} />;
});

export default ProtectedRoute;
