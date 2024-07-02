import ChatSection from "@/app/components/chat-section";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="flex h-screen items-end justify-center space-x-5 bg-gradient-to-b from-indigo-50 via-purple-50/70 to-slate-50 p-8 relative">
      {/* <ToastContainer transition={Flip}/> */}
      <ChatSection />
      <div className="absolute top-10 right-10">
        <Link href={"/"}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={"icon"} className="rounded-full">
                  <TiPlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </div>
    </main>
  );
}
