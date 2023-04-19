import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import AdminNav from './component/AdminNav'
import Footer from './component/Footer'
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
import Wishlist from './page/Wishlist'
import './App.css'
import SearchProducts from './page/SearchProducts'
import AddProduct from './page/AddProduct'
import AddAddress from './page/AddAddress'
import CheckOut from './page/CheckOut'
import MyAddress from './page/MyAddress'
import PermissionCheck from './context/PermissionCheck';
import ProductsAdminSide from './page/ProductsAdminSide'
import ResetPassword from './page/ResetPassword'
import Dashboard from './component/AdminSide/Dashboard'

const App = () => {
  return (
    <>
      <ConText>
        <Router>
          <PermissionCheck >
          </PermissionCheck>
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path='/searchProduct/:name' element={<SearchProducts />} />
            <Route exact path="/productsadminside" element={<ProductsAdminSide />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/details/:id" element={<ProductDetails />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/myaccount" element={<MyAccount />} />
            <Route exact path="/edit_address/:id" element={<EditAdd />} />
            <Route exact path="/myorder/:id" element={<MyOrder />} />
            <Route exact path="/addProduct" element={<AddProduct />} />
            <Route exact path="/addProduct/edit/:id" element={<AddProduct />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/resetpassword" element={<ResetPassword />} />
            <Route exact path="/success" element={<Success />} />
            <Route exact path="/addaddress" element={<AddAddress />} />
            <Route exact path="/addaddress/:id" element={<AddAddress />} />
            <Route exact path="/checkout" element={<CheckOut />} />
            <Route exact path="/checkout/:id" element={<CheckOut />} />
            <Route exact path="/myaddress" element={<MyAddress />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            {/* <Route exact path="/paynow/:pid" element={PayNow} /> */}
          </Routes>
          <Footer />
        </Router>
      </ConText>
    </>
  )
}

export default App
