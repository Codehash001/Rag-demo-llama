import Header from "@/app/components/header";
import ChatSection from "./components/chat-section";
import Sidebar from "./components/sidebar";
import { Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadModal from "./components/downloadModal";

export default function Home() {
  return (
    <main className="flex flex-row h-screen items-end justify-center space-x-5 p-10 bg-slate-50">
      <ToastContainer transition={Flip}/>
      <Sidebar/>
      <ChatSection />
    </main>
  );
}
