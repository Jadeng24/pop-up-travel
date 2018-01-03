import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { HashRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const Material = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
)
ReactDOM.render(
    <Router>
        <Material />
    </Router>
    , document.getElementById('root'));
unregister();
