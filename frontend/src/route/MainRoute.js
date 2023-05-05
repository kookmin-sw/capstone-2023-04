import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main, Search }from 'pages';

export default function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Main />} />
        <Route path="Search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}