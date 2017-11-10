import * as types from './actionTypes'

export function cartLoad (cart) {
  return {
    type: types.CART_LOADED,
    cart,
  }
}
export function productsLoad (products) {
  return {
    type: types.PRODUCTS_LOADED,
    products,
  }
}
export function couponsLoad (coupons) {
  return {
    type: types.COUPONS_LOADED,
    coupons,
  }
}

export function updateCartProducts (cartProducts) {
  return {
    type: types.UPDATE_CART_PRODUCTS,
    cartProducts,
  }
}
