import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import  LayoutWrapper  from './components/Layout';
import './App.css';

class DashApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                        <LayoutWrapper />
                </Router>
            </Provider>
        );
    }
}


export default DashApp;
