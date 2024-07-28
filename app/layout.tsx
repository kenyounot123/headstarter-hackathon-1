import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "../providers";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dwadle | Event Planning App",
  icons: "/favicon.ico",
  description: "Dwadle simplifies planning events with friends by offering an easy-to-use platform for creating, managing, and discussing gatherings.",
  keywords: "Dwadle, Friends, Event planner, Social planning app, Organize, Schedule",
  openGraph: {
    title: "Dwadle | Event Planning App",
    description: "Dwadle simplifies planning events with friends by offering an easy-to-use platform for creating, managing, and discussing gatherings.",
    url: "https://headstarter-hackathon-1.vercel.app",  // Replace with your actual website URL
    type: "website",
    images: "/icon.png",  // Replace with the actual URL of the image you want to use
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-78M7CZSKTQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-78M7CZSKTQ');
          `}
        </Script>
      </head>
      <body className={raleway.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
