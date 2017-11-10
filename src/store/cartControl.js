import Cart from '../core/cart'
import Product from '../core/product'
import Coupon from '../core/coupon'
import store from './store'
import { updateCartProducts } from './actions'

const getUniqueInt = function (max) {
  const ids = [],
    getRandom = () => {return Math.floor(Math.random() * (max - 1) + 1)}
  return function getUniqueId () {
    const random = getRandom()
    if (ids.indexOf(random) === -1) {
      ids.push(random)
      return random
    } else if (ids.length === (max - 1)) {
      throw new Error(`Cant get unique id in range 0 ${max} because of they storage is empty`)
    }
    return getUniqueId()
  }
}

export const loadCart = () => {
  return new Promise((resolve) => {
    //In this method should be some api requests to fetch existed user cart or local storage load
    resolve(new Cart())
  })
}

export const loadProducts = () => {
  return new Promise((resolve) => {
    //In this method should be some api requests to fetch products list,
    //I just simulate this by creation of some random products
    let i = 0,
      products = [],
      getUniqueInt10000 = getUniqueInt(10000)
    for (; i < 20; i++) {
      let id = getUniqueInt10000(),
        price = getUniqueInt10000(),
        title = `Some product with id: ${id} and price: ${price}`
      products.push(new Product(id, price, title))
    }
    resolve(products)
  })
}
const loadCoupons = () => {
  return new Promise((resolve) => {
    //In this method should be some api requests to fetch user coupons list,
    //I just simulate this by creation of some random coupons
    let i = 0,
      coupons = [],
      getUniqueInt100 = getUniqueInt(100)
    for (; i < 5; i++) {
      const id = getUniqueInt100(),
        coupon = new Coupon(id)
      coupon.setTitle(`Some coupon with id: ${id}`)
      coupons.push(coupon)
    }
    resolve(coupons)
  })
}
export const loadState = () => {
  return Promise.all([loadCart(), loadProducts(), loadCoupons()]).then(
    result => Promise.resolve({cart: result[0], products: result[1], coupons: result[2]}))
}

export const processCartAction = (actionName, params = [], isOperationManager = false) => {
  const cart = store.getState().cart,
    object = isOperationManager ? cart.operationManager : cart
  object[actionName](...params)
  cart.calcDiscount().then(
    () => {
      store.dispatch(updateCartProducts(cart.getCartProducts()))
    },
  )
}
