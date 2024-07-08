import React from 'react';

import { BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Layouts from './Components/Layouts/Layouts';
import Footer from './Components/Footer/Footer';
import Error_page from './Pages/Error_page/Error_page';
import Verify_email from './Pages/Verify-email/Verify_email';

const App = () => {
  return (
    <div>
      <Router>
             <Routes>
                    <Route path='/' element=<Layouts/>>
                    <Route index element=<Home/>/>



                    </Route>
                    <Route path="/*" element=<Error_page/>/>
                    <Route path="/v" element=<Verify_email/>/>

            </Routes>

      </Router>
    </div>
  )
}

export default App;