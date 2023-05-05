import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main }from 'pages';

export default function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}