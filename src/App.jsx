import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {AuthProvider} from "./context/AuthContext.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register.jsx";
import Verify from "./pages/Verify.jsx"
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx"

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/verifypage" element={<Verify/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/products" element={<Products/>}></Route>

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;
