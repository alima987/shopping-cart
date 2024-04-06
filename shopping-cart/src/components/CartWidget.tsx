import { redirect } from "react-router-dom";
import cartImg from '../assets/cartImg.png'
interface Props {
    coffeeCount: number
}
const CartWidget = ({coffeeCount}: Props) => {
    const redirectToCart = () => {
        redirect('/cart')
    }
return (
    <button
       onClick={redirectToCart}>
       <span>{coffeeCount}</span>
       <img src={cartImg}/>
    </button>
)
}
export default CartWidget