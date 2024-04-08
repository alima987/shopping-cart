import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import coffeeImg from '../assets/coffeeImg.png'
import CartWidget from "./CartWidget";
import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "../pages/Products/Products";
//import { Product } from "../hooks/useCoffeeApi";
//import { useState } from "react"; 

const Header = () => {
    const [cart, ] = useLocalStorageState<CartProps>('cart', {})

const coffeeCount: number = Object.keys(cart || {}).length
    return (
        <>
        <div>
            <Link to="/">
            <img src={coffeeImg}/>
            </Link>
        </div>
        <h2>Brewed Bliss Coffee Co.</h2>
        <div>
            <CartWidget coffeeCount={coffeeCount}/>
        </div>
        <Link to="/">Home</Link>
        <Link to="/coffee">Coffee</Link>
        <Link to="/cart">Cart</Link>
        <Outlet />
        </>
    )

}
export default Header
