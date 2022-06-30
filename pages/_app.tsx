import '../styles/app.scss';
import type { AppProps } from 'next/app';
import 'locomotive-scroll/src/locomotive-scroll.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
