import Cart from '../cart'
import OperationManager from '../operationManager'
import Product from '../product'
import Coupon from '../coupon'

//TODO: rewrite it all!

describe('operation manager', function () {
  let cart,
    operationManager = null
  beforeEach(function () {
    cart = new Cart()
    operationManager = cart.operationManager
  })

  /**
   * first CartProduct (sku:1) count : 3
   * second CartProduct (sku:2) count : 1
   * @param {Cart} cart
   */
  function setupComplexState (cart) {
    let product1 = new Product('1', 10, 'Test product1'),
      product2 = new Product('2', 10, 'Test product2'),
      product3 = new Product('3', 100, 'Test product3')
    cart
      .addProduct(product1)
      .oneMoreProduct(product1)
      .oneMoreProduct(product1)
      .oneMoreProduct(product1)
      .lessProduct(product1)
      .addProduct(product2)
      .oneMoreProduct(product2)
      .lessProduct(product2)
      .addProduct(product3)
      .oneMoreProduct(product3)
      .applyCoupon(new Coupon('Some coupon id'))
      .removeProduct(product3)
    return cart
  }

  it('should have operation manager', () => {
    expect(operationManager).toEqual(jasmine.any(OperationManager))
  })
  it('should not undo redo at start', () => {
    expect(operationManager.canUndo()).toBe(false)
    expect(operationManager.canRedo()).toBe(false)
  })
  it('should be able undo after method', () => {
    cart.addProduct(new Product('1', 10, 'Test product'))
    expect(operationManager.canUndo()).toBe(true)
  })
  it('should be able redo after undo', () => {
    cart.addProduct(new Product('1', 10, 'Test product'))
    operationManager.undo()
    expect(operationManager.canRedo()).toBe(true)
  })
  it('should be no CartProducts after undo with one CartProduct before', () => {
    cart.addProduct(new Product('1', 10, 'Test product'))
    operationManager.undo()
    expect(cart.getCartProducts()).toEqual([])
  })
  it('should be the same state after undo redo', () => {
    let firstState = setupComplexState(cart).getState().clone()
    operationManager.undo().redo()
    expect(firstState).toEqual(cart.getState())
  })
  it('should be deleted if decrease number of same product too many times', () => {
    let product = new Product('1', 10, 'Test product')
    cart.addProduct(product).lessProduct(product).lessProduct(product)
    expect(cart.getCartProducts()).toEqual([])
  })
  it('should contain proper number of products', () => {
    setupComplexState(cart)
    cart.getCartProducts().forEach((cartProduct) => {
      if (cartProduct.getSKU() === '1') {
        expect(cartProduct.getCount()).toEqual(3)
      } else {
        expect(cartProduct.getCount()).toEqual(1)
      }
    })
  })
  it('should undo to initial state', () => {
    let i = 0
    const initialState = cart.getState().clone()
    setupComplexState(cart)
    for (; i < 12; i++) {
      operationManager.undo()
    }
    expect(cart.getState()).toEqual(initialState)
  })
})
