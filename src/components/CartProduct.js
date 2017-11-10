import React from 'react'
import Button from './Button'
import { processCartAction } from '../store/cartControl'

class CartProduct extends React.Component {
  constructor (props) {
    super(props)
    this.oneMore = this.oneMore.bind(this)
    this.less = this.less.bind(this)
    this.remove = this.remove.bind(this)
    this._openCoupons = this._openCoupons.bind(this)
  }

  oneMore () {
    processCartAction('oneMoreProduct', [this.props.cartProduct.product])
  }

  less () {
    processCartAction('lessProduct', [this.props.cartProduct.product])
  }

  remove () {
    processCartAction('removeProduct', [this.props.cartProduct.product])
  }

  _openCoupons () {
    this.props.openCoupons(this.props.cartProduct.product)
  }

  render () {
    const cartProduct = this.props.cartProduct
    return (
      <div className={'b-cart-product'}>
        <div className={'b-cart-product__title'}>
          {cartProduct.product.getTitle()}
        </div>
        <div className={'b-cart-product__price'}>
          FinalPrice(with discount):{cartProduct.getFinalPrice()}
        </div>
        <div className={'b-cart-product__control'}>
          <Button disabled={false} title={'apply coupon to product'} onClick={this._openCoupons}/>
          <Button disabled={false} title={'+'} onClick={this.oneMore}/>
          {cartProduct.getCount()}
          <Button disabled={cartProduct.getCount() === 1} title={'-'} onClick={this.less}/>
          <Button disabled={false} title={'remove'} onClick={this.remove}/>
        </div>
      </div>
    )
  }
}

export default CartProduct
