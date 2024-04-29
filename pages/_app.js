import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.sass";
import { AuthProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
