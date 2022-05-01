import React from 'react';
import Grid from '@mui/material/Grid'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './menu.scss';
import styles from "./Menu.module.css";
import clsx from "clsx";
import {
  FaHome,
  FaShoppingCart,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
const classNames = require('classnames');

export default function Menubody(props) {
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
                  className={classNames('prev-btn', { disable: (() => props.currentIdx === 0 ? true : false)() })} onClick={() => props.onclickprevbtn()}
                  style={{
                    alignSelf: "center",
                    fontSize: 50,
                    cursor: "pointer",
                    margin: 0,
                  }}
                >
                  <FaAngleLeft />
                </div>

                <div
                  className={classNames('next-btn', { disable: (() => props.data.length - 1 === props.currentIdx ? true : false)() })} onClick={() => props.onclicknextbtn()}
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
                >
                  <FaAngleRight />
                </div>

              </div>
        </div>
        <div className='menubody'>
            <div className='heading'>
                
                <div className='tag'>
                    {props.data.map((item, idx) => {
                        var isCur = false;
                        if (props.currentIdx === idx) isCur = true;
                        if (idx >= props.start && idx <= props.end) return (
                            <div key={idx} className={classNames('tag-product', { currentTag: isCur })}
                                onClick={(e) => props.handleClickTag(idx)}>
                                <div className='tag-img' style={{
                                    backgroundImage: `url("${item.imgURL}")`
                                }}></div>
                                <h3>{item.type}</h3>
                            </div>
                        )
                        return null;
                    })}
                </div>
  

  
            </div>
            <div className='content'>
                <h3 className='type'><span>{props.data.length !== 0 && props.data[props.currentIdx].type}</span></h3>
                <div className='content-wrap'>
                    <Grid container spacing={0}>
                        {props.data.length !== 0 && props.data[props.currentIdx].products.map((item, idx) => (
                            <Grid item xs={6} sm={4} lg={3} key={idx}>
                                <div className='product' onClick={() => props.openModal(idx)}>
                                    <div className='product-img' style={{
                                        backgroundImage: `url("${item.imgURL}")`
                                    }}></div>
                                    <h3><span>{idx + 1}. </span>{item.name}</h3>
                                    <div className='product-wrap'>
                                        <span>{format(item.price, 'đ')}</span>
                                        <div className='btn-addCart' onClick={(e) => {
                                            e.stopPropagation();
                                            props.addToCart(1, props.currentIdx, idx);
                                        }}>
                                            <ShoppingCartOutlinedIcon className='addCart' />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div >
        </div >
    )
}