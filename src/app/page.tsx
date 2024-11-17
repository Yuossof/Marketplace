import Navbar from "@/components/homePage/Navbar";
import MainContent from "@/components/homePage/MainContent";
import Footer from "@/components/homePage/Footer";
import DeliveryWorkerDashboard from "@/components/homePage/DeliveryWorkerDashboard";
import { JwtPayloadType } from "@/utils/types";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { cookies } from "next/headers";

export default function Home() {
  const token = cookies().get('jwtToken')?.value;
  const userPayload = verifyTokenForPage(token as string) as JwtPayloadType;
  return (
    <div className="flex w-full items-center flex-col min-h-screen">
      <Navbar />
      {userPayload !== null && userPayload.workInStore === true ? (
        <DeliveryWorkerDashboard />
      ) : (
        <MainContent />
      )}
      <Footer />
    </div>
  )
}