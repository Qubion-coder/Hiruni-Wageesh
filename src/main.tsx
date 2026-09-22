import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './StoryApp.tsx';
import AdminPage from './AdminPage.tsx';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/admin' ? <AdminPage /> : <App />}
  </StrictMode>,
);
