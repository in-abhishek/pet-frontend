import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/Context.tsx';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
  <ThemeProvider>

    <App />
  </ThemeProvider>

  // </StrictMode>
);
