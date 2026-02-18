import Button from '../../components/core/button';
import AuthHeading from '../../components/AuthHeading';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '../../components/core/input';
import { useAlertToast, usePost } from '../../hooks/hooks';
import AlertToast from '../../components/toast/AlertToast';
import type { RegisterFormValues } from '../../utils/AuthUtils';

const Register = () => {
  const { alert, showError,showSuccess, clearAlert } = useAlertToast();
  const { execute, isLoading } = usePost<RegisterFormValues, any>('/register');

  const { control, handleSubmit,reset, watch, formState: { errors } } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    execute(data, {
      onSuccess: (res) => {
        showSuccess("Registration Successfull",res.message)
        reset()
      },
      onError: (err) => {
        showError("Registration Failed", err.message);
      }
    });
  };

  return (
    <div className='flex flex-col gap-8 max-w-lg w-full'>
      <AuthHeading
        subheading="Create an Account"
        content="Fill in your details to get started."
      />

      {alert && (
        <AlertToast
          type={alert.type}
          title={alert.title}
          description={alert.description}
          onClose={clearAlert}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "First name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="First Name"
                id="firstName"
                placeholder="John"
                error={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field }) => (
              <Input
                {...field}
                label="Last Name"
                id="lastName"
                placeholder="Doe"
                error={errors.lastName?.message}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
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
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Password"
              id="password"
              type="password"
              placeholder="Create a password"
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match"
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="authPrimary"
          className='mt-8'
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default Register;