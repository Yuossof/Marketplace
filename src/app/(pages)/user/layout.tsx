import Navbar from "@/components/homePage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-100 w-full h-screen">
      <Navbar />
        {children}
    </div>
  );
}

// bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 to-gray-400 w-full h-screen