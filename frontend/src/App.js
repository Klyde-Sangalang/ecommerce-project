import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import kid_banner from './components/assets/banner_kids.png';
import men_banner from './components/assets/banner_mens.png';
import women_banner from './components/assets/banner_women.png';

import Footer from './components/footer/Footer.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import { Cart } from './pages/Cart.jsx';
import { LoginSignUp } from './pages/LoginSignUp.jsx';
import { Product } from './pages/Product.jsx';
import { Shop } from './pages/Shop.jsx';
import ShopCategory from './pages/ShopCategory.jsx';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
        {/* <Route path="product" element={<Product />}>
          <Route path='productId' element={<Product />} />
        </Route> */}
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      
      
      <Footer />
      </BrowserRouter>

      
      
    </div>
  );
}

export default App;
