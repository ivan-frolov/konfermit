import React from 'react'
import Product from './Product'
import { processCartAction } from '../store/cartControl'

class ProductList extends React.Component {
  handleAdd (product) {
    processCartAction('addProduct', [product])
  }

  render () {
    return (
      <div className={'b-products'}>
        {this.props.products.map((product) => (
          <Product disabled={this.props.cart.indexOf(product) !== -1} key={product.getSKU()} product={product}
            onAdd={this.handleAdd}/>
        ))}
      </div>
    )
  }
}

export default ProductList