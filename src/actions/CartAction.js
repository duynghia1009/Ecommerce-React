import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstant";
  import axios from "axios";
  import authHeader from "../services/auth-header";

  const API_URL = "http://localhost:8083/api/product/"
//Add to Cart
export const addItemsToCart = (id, quantity) => async(dispatch, getState) => {
    const res = await axios.get(API_URL + id,{ headers: authHeader() });
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: res.data.id,
        name: res.data.name,
        price: res.data.price,
        imageUrl: res.data.imageUrl,
        stock: res.data.stock,
        quantity
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const removeItemsFromCart = (id) => async(dispatch,getState) => {
    dispatch(
      {
        type: REMOVE_CART_ITEM,
        payload: id
      }
    );

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Saving Shipping Info
export const saveShippingInfo = (data) => async(dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
}