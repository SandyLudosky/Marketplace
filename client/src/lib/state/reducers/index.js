import { combineReducers } from "redux";
import cart from "./cart";
import products from "./products";
import user from "./user";

const reducers = combineReducers({
  user,
  cart, 
  products
});

export default reducers;
