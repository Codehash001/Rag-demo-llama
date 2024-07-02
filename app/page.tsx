import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import FileUploadModal from "./components/uploadButton";
import SpaceBackground from './components/ui/custom-bg';

const Home: React.FC = () => {
  return (
    <main className="relative flex h-screen items-center justify-center space-x-5 bg-gradient-to-b from-indigo-100 via-purple-300 to-violet-300 p-8 overflow-hidden">
      {/* <ToastContainer transition={Flip}/> */}
      <FileUploadModal />
    </main>
  );
}

export default Home;