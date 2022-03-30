import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./store/rootReducer";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [thunk,sagaMiddleware]
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
// then run the saga
// sagaMiddleware.run(mySaga)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
