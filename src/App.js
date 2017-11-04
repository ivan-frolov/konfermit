import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from './store/store'

class App extends Component {
  render () {
    return (
      <div className="App">
        Hello world
      </div>
    )
  }
}

const mapStateToProps = function (store) {
  return {
  }
}
export default connect(mapStateToProps)(App)
