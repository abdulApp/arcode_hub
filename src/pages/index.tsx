import Image from "next/image";
import { Inter } from "next/font/google";
import Topbar from "@/components/Topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar />
      </main>
    </>
  );
}
