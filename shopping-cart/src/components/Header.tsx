import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import coffeeImg from '../assets/coffeeImg.png'
import CartWidget from "./CartWidget";
import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "../pages/Products/Products";
import styles from "./Header/Header.module.css"


const Header = () => {
const [cart, ] = useLocalStorageState<CartProps>('cart', {})
const coffeeCount: number = Object.values(cart || {}).reduce((acc, curr) => acc + curr.quantity, 0)

    return (
        <>
        <div className={styles.headerContainer}>
        <div className={styles.logo}>
            <Link className={styles.link} to="/">
            <img className={styles.headerImg} src={coffeeImg}/>
            </Link>
        </div>
        <div className={styles.titleWrap}>
        <h2 className={styles.headerTitle}>Brewed Bliss Coffee Co.</h2>
        <div className={styles.linkMenu}>
        <Link className={styles.linkHome} to="/">Home</Link>
        <Link className={styles.linkCoffee} to="/coffee">Coffee</Link>
        <Link className={styles.linkCart} to="/cart">Cart</Link>
        </div>
        </div>
        <div className={styles.headerCart}>
            <CartWidget coffeeCount={coffeeCount}/>
        </div>
        </div>
        <Outlet />
        </>
    )

}
export default Header
