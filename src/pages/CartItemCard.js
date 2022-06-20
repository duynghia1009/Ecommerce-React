import React from "react";
import "./CartItemCard.css";
import { NavLink } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <div className="CartItemCard">
            <img src={item.imageUrl} alt="ssa" />

            <div>
                <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
                <span>{`Price: ₹${item.price}`}</span>
                <p onClick={() => deleteCartItems(item.product)}>Remove</p>
            </div>
        </div>
    );
};

export default CartItemCard;