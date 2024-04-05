//import { useParams } from "react-router-dom";
//import { useCoffeeApi } from "../hooks/useCoffeeApi";
const Cart = () => {

//const { cartId } = useParams()
//const baseUrl = `https://fake-coffee-api.vercel.app/api/${cartId}`;
//const { data: coffee, error, isLoading } = useCoffeeApi(baseUrl);
    return (
        <>
        <p className="cart-none">
        Your cart is currently empty.
        </p>
         <h2>Shopping Cart</h2>
        </>
    )
}
export default Cart