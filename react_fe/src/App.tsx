import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./components/Loader";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { routes } from "./router/routes";

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<ProtectedRoutes Component={route.element} isProtected={route.isProtected} />}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
