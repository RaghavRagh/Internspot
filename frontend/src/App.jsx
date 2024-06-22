import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import { Suspense, useEffect } from "react";
import Membership from "./pages/Subscription/Subscription";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./features/userSlice";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    if (userInfoFromStorage) {
      dispatch(loginSuccess(userInfoFromStorage));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/user">
            <Route path="profile" element={<Profile />} />
            <Route path="subscription" element={<Membership />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
