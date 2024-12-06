import { cn, convertFIO } from '@/lib';
import { usersStore } from '@/stores';
import { STATUS } from '@/types/status';
import { Skeleton } from '@components/UI';
import { User as UserIcon } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserSuccess = observer(() => {
  return (
    <span className="text-white text-sm">{convertFIO(usersStore.user!)}</span>
  );
});

const UserLoading = () => {
  return <Skeleton className="w-20 h-5" />;
};

const UserError = () => {
  return null;
};

const MapComponent: Record<STATUS, () => JSX.Element> = {
  [STATUS.INITIAL]: () => <UserLoading />,
  [STATUS.LOADING]: () => <UserLoading />,
  [STATUS.ERROR]: () => <UserError />,
  [STATUS.SUCCESS]: () => <UserSuccess />,
};

export const User: FC<UserProps> = observer(({ className, ...props }) => {
  const Component = MapComponent[usersStore.status] || null;
  if (!Component) return null;
  return (
    <div className={cn('flex items-center space-x-2', className)} {...props}>
      <UserIcon className="w-7 h-7 text-indigo-200" />
      <Component />
    </div>
  );
});
