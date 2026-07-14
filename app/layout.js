import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteFrame from "../components/site-frame";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Oliver Massaad",
  description:
    "Oliver Massaad — Computer Science & Mathematics student, tech-driven finance, full-stack development, AI projects.",
};

export const viewport = {
  themeColor: "#f7f7f4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteFrame>{children}</SiteFrame>
        <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
