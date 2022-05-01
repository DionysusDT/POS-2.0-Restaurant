import React from 'react';  
import Grid from '@mui/material/Grid'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {categories, products} from "../../DataAPI"
import './menu.scss';
import clsx from "clsx";
import styles from "./Menu.module.css";
import { useEffect, useState, useCallback, useLayoutEffect } from "react";
import {
    FaHome,
    FaShoppingCart,
    FaAngleLeft,
    FaAngleRight,
  } from "react-icons/fa";
const classNames = require('classnames');

export default function Menubody(props) {
    {console.log(props)}
    // const [checkFocusCategory, setCheckFocusCategory] = useState(0);
    const test ="https://st.gamevui.com/images/image/2018/01/26/boom-it-online-600.jpg"
    function format(n, currency) {
        return currency + n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    return (
        <div className={clsx(styles.mid)}>
            <div style={{ position: 'relative' }}>
              <div className={clsx(styles.categories)}>
                
                <div
                  style={{
                    alignSelf: "center",
                    fontSize: 50,
                    cursor: "pointer",
                    margin: 0,
                  }}
                  className={classNames('prev-btn', { disable: (() => props.currentIdx === 0 ? true : false)() })} onClick={() => props.onclickprevbtn()}
                >
                  <FaAngleLeft />
                </div>

        
                  {props.data.map((item, idx) => {
                    var isCur = false;
                    if (props.currentIdx === idx) isCur = true;
                    <div
                      key={idx}
                      className={clsx(styles.itemCategory,{currentTag:isCur})}
                      // style={
                      //     category === categories[checkFocusCategory]
                      //       ? { backgroundColor: "#2c3a57", color: "#fff" }
                      //       : {}
                      // }
                      onClick={(e) => props.handleClickTag(idx)}
                    >
                      <div className={clsx(styles.categoryWrapperImg)}>
                        <img src={item.imgURL} alt="" />
                      </div>
                      <p>{item.type}</p>
                    </div>
                  })}
                 
                                {/* <div
                                  key="1"
                                  className={clsx(styles.itemCategory,{currentTag:0})}
                                  style={
                                      //  { backgroundColor: "#2c3a57", color: "#fff" }  
                                      {backgroundColor: "#2c3a57"}
                                  }
                                  onClick={(e) => props.handleClickTag(0)}
                                >
                                  <div className={clsx(styles.categoryWrapperImg)}>
                                    <img src={test} alt="" />
                                  </div>
                                  <p>{test}</p>
                                </div> */}

                  </div>
              
              
                <div
                  style={{
                    alignSelf: "center",
                    fontSize: 50,
                    cursor: "pointer",
                    margin: 0,
                    marginLeft: "auto",
                    position: "absolute",
                    right: "0",
                    top: 'calc(50% - 20px)'
                  }}
                  className={classNames('next-btn', { disable: (() => props.data.length - 1 === props.currentIdx ? true : false)() })} onClick={() => props.onclicknextbtn()}
                >
                  <FaAngleRight />
                </div>
            </div>
            </div>
        // </div>   
    )
}