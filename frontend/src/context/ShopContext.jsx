import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
        let cart = {};
        for (let i = 0; i < 300 + 1; i++) {
            cart[i] = 0;
        }
        return cart;
    }



const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [user, setUser] = useState(null);

    useEffect(()=> {
        fetch("http://localhost:4000/allproducts")
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))
    },[])

    
    // Function for user persistance
    // useEffect(()=> {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);


    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };
    
    // Cart Functions
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+1}));
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product)=> product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
    return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartItems, 
        getTotalCartAmount, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart, 
        user,
        login,
        logout
    };
    

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children} 
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;