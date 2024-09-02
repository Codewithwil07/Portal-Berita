import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HompPage from './pages/HompPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HompPage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
