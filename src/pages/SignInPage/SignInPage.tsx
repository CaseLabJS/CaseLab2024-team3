import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Logo } from 'src/components/Logo';
import {
  BaseForm,
  Button,
  Card,
  CardContent,
  CardFooter,
  Form,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/UI';
import { authStore, usersStore } from 'src/stores';
import type { UserLogin } from 'src/types';
import { STATUS } from 'src/types/status';

interface SignInPageProps {}

const LogoSignIn: FC = () => {
  return (
    <div className="flex items-center">
      <Logo className="mr-3 h-6 sm:h-9 text-indigo-700" />
      <span className="text-sm font-bold">CaseLab team3</span>
    </div>
  );
};

const SignInPage: FC<SignInPageProps> = observer(() => {
  const navigate = useNavigate();
  const form = useForm<UserLogin>();

  useEffect(() => {
    const navigateToApp = async () => {
      if (authStore.isAuth && authStore.status === STATUS.SUCCESS) {
        await usersStore.fetchUserData();
        const userRoles = usersStore.user?.roles || [];
        const isAdmin = userRoles.some((role) => role.name === 'ADMIN');
  
        navigate(isAdmin ? '/admin' : '/app', { replace: true });
      }
    }
    
    navigateToApp();
  }, [authStore.status, authStore.isAuth]);

  const onSubmit = async (payload: UserLogin) => {
    await authStore.login(payload);
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-7 items-center">
        <LogoSignIn />
        <Card className="w-80 max-w-[100vw]">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <BaseForm.FormFieldInput name="login" label="Логин" />
                <BaseForm.FormFieldInput
                  name="password"
                  type="password"
                  label="Пароль"
                />
                <Button
                  className="w-full"
                  loading={form.formState.isSubmitting}
                  type="submit"
                >
                  Авторизоваться
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <a className="text-xs text-indigo-700">Забыли пароль?</a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Обратитесь к администратору для сброса пароля.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
});

export default SignInPage;
