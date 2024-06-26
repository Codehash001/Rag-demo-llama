import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Sidebar from "./components/sidebar";
import { Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadModal from "./components/downloadModal";

export default function Home() {
  return (
    <main className="flex h-screen items-end justify-center space-x-5 bg-gradient-to-b from-indigo-50 via-purple-50/70 to-slate-50 p-8">
      {/* <ToastContainer transition={Flip}/> */}
      <ChatSection />
    </main>
  );
}
