import { GET_ALL_PRODUCT_SUCCESS, GET_PRODUCT_DETAIL_SUCCESS, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstant";



 export  const productReducer = (state = {products: []}, action)  => {

  if (action.type === GET_ALL_PRODUCT_SUCCESS) {
    return {
      ...state,
      products: action.payload,
     
    };
  }
  return state;
};

export  const productDetailReducer = (state = {product: {}}, action)  => {

  if (action.type === GET_PRODUCT_DETAIL_SUCCESS) {
    return {
      ...state,
      product: action.payload
    };
  }
  return state;
};


