import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import AuthRedirect from "@/layouts/AuthRedirect";
import { Toaster } from "react-hot-toast";
import { Session } from "next-auth";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    setTheme(
      localStorage.getItem("theme")
        ? (localStorage.getItem("theme") as string)
        : "light"
    );

    if (theme) localStorage.setItem("theme", theme as string);
    const localTheme = localStorage.getItem("theme");
    document
      .querySelector("html")
      ?.setAttribute("data-theme", localTheme || "");
  }, []);

  return (
    <SessionProvider
      session={pageProps.session}
      refetchOnWindowFocus={false}
      basePath="/api/v1/auth"
    >
      <Head>
        <title>Linkwarden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <AuthRedirect>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className:
              "border border-sky-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white",
          }}
        />
        <Component {...pageProps} />
      </AuthRedirect>
    </SessionProvider>
  );
}
