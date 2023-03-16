import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
// import Footer from './component/Footer'
import Home from './page/Home'
import Products from './page/Products'
import Cart from './page/Cart'
import ProductDetails from './page/ProductDetails'
import Contact from './page/Contact'
import Payment from './page/Payment'
import MyAccount from './page/MyAccount'
import EditAdd from './page/EditAdd'
import MyOrder from './page/MyOrder'
import { ConText } from './context/DataContext'
import Register from './page/Register'
import Login from './page/Login'
import Success from './page/Success'
// import PayNow from './page/PayNow'

import './App.css'


const App = () => {
  return (
    <>
      <ConText>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/details/:id" element={<ProductDetails />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/myaccount" element={<MyAccount />} />
            <Route exact path="/edit_address/:id" element={<EditAdd />} />
            <Route exact path="/myorder/:id" element={<MyOrder />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/success" element={<Success />} />
            {/* <Route exact path="/paynow/:pid" element={PayNow} /> */}
          </Routes>
          {/* <Footer /> */}
        </Router>
      </ConText>




    </>
  )
}

export default App
