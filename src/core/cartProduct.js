/**
 * @class CartProduct
 */
export default class CartProduct {
  constructor (product) {
    this.product = product
    this._count = 1
    this._discoutn = 0
  }

  setDiscount (value = 0) {
    value = parseInt(value) || 0
    this._discoutn = value < 100 ? value : 100
  }

  getDiscount () {
    return this._discoutn || 0
  }

  getFinalPrice () {
    return Math.round(this.product.getPrice() * (1 - this.getDiscount() / 100))
  }

  getSKU () {
    return this.product.getSKU()
  }

  /**
   * increase by one the number of selected products
   * @returns {CartProduct}
   */
  oneMore () {
    this._count++
    return this
  }

  /**
   * decrease by one the number of selected products
   * @returns {CartProduct}
   */
  less () {
    this._count--
    if (this._count === 0) {
      throw new EmptyCartProductError('Please delete this cart product because it contains zero products')
    }
    return this
  }

  /**
   *
   * @returns {number}
   */
  getCount () {
    return this._count
  }

  /**
   * Check if current instance has product with equal _sku that provided one
   * @param {CartProduct} product
   * @returns {boolean}
   */
  isEqual (product) {
    return this.getSKU() === product.getSKU()
  }
}

export function EmptyCartProductError (message) {
  this.name = 'EmptyCartProductError'
  this.message = message
  this.stack = (new Error()).stack
}
