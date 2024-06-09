import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from './context/Context';
ReactDOM.render(
<ContextProvider>
    <App/>{/*the child of contextProvider*/}
</ContextProvider> 
,
document.getElementById('root'));
