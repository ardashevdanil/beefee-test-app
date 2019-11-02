import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { Provider } from 'react-redux'

import { App } from './App'
import { configureStore } from './redux'
import * as serviceWorker from './serviceWorker'

axios.defaults.baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>

), document.getElementById('root'))

serviceWorker.unregister()
