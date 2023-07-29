import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Laktaa</title>
        <link rel="shortcut icon" sizes="32x32" href="favicon.ico" />
      </Head>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
