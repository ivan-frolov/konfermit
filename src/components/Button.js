import React from 'react'

class Button extends React.Component {
  constructor (props) {
    super(props)
    this._onClick = this._onClick.bind(this)
    this.state = {disabled: ('disabled' in props) ? props.disabled : false}
  }

  _onClick () {
    this.setState({disabled: true})
    this.props.onClick()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({disabled: nextProps.disabled})
    }
  }

  render () {
    return (
      <button disabled={this.state.disabled} onClick={this._onClick}>
        {this.props.title}
      </button>
    )
  }
}

export default Button
