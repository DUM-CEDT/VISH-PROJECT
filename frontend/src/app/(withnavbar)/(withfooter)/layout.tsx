import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import Footer from "@/components/Footer/page";
import NavBar from "@/components/NavBar";

const mitr = Mitr({
  subsets: ['latin', 'thai'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "VISH Project",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden">
      {children}
      <Footer></Footer>
    </div>
  );
}
