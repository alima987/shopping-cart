import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "./Products/Products"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Operation } from "../components/QuantityControl";
import QuantityControl from "../components/QuantityControl";
import Modal from "../components/Checkout";
const Cart = () => {
const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
const [isModalOpen, setIsModalOpen] = useState(false);
const location = useLocation()
const getCoffees = () => Object.values(cart || {})

useEffect(() => {
    window.scrollTo(0,0)
}, [location])

const handleDeleteCoffees = (coffeeId: number) => {
    const updatedCoffee = {...cart}
    delete updatedCoffee[coffeeId]
    setCart(updatedCoffee)
}

const clearCart = () => {
    setCart({})
}

const handleQuantityChange = (coffeeId: number, operation: Operation) => {
    const updatedQuant = {...cart}
    if(updatedQuant[coffeeId]) {
        if(operation === 'plus') {
            updatedQuant[coffeeId] = {... updatedQuant[coffeeId], quantity: updatedQuant[coffeeId].quantity + 1}
        } else {
            updatedQuant[coffeeId] = {... updatedQuant[coffeeId], quantity: updatedQuant[coffeeId].quantity - 1}
        }
    } 
    setCart(updatedQuant)
};


const handleTotalAmount = () => getCoffees().reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)

const handleCheckout = () => {
    clearCart();
    setIsModalOpen(true);
};

    return (
        <section>
         <h2>Shopping Cart</h2>
         <div>
            {getCoffees().map((item) => (
                <div key={item.id}>
                    <img className="product-img" src={item.image_url} />
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>{item.price}</p>
                     <QuantityControl 
                     handleQuantityChange={handleQuantityChange}
                     coffeeId={item.id}
                     />
                    <p>Total: ${item.price * item.quantity}</p>
                    <button onClick={(() => handleDeleteCoffees(item.id))}>
                     Remove
                     </button>
                </div>
            ))}
         </div>
         <button onClick={(() => clearCart())}>
            Remove all products
         </button>
         <p>Subtotal: ${handleTotalAmount()}</p>
         <button onClick={handleCheckout}>
            CHECK OUT
         </button>
         <Modal isOpen={isModalOpen} onClose={(() => setIsModalOpen(false))}/>
        </section>
    )
}
export default Cart