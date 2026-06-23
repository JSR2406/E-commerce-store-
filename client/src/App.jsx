import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import AccountPage from "./pages/AccountPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>

          <Route element={<ProtectedRoute allowAdmin />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
