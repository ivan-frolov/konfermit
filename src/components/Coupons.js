import React from 'react'
import Coupon from './Coupon'
import { processCartAction } from '../store/cartControl'
import store from '../store/store'

class Coupons extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isOpen: props.isOpen}
    this.onApply = this.onApply.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({isOpen: nextProps.isOpen})
    }
  }

  onApply (coupon) {
    coupon.setProduct(this.props.product)
    processCartAction('applyCoupon', [coupon])
  }

  render () {
    const cart = store.getState().cart
    return !this.state.isOpen ? null : (
      <div className="b-popup">
        <div className="b-popup__inner">
          <div className={'b-products'}>
            {
              this.props.coupons.map((coupon, index) => (
                  <Coupon disabled={cart.isCouponApplied(coupon)} key={index} coupon={coupon} onApply={this.onApply}/>
                ),
              )
            }
          </div>
          <button onClick={this.props.onClose}>close</button>
        </div>
      </div>
    )
  }
}

export default Coupons
