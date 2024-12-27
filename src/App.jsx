import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './components/routes/User';
import { ThemeProvider } from './components/ThemeProvider/ThemeToggle';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import Spinner from './components/spinner/Spinner';
import AdminRoutes from './components/routes/Admin';


function App() {
  console.log(App)
  const queryClient = new QueryClient();
  return (
    <>
     <Provider store={store}>
     <PersistGate loading={<Spinner/>} persistor={persistor}>
      <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="bottom-right" />
        <Router>
          <UserRoutes />
          <AdminRoutes/>
        </Router>
        </QueryClientProvider>
      </ThemeProvider>
      </PersistGate>
      </Provider>
    </>
  );
}

export default App;
