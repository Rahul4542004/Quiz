import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { isUserLoggedIn } from "./services/AuthService";
import { isTakingTest } from "./services/QuizService";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<ProtectedRoute><Account /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/test" element={<ProtectedRoute><Test /> </ProtectedRoute>} />
        <Route path="/test/:subject/:topic" element={<ProtectedRoute><Quiz /> </ProtectedRoute>} />
        <Route path="/finish/:score/:totalScore" element={<ProtectedRoute><Finish /> </ProtectedRoute>} />
        <Route path="/test/:subject" element={<ProtectedRoute><Subject /> </ProtectedRoute>} />
        <Route path="/test/instructions/:subject/:topic" element={<ProtectedRoute><Instructions /> </ProtectedRoute>} />
      </Routes>

    </BrowserRouter>
  );
}
const ProtectedRoute = ({children}) => {
  const flag = isUserLoggedIn();
  if(!flag){
    sessionStorage.setItem("redirectMessage","You need to login first");
  }
  return flag ? children : <Navigate to="/login"/>;
}
const TestRoute = ({children}) => {
  const flag = isTakingTest();
  if(flag){
    sessionStorage.setItem("redirectMessage","That action is restricted!");
  }
  return flag ? <Navigate to ="/test/subject/topic"/> : children
}
export default App;
