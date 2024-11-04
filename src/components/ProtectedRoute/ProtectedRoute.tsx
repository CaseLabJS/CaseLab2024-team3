import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from 'src/stores';
import { STATUS } from 'src/types/status';
import { Spinner } from '../UI';
import { UNEXPECTED_ERROR_MESSAGE } from 'src/constants/errorMessage';
import { ROUTE_CONSTANTS } from 'src/constants/routes';

interface ProtectedRouteProps {
  role: string;
}

const MapComponent: Record<STATUS, () => JSX.Element> = {
  [STATUS.INITIAL]: () => <ProtectedRouteLoading />,
  [STATUS.LOADING]: () => <ProtectedRouteLoading />,
  [STATUS.SUCCESS]: () => <ProtectedRouteSuccess />,
  [STATUS.ERROR]: () => <ProtectedRouteError />,
};

const ProtectedRouteLoading = () => {
  return (
    <div className="flex justify-center items-center flex-grow">
      <Spinner />
    </div>
  );
};

const ProtectedRouteSuccess = observer(() => {
  if (authStore.isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTE_CONSTANTS.SIGN_IN} />;
  }
});

const ProtectedRouteError = observer(() => {
  throw new Error(UNEXPECTED_ERROR_MESSAGE);
});

const ProtectedRoute: FC<ProtectedRouteProps> = observer(() => {
  const Component = MapComponent[authStore.status] ?? null;
  if (!Component) return null;
  return <Component />;
});

export default ProtectedRoute;
