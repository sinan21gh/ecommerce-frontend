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
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import Profile from "./pages/Profile.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/verifypage" element={<Verify/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/products" element={<Products/>}></Route>
                <Route path="/products/:id" element={<ProductDetails/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/myorders" element={<MyOrders/>}></Route>
                <Route path="/adminorders" element={<AdminOrders/>}></Route>
                <Route path="/adminproducts" element={<AdminProducts/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;
