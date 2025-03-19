import type { Metadata } from "next";
import { Mitr } from "next/font/google";

import NavBar from "@/components/NavBar";

const mitr = Mitr({
  subsets: ['latin', 'thai'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "VISH Project",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{padding: '0', boxSizing : 'border-box', margin : '0'}}>
      <link rel="icon" href="/Vish_Icon.png" sizes="4x4"></link>
      <NavBar></NavBar>
      {children}
    </div>
  );
}
