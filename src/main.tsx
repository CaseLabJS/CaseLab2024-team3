import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App.tsx';
import { ErrorBoundary } from './components/App/providers/ErrorBoundary/ErrorBoundary.tsx';
import './index.css';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { initError } from './lib/index.ts';
import { ThemeProvider } from '@components/ThemeProvider';

initError();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </QueryParamProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
