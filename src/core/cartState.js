/**
 * @class CartState
 */
export default class CartState {
  constructor () {
    /*
     * @type {CartProduct[]}
     */
    this.cartProducts = []
    /*
     * @type {Coupon[]}
     */
    this.coupons = []
  }

  clone () {
    let copy = new this.constructor()
    Object.keys(this).forEach((key) => {copy[key] = this._getArrayCopy(this[key])})
    return copy
  }

  _getArrayCopy (array) {
    return array.map((object) => Object.assign(Object.create(Object.getPrototypeOf(object)), object))
  }
}

