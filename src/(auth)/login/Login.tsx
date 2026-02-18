import Button from '../../components/core/button';
import AuthHeading from '../../components/AuthHeading';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/core/input';
import type { LoginFormValues } from '../../utils/AuthUtils';
import { useAlertToast, usePost } from '../../hooks/hooks';
import AlertToast from '../../components/toast/AlertToast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Context';

const Login = () => {
  const navigate = useNavigate()
  const { setAccessToken, setUser } = useAuth();
  const { alert, showError, showSuccess, clearAlert } = useAlertToast();
  const { execute, isLoading } = usePost<LoginFormValues, any>('/login');
  const { control, handleSubmit, reset, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    execute(data,
      {
        credentials: "include",
        onSuccess: (res) => {
          setAccessToken(res.accessToken)
          setUser(res.user)
          showSuccess("Registration Successfull", res.message)
          reset();
          navigate('/dashboard');
        },
        onError: (err) => {
          showError("Registration Failed", err.message);
        }
      });
  };
  return (
    <div className='flex flex-col gap-8 max-w-lg w-full'>
      <AuthHeading subheading="Welcome Back! Please Log In" content="Enter your email and password to continue." />
      {alert && (
        <AlertToast
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onClose={clearAlert}
        />
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Email"
              id="email"
              placeholder="Enter your email"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="authPrimary"
          className='mt-8'
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  )
}

export default Login