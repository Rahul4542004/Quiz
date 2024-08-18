import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Test } from "./components/Test";
import { Resources } from "./components/Resources";
import Main from "./components/Main";
import { Account } from "./components/Account";
import { Quiz } from "./components/Quiz";
import { Finish } from "./components/Finish";
import { Subject } from "./components/Subject";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Instructions from "./components/Instructions";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test/:subject/:topic" element={<Quiz />} />
        <Route path="/finish/:score/:totalScore" element={<Finish />} />
        <Route path="/test/:subject" element={<Subject />} />
        <Route path="/test/instructions/:subject/:topic" element={<Instructions />} />
      </Routes>
      <ToastContainer 
        autoClose={2000} 
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover 
      />

    </BrowserRouter>
  );
}

export default App;
