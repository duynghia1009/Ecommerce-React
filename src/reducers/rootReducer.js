
import { combineReducers } from "redux";
import auth from "./authReducer";
import message from "./message";
import {productReducer, productDetailReducer} from "./productReducer";
import {cartReducer} from "./cartReducer";


const rootReducer = combineReducers({
  auth,
  message,
  products: productReducer,
  product: productDetailReducer,
  cart: cartReducer
});

export default rootReducer;
