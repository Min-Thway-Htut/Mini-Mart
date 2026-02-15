import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import ProductsPage from './components/pages/ProductsPage';
import ProductDetailsPage from './components/pages/ProductDetailsPage';
import CartPage from './components/pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={
        <>
         <Navbar />
         <ProductsPage />
         <Footer />
        </>
            } />
          <Route path="/products/:id" element={
            <>
             <Navbar />
             <ProductDetailsPage />
             <Footer />
            </>
            } />

            <Route path="/cart" element={
                <>
                <Navbar />
                <CartPage />
                <Footer />
                </>
            } />
      </Routes>
    </Router>
  );
}

export default App;
