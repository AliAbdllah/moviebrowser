import "../styles/global.css";
import type { AppProps } from "next/app";
import { MovieProvider } from "@utils/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MovieProvider>
      <Component {...pageProps} />
    </MovieProvider>
  );
}
