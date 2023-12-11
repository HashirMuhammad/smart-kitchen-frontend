import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuComponent from "./Components/Menu/Menu";
import Signup from "./Components/SignUp";
import Login from "./Components/Login";
import AddMenuItem from "./Components/AddMenuItem";
import UserList from "./Components/UserList";
import Order from "./Components/Order";
import OrderDetails from "./Components/OrderDetails";
import FeedbackForm from "./Components/FeedbackForm";
import RiderDetails from "./Components/RiderDetails";
import OrdersList from "./Components/OrdersList";

import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Header/Footer";

function App() {
  return (
    <Router>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Routes>
          <Route path="/" element={<MenuComponent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-menu-item" element={<AddMenuItem />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/feedback-form" element={<FeedbackForm />} />
          <Route path="/rider-details" element={<RiderDetails />} />
          <Route path="/orders-list" element={<OrdersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
