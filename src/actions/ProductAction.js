import {
    GET_ALL_PRODUCT_SUCCESS,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL
  } from "../constants/productConstant.js";
  import axios from "axios";
  import authHeader from "../services/auth-header";
  
  const API_URL = "http://localhost:8083/api/product/"
  const fetchSuccess = (products) => {
    return {
      type: GET_ALL_PRODUCT_SUCCESS,
      payload: products,
    };
  };
  
  // Get All Products
  export const getProduct = () => {
    return (dispatch) => {
  
      axios.get(API_URL,{ headers: authHeader() })
      .then((response) => {
        dispatch(fetchSuccess(response.data));
      });
    }
  }
  
  export const getProductDetails = (id) => {
    return (dispatch) => {
      axios.get(API_URL + id,{ headers: authHeader() } )
        .then((response) => {
          dispatch({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: response.data
          });
        })
    }
  }