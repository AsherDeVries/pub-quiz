import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

function configureStore(initialState) {
   const middlewares = [
      reduxImmutableStateInvariant(),
      thunk
   ];

   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
   const store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(...middlewares)
   )
   );

   return store;
}

export default configureStore;
