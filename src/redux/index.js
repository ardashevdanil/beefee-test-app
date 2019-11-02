import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'

import { tasks } from './modules/tasks'
import { auth } from './modules/auth'

const rootReducer = combineReducers({
  tasks,
  auth,
})

export const configureStore = () => {
  const composeEnhancers = (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

  const enhancers = composeEnhancers(applyMiddleware(thunk))

  const store = createStore(
    rootReducer,
    enhancers,
  )

  return store
}
