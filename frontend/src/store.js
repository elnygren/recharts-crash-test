import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducers/root'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, promiseMiddleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store
