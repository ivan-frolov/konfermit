export default class Coupon {
  constructor (couponId) {
    this._couponId = couponId
    this._discount = 0
    this.title = ''
  }

  setProduct (product) {
    this.product = product
  }

  getTitle () {
    return this.title
  }

  setTitle (title) {
    this.title = title
    return this
  }

  getCouponId () {
    return this._couponId
  }

  calcDiscount () {
    return new Promise((resolve, reject) => {
      // const timeout = Math.random() * 300 + 100
      const timeout = 0
      setTimeout(() => {
        this._discount = (parseInt(this._couponId) || 0) + (this.product ? 5 : 0)
        resolve(this)
      }, timeout)
    })
  }

  getDiscount () {
    return this._discount
  }
}