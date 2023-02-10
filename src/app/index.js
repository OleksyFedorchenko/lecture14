import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App.jsx';
import userReducer from './reducers/user';
import countriesReducer from '../pages/Countries/reducers/countries.js';

const rootReducer = combineReducers({
    user: userReducer,
    countries: countriesReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
);
// eslint-disable-next-line
export default () => (
    <Provider store={store}>
        <App/>
    </Provider>
)
