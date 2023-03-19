import { Component } from 'react'

import './app.scss'

class App extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}
export default App
