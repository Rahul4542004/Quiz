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
        <Route path="/" element={<TestRoute><Main /></TestRoute>} />
        <Route path="/account" element={<ProtectedRoute><TestRoute><Account /></TestRoute> </ProtectedRoute>} />
        <Route path="/login" element={<TestRoute><Login /></TestRoute>} />
        <Route path="/register" element={<TestRoute><Register /></TestRoute>} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/test" element={<ProtectedRoute><TestRoute><Test /></TestRoute> </ProtectedRoute>} />
        <Route path="/test/:subject/:topic" element={<ProtectedRoute><Quiz /> </ProtectedRoute>} />
        <Route path="/finish" element={<ProtectedRoute><FinishRoute><Finish /></FinishRoute></ProtectedRoute>} />
        <Route path="/test/:subject" element={<ProtectedRoute><TestRoute><Subject /></TestRoute> </ProtectedRoute>} />
        <Route path="/test/instructions/:subject/:topic" element={<ProtectedRoute><TestRoute><Instructions /> </TestRoute></ProtectedRoute>} />
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
  const subject = localStorage.getItem("subject");
  const topic = localStorage.getItem("topic");
  if(flag){
    sessionStorage.setItem("redirectMessage","That action is restricted!");
  }
  const route = `/test/${subject}/${topic}`
  return flag ? <Navigate to = {route} /> : children
}
const FinishRoute = ({children}) => {
  const flag = isTakingTest();
  if(!flag){
    sessionStorage.setItem("redirectMessage","That action is restricted!");
  }
  return flag ? children : <Navigate to="/"/>
}
export default App;
