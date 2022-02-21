// Store
import { createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducers/Reducers";
import { rootSaga } from "./Sagas";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();


// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware)); 

// const store = createStore(reducer, enhancer);



const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))



// export default store



// //redux loager connect it
// const store = createStore(
//   reducer,
//   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
//   applyMiddleware(sagaMiddleware)
//   )
// );

sagaMiddleware.run(rootSaga); //типа хендлера для запуска запроса с экшеном
export default store;