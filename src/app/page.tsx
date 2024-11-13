
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input"
import { ShoppingBag, Paintbrush, Zap, Globe, BarChart, Lock } from "lucide-react"
import Navbar from "@/components/homePage/Navbar";
import MainContent from "@/components/homePage/MainContent";
import Footer from "@/components/homePage/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  )
}