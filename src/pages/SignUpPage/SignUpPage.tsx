import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from 'src/stores';
import { STATUS } from 'src/types/status';

interface SignUpPage {}

const SignUpPage: FC<SignUpPage> = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    if (authStore.isAuth && authStore.status === STATUS.SUCCESS) {
      navigate('/app', { replace: true });
    }
  }, [authStore.status, authStore.isAuth]);

  return <div>SignUpPage</div>;
});

export default SignUpPage;
