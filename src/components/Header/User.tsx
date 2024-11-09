import { convertFIO } from '@/lib';
import { usersStore } from '@/stores';
import { STATUS } from '@/types/status';
import { Skeleton } from '@components/UI';
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import UserIcon from 'src/assets/User.svg';

interface UserProps { }

const UserSuccess = observer(() => {
    return (
        <span className="text-white text-sm">{convertFIO(usersStore.user!)}</span>
    )
})

const UserLoading = () => {
    return <Skeleton className='w-20 h-5' />
}

const UserError = () => {
    return null
}

const MapComponent: Record<STATUS, () => JSX.Element> = {
    [STATUS.INITIAL]: () => <UserLoading />,
    [STATUS.LOADING]: () => <UserLoading />,
    [STATUS.ERROR]: () => <UserError />,
    [STATUS.SUCCESS]: () => <UserSuccess />
}

export const User: FC<UserProps> = observer(() => {
    const Component = MapComponent[usersStore.status] || null
    if (!Component) return null
    return (
        <div className="flex items-center space-x-2">
            <img src={UserIcon} alt="User Icon" className="w-7 h-7" />
            <Component />
        </div>
    )
})
