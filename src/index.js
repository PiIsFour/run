import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App geolocation={navigator.geolocation}/>, document.getElementById('root'))
registerServiceWorker()
