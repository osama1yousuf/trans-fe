import { App } from "next/app";
import Header from "../components/Header";
import Dashboard from "./Components/Dashboard";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      {/* <Header /> */}
      <Dashboard />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;