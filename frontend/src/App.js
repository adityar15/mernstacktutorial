import "./App.css";

import Register from "./pages/Register";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chats from "./pages/Chats";

import * as Middlewares from "./components/Protected";
import { apiInstance } from "./assets/api";



function App() {

  const interval = setInterval(() => {
  const auth = localStorage.getItem("uuid")
  if(auth) 
  {
    apiInstance().post('user/refreshtoken').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err.response.data.errors)
    })
  }
  }, 5000);

 



  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Middlewares.Public />}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>
        <Route element={<Middlewares.Protected />}>
          <Route path="/chats" element={<Chats />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
