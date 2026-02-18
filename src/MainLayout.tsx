import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex p-6 justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;