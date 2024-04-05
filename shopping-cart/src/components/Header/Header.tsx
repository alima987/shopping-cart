import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import useLocalStorageState from 'use-local-storage-state'

const Header = () => {
    const [cart, setCart] = useLocalStorageState('cart', {}); // Provide a type annotation for cart
    const cartCount = Object.keys(cart).reduce((prev, curr) => {
        return prev + cart[curr]
    },0)
    return (
        <>
        <h2>Brewed Bliss Coffee Co.</h2>

        <Link to="/">Home</Link>
        <Link to="/coffee">Coffee</Link>
        <Link to="/cart">Cart {cartCount > 0 && `(${cartCount})`}</Link>
        <Outlet />
        </>
    )

}
export default Header