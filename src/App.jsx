import React from 'react';

import { BrowserRouter as Router , Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <div className='text-blue-200'><Home/></div>
  )
}

export default App;