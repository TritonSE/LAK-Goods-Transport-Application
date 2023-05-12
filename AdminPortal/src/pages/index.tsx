import Dashboard from './dashboard';
import { AuthProvider } from '../context/AuthContext';

export default function Home() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
