import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./redux/store.js";

//Private ROute

import PrivateRoute from "./components/PrivateRoute.jsx";

//Auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Profile from "./pages/User/Profile.jsx";

//Admin Route
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from "./pages/Admin/ProductList.jsx";
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts";
import Home from "./Home.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
<Route index={true} path="/" element={<Home/>}/>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

    {/* admin Routes */}

    <Route path="/admin" element={<AdminRoute/>}>
      <Route path="userlist" element={<UserList/>}/>
      <Route path="categorylist" element={<CategoryList/>}/>
      <Route path="allproductslist" element={<AllProducts />} />
      <Route path="productlist" element={<ProductList/>}/>
      <Route path="product/update/:_id" element={<ProductUpdate/>}/>
    </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
