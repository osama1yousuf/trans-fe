"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/dashboard";

export const metadata = {
  title: 'Transport Ease',
  description: 'Safe ride',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>{metadata.title}</title>
      </head>
      <body className={inter.className}>
        <ToastContainer position="top-center" theme="colored" />
        <Dashboard>{children}</Dashboard>
      </body>
    </html>
  );
}
