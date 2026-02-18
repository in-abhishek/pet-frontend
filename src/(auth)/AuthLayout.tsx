import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-126 w-full p-8 rounded-2xl bg-white shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
