import {BrowserRouter, Route,Routes} from 'react-router-dom';
// import { Header } from './components/Header';
import Header from "./components/Header"; 
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Test } from './components/Test';
import { Resources } from './components/Resources';
import Main from './components/Main';
import { Account } from './components/Account';
import { Quiz } from './components/Quiz';
// import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Main />}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/test/:subject/:topic" element={<Quiz/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
