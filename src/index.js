import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Grid from './components/Grid';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
        <Route path="play" element={<Grid/>} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

