import OperationManager, { DEFAULT } from './operationManager'
import CartProduct, { EmptyCartProductError } from './cartProduct'
import CartState from './cartState'

/**
 * @class Cart
 */
export default class Cart {
  constructor (state = new CartState()) {
    if (!(state instanceof CartState)) {
      throw new Error('the state object should be instance of CartState')
    }
    this.setState(state)
    /**
     * @type OperationManager
     */
    this.operationManager = new OperationManager(
      this,
      {
        excluded: DEFAULT.excluded.concat([
          'getCartProducts',
          'calcDiscount',
          'getCoupons',
          'indexOf',
          'isCouponApplied',
        ]),
      },
    )
  }

  setState (state) {
    this._state = state.clone()
    return this
  }

  getState () {
    return this._state
  }

  /**
   * @param {Product} product
   * @return {Cart}
   */
  addProduct (product) {
    if (this.indexOf(product) === -1) {
      this.getState().cartProducts.push(new CartProduct(product))
    }

    return this
  }

  /**
   * @param {Product} product
   * @return {Cart}
   */
  removeProduct (product) {
    let index = this.indexOf(product)
    if (index !== -1) {
      this._removeByIndex(index)
    }
    return this
  }

  _removeByIndex (index) {
    this.getState().cartProducts.splice(index, 1)
  }

  /**
   * @param {Product} product
   * @return {Cart}
   */
  oneMoreProduct (product) {
    let cartProduct = this.getState().cartProducts[this.indexOf(product)]
    if (cartProduct) {
      cartProduct.oneMore()
    }
    return this
  }

  /**
   * @param {CartProduct} product
   * @return {Cart}
   */
  lessProduct (product) {
    const index = this.indexOf(product),
      cartProduct = this.getState().cartProducts[index]
    if (cartProduct) {
      try {
        cartProduct.less()
      } catch (err) {
        if (err instanceof EmptyCartProductError) {
          this._removeByIndex(index)
        } else {
          throw err
        }
      }
    }

    return this
  }

  applyCoupon (coupon) {
    let state = this.getState()
    if (!this.isCouponApplied(coupon)) {
      state.coupons.push(coupon)
    }
    return this
  }

  isCouponApplied (coupon) {
    let state = this.getState()
    return state.coupons.filter((existedCoupon) => existedCoupon.getCouponId() === coupon.getCouponId()).length
  }

  calcDiscount () {
    return new Promise((resolve, reject) => {
      const coupons = this.getState().coupons,
        timeout = 0
      // timeout = Math.random() * 2000 + 500
      if (!coupons.length) {
        resolve(this)
      }
      setTimeout(() => {
        Promise.all(coupons.map((coupon) => coupon.calcDiscount()))
          .then(() => {
            this._setCartProductDiscount()
            return resolve(this)
          })
          .catch(reject)
      }, timeout)
    })
  }

  _setCartProductDiscount () {
    let state = this.getState(),
      coupons = state.coupons,
      couponsForProducts = coupons.filter((coupon) => !!coupon.product),
      productsDiscount = coupons.filter((coupon) => !coupon.product)
        .reduce((a, b) => a + b.getDiscount(), 0)
    state.cartProducts.forEach((cartProduct) => {
      cartProduct
        .setDiscount(
          productsDiscount
          + couponsForProducts.filter((coupon) => cartProduct.isEqual(coupon.product))
            .reduce((a, b) => a + b.getDiscount(), 0),
        )
    })
  }

  /**
   * @param {Product} product
   * @return {number}
   * @private
   */
  indexOf (product) {
    return this.getState().cartProducts.findIndex((cartProduct) => cartProduct.isEqual(product))
  }

  getCartProducts () {
    return this.getState().cartProducts
  }

  getCoupons () {
    return this.getState().coupons
  }
}

