import styles from "./Menu.module.css";
import axios from "axios";
import {
  FaHome,
  FaShoppingCart,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import clsx from "clsx";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import Cart from "./Cart";
import Signin from "../signin/Signin";
import { useNavigate } from "react-router-dom";
import verifyToken from '../../midlewares/verifyToken';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import socketClient from "socket.io-client";
import {categories, products} from "../../DataAPI"
import { Link } from 'react-router-dom';
import Menubody from "./Menubody";
const SERVER = "http://localhost:4000/";
const classNames = require('classnames');

function Menu() {
  const [checkDL, setCheckDL] = useState(false);
  const [productDialog, setProductDialog] = useState({});
  const [checkFocusCategory, setCheckFocusCategory] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [countQuantity, setCountQuantity] = useState(0);
  const [listProductInCart, setListProductInCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  // const [message, setMessage] = useState(null);
  const handleShowCart = useCallback(() => {
    setShowCart((showCart) => !showCart);
  }, []);
  const [dataTag, setDataTag] = useState(() => {
    return {
       data: [],
       currentIdx: 0,
       currentIdxProduct: 0,
       quantity: 1,
      //  start,
      //  end,
      //  responsive
    }
 }
 );
  useLayoutEffect(() => {
    if (countQuantity > productDialog.quantity) {
      setCountQuantity(productDialog.quantity);
    } else if (countQuantity === 0 && productDialog.quantity > 0) {
      setCountQuantity(1);
    } else if (countQuantity < 0) {
      setCountQuantity(0);
    }
  }, [countQuantity]);

  useEffect(() => {
    productDialog.quantity > 0 ? setCountQuantity(1) : setCountQuantity(0);
  }, [checkDL]);

  useLayoutEffect(() => {
    if (listProductInCart.length > 1)
      for (let i = 0; i < listProductInCart.length - 1; i++) {
        if (
          listProductInCart[i].id ===
          listProductInCart[listProductInCart.length - 1].id
        ) {
          listProductInCart.pop();
          if (
            listProductInCart[i].currentQuantity + countQuantity >
            listProductInCart[i].quantity
          ) {
            listProductInCart[i].currentQuantity =
              listProductInCart[i].quantity;
          } else {
            listProductInCart[i].currentQuantity =
              listProductInCart[i].currentQuantity + countQuantity;
          }
          setListProductInCart([...listProductInCart]);
          break;
        }
      }
  }, [listProductInCart]);

  ///

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  //  const [showCart, setShowCart] = useState(false);
   const [dataCart, setDataCart] = useState(() => {
      const data = JSON.parse(localStorage.getItem('ORDER'));
      return data ? data :
         {
            products: [],
            totalOrder: 0
         }
   });
  const [message, setMessage] = useState(null);
   useEffect(() => {
      try {
         let reqOptions = {
            url: "http://localhost:4000/category",
            method: "GET",
         }
         axios.request(reqOptions).then(function (response) {
            setDataTag({
               ...dataTag,
               data: response.data
            })
         })
      }
      catch (e) {
         console.log(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   useEffect(() => {
      var totalOrder = 0;
      dataCart.products.forEach(item => {
         totalOrder += item.totalPrice
      })
      const data = {
         ...dataCart,
         totalOrder
      };
      localStorage.setItem('ORDER', JSON.stringify(data));
      setDataCart(data)
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dataCart.products])
  //  useEffect(() => {
  //     window.addEventListener("resize", handleWindowResize);
  //     return () => window.removeEventListener("resize", handleWindowResize);
      
  //  });

  function handleClickTag(idx) {
    setDataTag({
       ...dataTag,
       currentIdx: idx
    })
 }
 function onclickprevbtn() {
    if (dataTag.currentIdx === 0) return;
    if (dataTag.start === dataTag.currentIdx)
       setDataTag({
          ...dataTag,
          start: dataTag.start - 1,
          end: dataTag.end - 1,
          currentIdx: dataTag.currentIdx - 1
       })
    else
       setDataTag({
          ...dataTag,
          currentIdx: dataTag.currentIdx - 1,
       })
 }
 function onclicknextbtn() {
    if (dataTag.currentIdx === dataTag.data.length - 1) return;
    if (dataTag.end === dataTag.currentIdx)
       setDataTag({
          ...dataTag,
          start: dataTag.start + 1,
          end: dataTag.end + 1,
          currentIdx: dataTag.currentIdx + 1
       })
    else
       setDataTag({
          ...dataTag,
          currentIdx: dataTag.currentIdx + 1,
       })
 }
 function handleClickIncrease() {
    setDataTag({
       ...dataTag,
       quantity: dataTag.quantity + 1
    })
 }
 function handleClickDecrease() {
    if (dataTag.quantity === 1) return;
    setDataTag({
       ...dataTag,
       quantity: dataTag.quantity - 1
    })
 }
 function handleClickDecreaseCart(idx, currentIdx) {
    const products = dataCart.products.map((item) => {
       if (item.currentIdxProduct === idx && item.currentIdx === currentIdx) {
          const quantity = item.quantity === 1 ? 1 : item.quantity - 1;
          return {
             ...item,
             quantity,
             totalPrice: item.price * quantity
          }
       }
       return item;
    })
    setDataCart({
       ...dataCart,
       products
    })
 }
 function handleClickIncreaseCart(idx, currentIdx) {
    const products = dataCart.products.map((item) => {
       if (item.currentIdxProduct === idx && item.currentIdx === currentIdx) {
          const quantity = item.quantity + 1;
          return {
             ...item,
             quantity,
             totalPrice: item.price * quantity
          }
       }
       return item;
    })
    setDataCart({
       ...dataCart,
       products
    })
 }
 function removeProduct(idx) {
    var products = [];
    dataCart.products.forEach((item, index) => {
       if (idx !== index) {
          products.push(item);
       }
    })
    setDataCart({
       ...dataCart,
       products
    })
 }

 function closeModal() {
    setShowModal(false);
 }
 function openModal(idx) {
    // if (window.innerWidth > 800) {
       setShowModal(true);
       setDataTag({
          ...dataTag,
          currentIdx: dataTag.currentIdx,
          currentIdxProduct: idx,
          quantity: 1,
       })
    // }
 }
 function closeCart() {
    setShowCart(false);
 }
 function openCart() {
    setShowCart(true);
 }
 function addToCart(value = dataTag.quantity, currentIdx = dataTag.currentIdx, currentIdxProduct = dataTag.currentIdxProduct) {
    var isEmptyOrNull = true;
    const products = dataCart.products.map((item) => {
       if (item.currentIdx === currentIdx) {
          if (item.currentIdxProduct === currentIdxProduct) {
             isEmptyOrNull = false;
             return {
                ...item,
                quantity: item.quantity + value,
                totalPrice: (item.quantity + value) * item.price
             }
          }
       }
       return item;
    })
    if (isEmptyOrNull)
       products.push({
          currentIdx: currentIdx,
          currentIdxProduct: currentIdxProduct,
          quantity: value,
          price: dataTag.data[currentIdx].products[currentIdxProduct].price,
          totalPrice: dataTag.data[currentIdx].products[currentIdxProduct].price * value,
          productID: dataTag.data[currentIdx].products[currentIdxProduct].productID,
          name: dataTag.data[currentIdx].products[currentIdxProduct].name
       })
    setDataCart({
       ...dataCart,
       products
    })
    closeModal();
 }
 function format(n, currency) {
    if (n && currency)
       return currency + n.toFixed(0).replace(/./g, function (c, i, a) {
          return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
       });
 }
 async function handlePayment() {
    try {
       setMessage('Vui lòng đợi thu ngân xác nhận đơn hàng, không chuyển trang hoặc f5');
       const info = verifyToken();
       var email = '';
       if (info) {
          await info.then(res => {
             email = res.data.email;
          })
       }
       var data = {
          email: email,
          total: dataCart.totalOrder,
          products: dataCart.products.map((item) => {
             const {
                quantity,
                price,
                totalPrice,
                name,
                productID
             } = item;
             return {
                quantity,
                price,
                totalPrice,
                name,
                productID
             }
          })
       }
       const socket = socketClient(SERVER);
       socket.emit('postOrder', data, (res) => {
          if (res.success) {
             socket.on(`${res.orderId}`, (status) => {
                localStorage.setItem('ORDER', null);
                socket.disconnect();
                if (status === 'confirmed') navigate('/payment');
                else if (status === 'cancel') setMessage('Đơn hàng của bạn đã bị hủy bởi thu nhân');
             })
          }
          else {
             setMessage('Đơn hàng gửi lên bị lỗi');
          }
       });
    }
    catch (err) {
       console.log(err)
    }
 }


  return (
      // <div className={clsx}>
      //   okok
      // </div>

      <div className={clsx(styles.container)}>
        <div className={clsx(styles.menuContainer)}>
          <div className={clsx(styles.header)}>
            <div className={clsx(styles.homeIcon)}>
                <Link to="/">
                  <FaHome />
                </Link>
            </div>
            <div className={clsx(styles.content)}>Back to home</div>
            <div className={clsx(styles.takeCart)} style={{ marginRight: 35 }}>
              {!showCart && <FaShoppingCart  onClick={() => setShowCart(true)} /> }
              <span>Giỏ hàng({dataCart.products.length})</span>
            </div>
          </div>  
        <Menubody 
          data={dataTag.data}
          currentIdx={dataTag.currentIdx}
          onclicknextbtn={onclicknextbtn} onclickprevbtn={onclickprevbtn}
          handleClickTag={handleClickTag}
          addToCart={addToCart}
          openModal={openModal}
        >
          
        </Menubody> 
          {/* {showModal && <div className={classNames('modal', { open: showModal })}
                  onClick={() => closeModal()}>
                  <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                     <div className='heading'>
                        <h3>Chi tiết sản phẩm</h3>
                        <CloseIcon onClick={() => closeModal()} />
                     </div>
                     <div className='container'>
                        <div className='img-wrap'>
                           <div className='img' style={{
                              backgroundImage: `url("${dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.imgURL}")`
                           }}></div>
                        </div>
                        <div className='content'>
                           <div className='title'>
                              <div className='sku'>
                                 <h3>STT</h3>
                                 <p>41</p>
                              </div>
                              <div className='name'>
                                 <h3>{dataTag.data[dataTag.currentIdx].type}</h3>
                                 <p>{dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.name}</p>
                              </div>
                              <div className='price'>
                                 <h3>Đơn giá</h3>
                                 <span>{format(dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.price, 'đ')}</span>
                              </div>
                           </div>
                           <div className='quantity'>
                              <h3>Số lượng</h3>
                              <div>
                                 <div className='btn btn-decrease' onClick={() => handleClickDecrease()}><RemoveIcon /></div>
                                 <span>{dataTag.quantity}</span>
                                 <div className='btn btn-increase' onClick={() => handleClickIncrease()}><AddIcon /></div>
                              </div>
                           </div>
                           <div className='description'>
                              <h3>Mô tả món ăn:</h3>
                              <p>{dataTag.data[dataTag.currentIdx].products[dataTag.currentIdxProduct]?.description}</p>
                           </div>
                           <Button className='btn-modal' variant="contained" color="secondary" onClick={() => addToCart()}>
                              <ShoppingCartOutlinedIcon /> <span>Thêm vào giỏ hàng</span>
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>} */}
          </div>
        </div>
  )
}

export default Menu;