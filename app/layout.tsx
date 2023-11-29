import "./globals.css";
import type { Metadata } from "next";
import Header from "@/app/(site)/components/Header";
import Sidebar from "@/app/(site)/components/Sidebar";
import Footer from "@/app/(site)/components/Footer";

export const metadata: Metadata = {
  title: "CloudFlare DNS Checker",
  description: "CloudFlare DNS Checker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-screen overflow-y-hidden">
      <body className="h-screen overflow-y-hidden">
        <div className="h-screen  flex flex-col bg-white">
          <div className="h-22 bg-white p-2 border-b-[1px]">
            <Header />
          </div>

          <div className="flex h-full overflow-y-auto ">
            <div className="w-64 ">
              <Sidebar />
            </div>
            <div className="w-full h-full flex-auto">
              <div className="p-4 flex-grow h-full">{children}</div>
            </div>
          </div>
          <div
            className={"select-none w-full text-center border fixed bottom-0 "}
          >
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
