import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootElement = document.getElementById('root')
ReactDOM.render(<App numRows={9} numColumns={9} />, rootElement)
registerServiceWorker()
