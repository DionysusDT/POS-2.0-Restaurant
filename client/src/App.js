import Payment from './components/payment/Payment'
import Menu from'./components/menu/Menu'
// import Menubody from'./components/menu/Menubody'
import Home from'./components/home/Home'
import Signin from './components/signin/Signin'
import Userprofile from './components/userprofile/Userprofile'
import AdminHome from "./components/admin/adminhome/AdminHome";
import ChefHome from "./components/clerkchef/chefhome/Chef";
import ShipperHome from "./components/shipper/shipperhome/ShipperHome";
import Register from './components/register/Register';
import {  Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import {useState} from 'react'
function App() {
  const [app, setApp] = useState('Menu')

  const handleChangePaymentApp = () =>{
    setApp('Payment')
  }
  const handleChangeMenuApp = () =>{
    setApp('Menu')
  }

  
  return (
    <>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Menu" element={<Menu/>} />
          {/* <Route path="/" element={app === 'Payment' ? <Payment changeApp={handleChangeMenuApp}/>:null }/> */}
          <Route path="/">
            <Route path="admin" index element={ <AdminHome />} />
            <Route path="chef" index element={ <ChefHome />} />
            <Route path="shipper" index element={ <ShipperHome />} />
            <Route path="register">
              <Route index element={<Register />} />
            </Route>
            <Route path="login">
              <Route index element={<Signin />} />
            </Route>
            <Route path="profile">
              <Route index element={<Userprofile />} />
            </Route>
          </Route>
        </Routes>
    </>
  )
}

export default App;
