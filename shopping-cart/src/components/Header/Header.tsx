import { Link } from "react-router-dom"

const Header = () => {
    return (
        <>
        <h2>Brewed Bliss Coffee Co.</h2>

        <Link to="/">Home</Link>
        <Link to="/coffee">Coffee</Link>
        <Link to="/cart">Cart</Link>
        </>
    )

}
export default Header