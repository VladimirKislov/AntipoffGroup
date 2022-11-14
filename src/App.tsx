import "./main.global.css";
import React, { useEffect, useState } from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { Layout } from "./shared/Layout/Layout";
import { SignUp } from "./shared/SignUp";
import { Team } from "./shared/Team";
import { UserCard } from "./shared/UserCard";
import { RootReducer, RootState } from "./stor/stor";
import { useSelector } from "react-redux";

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

function AppComponent() {
  const [mounted, setMounted] = useState(false);
  const token = useSelector<RootState, string>((state) => state.token);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {mounted && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/" element={token !== "" ? <Layout /> : <Navigate to="/" />}>
              <Route path="/team" element={token !== "" ? <Team /> : <Navigate to="/" />} />
              <Route path="/user:userId" element={token !== "" ? <UserCard /> : <Navigate to="/" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export const App = hot(() => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
));
