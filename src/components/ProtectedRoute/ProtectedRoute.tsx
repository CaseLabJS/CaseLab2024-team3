import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStore, UsersStore } from 'src/stores';
import { STATUS } from 'src/types/status';
import { Spinner } from '../UI';
import { UNEXPECTED_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { ROUTE_CONSTANTS } from 'src/constants/routes';

interface ProtectedRouteProps {
  role: string;
}

const MapComponent: Record<STATUS, (props: { role: string }) => JSX.Element> = {
  [STATUS.INITIAL]: () => <ProtectedRouteLoading />,
  [STATUS.LOADING]: () => <ProtectedRouteLoading />,
  [STATUS.SUCCESS]: (props) => <ProtectedRouteSuccess {...props} />,
  [STATUS.ERROR]: () => <ProtectedRouteError />,
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
        if (UsersStore.user && Array.isArray(UsersStore.user.roles) && UsersStore.user.roles.some(roleUser => roleUser.name === role))
          return <Outlet />;
        return <Navigate to={ROUTE_CONSTANTS.NOT_FOUND} />;
      }
    };

    const renderComponent = MapComponent[UsersStore.status] || (() => null);
    return renderComponent();
  } else {
    return <Navigate to={ROUTE_CONSTANTS.SIGN_IN} />;
  }
});

const ProtectedRouteError = observer(() => {
  throw new Error(UNEXPECTED_ERROR_MESSAGE);
});

const ProtectedRoute: FC<ProtectedRouteProps> = observer(({ role }) => {
  const Component = MapComponent[authStore.status] ?? null;
  if (!Component) return null;
  return <Component role={role}/>;
});

export default ProtectedRoute;
