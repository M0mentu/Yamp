import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers'
import Router from './Router'
class App extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default App
