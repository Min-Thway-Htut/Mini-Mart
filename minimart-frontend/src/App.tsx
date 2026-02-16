import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import Navbar from "./components/pages/Navbar";
import Footer from "./components/pages/Footer";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetailsPage from "./components/pages/ProductDetailsPage";
import CartPage from "./components/pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import WelcomePage from "./components/pages/WelcomPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route path="/" element={<WelcomePage />} />

        <Route path="/landingPage" element={<LandingPage />} />

        <Route path="/login" element={
          <Layout>
             <LoginPage />
          </Layout>
          } />

        <Route path="/register" element={
          <Layout>
             <RegisterPage />
          </Layout>
          } />

        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <Layout>
              <ProductDetailsPage />
            </Layout>
          }
        />

        {/* Protected */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Layout>
                <CartPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
