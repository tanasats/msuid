import type { Metadata } from "next";
import { Geist, Sarabun } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "./context/sessioncontext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  weight:["100","200","300","400","500","600","700","800"],
  subsets:["thai"]
});

export const metadata: Metadata = {
  title: "MSU Digital Signature",
  description: "ระบบจัดการใบรับรองลายเซนต์ดิจิทัล มหาวิทยาลัยมหาสารคาม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${sarabun.variable} antialiased`}
      >
        <SessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SessionProvider>
        <Toaster richColors={true}/>
      </body>
    </html>
  );
}
