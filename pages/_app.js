import NavBar from "../components/navbar/navbar";
import "../styles/globals.css";
import { SnipcartProvider } from "use-snipcart";

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <NavBar />
      <Component {...pageProps} />
    </SnipcartProvider>
  );
}

export default MyApp;
