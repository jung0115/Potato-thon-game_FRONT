import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./view/styles/App.css";

import Main from './view/pages/Main';
import store from './redux/store.tsx';
import CoinProvider from './context/CoinProvider';

const App = () => {
  return(
    <CoinProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </CoinProvider>
  )
}

export default App;
