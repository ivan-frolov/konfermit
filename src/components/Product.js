import React from 'react'
import Button from './Button'

class Product extends React.Component {
  constructor (props) {
    super(props)
    this._onAdd = this._onAdd.bind(this)
  }

  _onAdd () {
    this.props.onAdd(this.props.product)
  }

  render () {
    return (
      <div className={'b-products__product'}>
        <div>
          {this.props.product.getTitle()}
        </div>
        <Button disabled={this.props.disabled} onClick={this._onAdd} title={'Add to cart'}/>
      </div>
    )
  }
}

export default Product
