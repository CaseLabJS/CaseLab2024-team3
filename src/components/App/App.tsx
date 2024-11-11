import { ToastProvider } from '@radix-ui/react-toast';
import AppRouter from './providers/router/AppRouter';
import { Toaster } from '@components/Toaster/Toaster';

function App() {
  return (
    <div className="h-screen mx-auto">
      <ToastProvider>
        <Toaster />
        <AppRouter />
      </ToastProvider>
    </div>
  );
}

export default App;
