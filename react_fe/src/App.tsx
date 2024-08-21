import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { routes } from "./router/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedRoutes component={route.element} isProtected={route.isProtected} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
