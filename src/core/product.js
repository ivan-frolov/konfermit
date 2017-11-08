export default class Product {
  /**
   * @param {number|string} sku
   * @param {number} price
   * @param {string} title
   */
  constructor (sku, price, title = '') {
    this._sku = sku
    this._price = price
    this._title = title
  }

  getPrice () {
    return this._price || 0
  }

  getTitle () {
    return this._title
  }

  getSKU () {
    return this._sku
  }
}