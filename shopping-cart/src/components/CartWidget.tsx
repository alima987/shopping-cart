import { useNavigate } from 'react-router-dom'
import cartImg from '../assets/cartImg.png'
import styles from "../components/CartWidget.module.css"
interface Props {
    coffeeCount: number
}
const CartWidget = ({coffeeCount}: Props) => {
    const navigate = useNavigate()
    const redirectToCart = () => {
        navigate('/cart')
    }
return (
    <button
       className={styles.widgetBtn}
       onClick={redirectToCart}>
        <img className={styles.cartImg} src={cartImg}/>
       <span className={styles.coffeeCount}>{coffeeCount}</span>
    </button>
)
}
export default CartWidget