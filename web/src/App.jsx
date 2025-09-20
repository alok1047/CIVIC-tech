import AppRouter from './routes/AppRouter';
import { AuthProvider } from './contexts/AuthContext'; // <-- IMPORT
import './index.css';

function App() {
  return (
    // Wrap the router with the provider
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;