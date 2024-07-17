import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Pokemon from "./Pokemon";

const RoutesDom: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pokemonName" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesDom;
