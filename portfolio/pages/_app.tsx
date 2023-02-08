import '@/styles/globals.css';
import FirstLayout from '@/ui/layouts/FirstLayout/FirstLayout';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  console.log('page props', pageProps);
  return <FirstLayout page={<Component {...pageProps} />} />;
}
