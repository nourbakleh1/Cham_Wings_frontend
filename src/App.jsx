import React from 'react';

import { BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layouts from './Components/Layouts/Layouts';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <div>
      <Router>
             <Routes>
                    <Route path='/' element=<Layouts/>>
                    <Route index element=<Home/>/>



                    </Route>

            </Routes>

      </Router>
    </div>
  )
}

export default App;