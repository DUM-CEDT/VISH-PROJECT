import type { Metadata } from "next";
import { Mitr } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/NavBar";
import NextAuthProvider from "./provider/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./libs/authOptions";

const mitr = Mitr({
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VISH Project",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    
    <html lang="en">
      <link rel="icon" href="/Vish_Icon.png" sizes="4x4"></link>
      
      <body className={mitr.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}