import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.less";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import Reducer from "./store/reducers/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  list: Reducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
