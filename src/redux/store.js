import {createStore, applyMiddleware} from 'redux'
import promisedMiddleware from 'redux-promise-middleware'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'

// const rootReducer= combineReducers({
//     user:reducer
// })

export default createStore(reducer,composeWithDevTools(applyMiddleware(promisedMiddleware)))