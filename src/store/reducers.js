import * as types from './actionTypes'
import { combineReducers } from 'redux'
import Cart from '../core/cart'

const cartProductsReducer = function (state = [], action) {
  if (action.type === types.UPDATE_CART_PRODUCTS) {
    return Object.assign([], action.cartProducts)
  }
  return state
}
const cartReducer = function (state = new Cart(), action) {
  if (action.type === types.CART_LOADED) {
    return action.cart
  }
  return state
}
const productsReducer = function (state = [], action) {
  if (action.type === types.PRODUCTS_LOADED) {
    return action.products
  }
  return state
}
const couponsReducer = function (state = [], action) {
  if (action.type === types.COUPONS_LOADED) {
    return action.coupons
  }
  return state
}

const rootReducer = combineReducers({
  cart: cartReducer,
  cartProducts: cartProductsReducer,
  products: productsReducer,
  coupons: couponsReducer,
})

export default rootReducer
