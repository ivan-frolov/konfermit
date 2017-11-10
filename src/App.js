import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import ProductList from './components/ProductList'
import { loadState } from './store/cartControl'
import { cartLoad, couponsLoad, productsLoad, updateCartProducts } from './store/actions'
import store from './store/store'
import Cart from './components/Cart'

class App extends Component {
  componentDidMount () {
    loadState().then(result => {
      store.dispatch(cartLoad(result.cart))
      store.dispatch(updateCartProducts(result.cart.getCartProducts()))
      store.dispatch(productsLoad(result.products))
      store.dispatch(couponsLoad(result.coupons))
      console.log(store.getState())
    })
  }

  render () {
    return (
      <div className="App">
        <Cart coupons={this.props.coupons} cartProducts={this.props.cartProducts}/>
        <ProductList products={this.props.products} cart={this.props.cart}/>
      </div>
    )
  }
}

const mapStateToProps = function (store) {
  return {
    cartProducts: store.cartProducts,
    products: store.products,
    cart: store.cart,
    coupons: store.coupons,
  }
}
export default connect(mapStateToProps)(App)
