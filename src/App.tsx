import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './(auth)/login/Login';
import Register from './(auth)/register/Register';
import MainLayout from './MainLayout';
import Dashboard from './(admin)/dashboard/Dashboard';
import AddPet from './(admin)/add-pet/AddPet';
import PetListing from './pages/PetListing';
import AppliedStatus from './(user)/AppliedStatus';
import PetDetails from './(user)/PetDetails';
import { useAuth } from './context/Context';
import EditPetDetails from './(admin)/edit-pet/EditPetDetails';

function App() {
  const { accessToken, user } = useAuth();

  let roleBasedRoutes;

  if (!accessToken || !user) {
    roleBasedRoutes = (
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    );
  } else if (user.role === "user") {
    roleBasedRoutes = (
      <>
        <Route path="/applied-status" element={<AppliedStatus />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="*" element={<Navigate to="/pet-listing" replace />} />
      </>
    );
  } else {
    roleBasedRoutes = (
      <>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/edit/:id" element={<EditPetDetails />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {roleBasedRoutes}
          <Route path="/pet-listing" element={<PetListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
