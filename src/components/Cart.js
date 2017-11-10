import React from 'react'
import CartProduct from './CartProduct'
import Coupons from './Coupons'
import Button from './Button'
import UndoRedo from './UndoRedo'

class Cart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {selectedProduct: null, isOpen: false}
    this.openCoupons = this.openCoupons.bind(this)
    this.closeCoupons = this.closeCoupons.bind(this)
  }

  openCoupons (selectedProduct = null) {
    this.setState({selectedProduct: selectedProduct, isOpen: true})
  }

  closeCoupons () {
    this.setState({selectedProduct: null, isOpen: false})
  }

  render () {
    return this.props.cartProducts.length
      ? (
        <div className={'b-cart'}>
          <Coupons
            product={this.state.selectedProduct}
            isOpen={this.state.isOpen}
            onClose={this.closeCoupons}
            coupons={this.props.coupons}/>
          {
            this.props.cartProducts.map((cartProduct, index) => (
                <CartProduct
                  openCoupons={this.openCoupons}
                  key={index}
                  cartProduct={cartProduct}
                />
              ),
            )
          }
          <Button disabled={false} title={'apply coupon to cart'} onClick={this.openCoupons}/>
          <UndoRedo/>
        </div>
      )
      : (
        <div className={'b-cart'}>
          The Cart is empty
          <UndoRedo/>
        </div>
      )
  }
}

export default Cart