import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import "./view/styles/App.css";

import Main from './view/pages/Main';

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
