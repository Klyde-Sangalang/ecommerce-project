import './Navbar.css';

import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

import cart_icon from '../assets/cart_icon.png';
import logo from '../assets/logo.png';
import nav_dropdown from '../assets/nav_dropdown.png';

export const Navbar = () => {

  const {getTotalCartItems} = useContext(ShopContext);
  const [menu, setMenu] = useState("shop");

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
        <Link style={{ textDecoration: 'none', color: 'grey'}} to='/'>
        <div className="navbar-logo" onClick={()=>{setMenu("shop")}}>
          <img className="navbar-logo-img" src={logo} alt="logo" />
          <p>Tshee</p>
        </div></Link>
        <img onClick={dropdown_toggle} src={nav_dropdown} alt="dropdown" className="nav-dropdown" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}> <Link className='nav-link' to='/'>Shop</Link> {menu==="shop" && <hr />}</li>
            <li onClick={()=>{setMenu("mens")}}><Link className='nav-link' to='/mens'>Men</Link>{menu==="mens" && <hr />}</li>
            <li onClick={()=>{setMenu("womens")}}><Link className='nav-link' to='womens'>Women</Link>{menu==="womens" && <hr />}</li>
            <li onClick={()=>{setMenu("kids")}}><Link className='nav-link' to='kids'>Kids</Link>{menu==="kids" && <hr />}</li> 
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token') ? 
            <button className='login-cart-button' onClick={()=>{localStorage.removeItem('auth-token'); localStorage.removeItem('user');  window.location.replace('/')}}>Logout</button> : 
            <Link  to='/login'><button className='login-cart-button'>Login</button></Link> }
            <Link  to='/cart'><img src={cart_icon} alt="cart" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar