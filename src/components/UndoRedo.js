import React from 'react'
import Button from './Button'
import { processCartAction } from '../store/cartControl'
import store from '../store/store'

class UndoRedo extends React.Component {
  constructor (props) {
    super(props)
  }

  undo () {
    processCartAction('undo', [], true)
  }

  redo () {
    processCartAction('redo', [], true)
  }

  render () {
    const operationManager = store.getState().cart.operationManager
    return (
      <div>
        <Button disabled={!operationManager.canUndo()} onClick={this.undo} title={'Undo'}/>
        <Button disabled={!operationManager.canRedo()} onClick={this.redo} title={'Redo'}/>
      </div>
    )
  }
}

export default UndoRedo

