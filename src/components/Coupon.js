import React from 'react'
import Button from './Button'

class Coupon extends React.Component {
  constructor (props) {
    super(props)
    this._onApply = this._onApply.bind(this)
  }

  _onApply () {
    this.props.onApply(this.props.coupon)
  }

  render () {
    return (
      <div className={'b-products__product'}>
        <div>
          {this.props.coupon.getTitle()}
        </div>
        <Button disabled={this.props.disabled} onClick={this._onApply} title={'apply coupon'}/>
      </div>
    )
  }
}

export default Coupon
