import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Context';
import { usePost } from '../../hooks/hooks';

const Header = () => {
  const { accessToken, setAccessToken, user, setUser } = useAuth();
  const navigate = useNavigate()
  const { execute: logoutExecute } = usePost<null, any>("/logout");
  const handleLogout = () => {
    logoutExecute(null, {
      credentials: "include",
      onSuccess: () => {
        setAccessToken("");
        setUser(null);
        navigate("/login");
        localStorage.removeItem("isLoggedin");
      },
      onError: () => {
        setAccessToken("");
        setUser(null);
        navigate("/login");
        localStorage.removeItem("isLoggedin");
      }
    });
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <div className="font-bold">Pet Adoption</div>
      <div className="flex gap-4">
        {accessToken ? (
          <>
            {
              user?.role === 'admin' ? <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/add-pet">Add Pet</Link>
              </> :
                <Link to="/applied-status">Applied Status</Link>
            }
            <Link to="/pet-listing">Pet Listing</Link>
            <button onClick={handleLogout} className="text-red-500 cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <Link to="/pet-listing">Pet Listing</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav >
  );
};

export default Header;