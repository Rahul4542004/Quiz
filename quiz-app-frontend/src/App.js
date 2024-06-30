import {BrowserRouter, Route,Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Test } from './components/Test';
import { Resources } from './components/Resources';
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path = "/login" element={<Login/>}></Route>
        <Route path = "/register" element = {<Register/>}></Route>
        <Route path = "/resources" element = {<Resources/>}></Route>
        <Route path = "/test" element = {<Test/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
