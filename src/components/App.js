import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={ <Home /> } />
                <Route exact path="/login" element={ <Login /> } />
            </Routes>
        </Router>
    );
};

export default App;
