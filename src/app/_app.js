'use client';
import { App } from "next/app";
import Loader from "./Components/Loader";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      {/* <Header /> */}
      {loading ? <Loader /> : null}
      <Component setLoading={setLoading} {...pageProps} />
    </div>
  );
}

export default MyApp;