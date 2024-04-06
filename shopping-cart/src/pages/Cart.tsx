import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "./Products/Products"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Cart = () => {
const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
const [quantities, setQuantities] = useState<{[key: number]: number}>({})
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
const handleQuantityPlus = (coffeeId: number) => {
    setQuantities({...quantities, [coffeeId]: (quantities[coffeeId] || 0) + 1})
}
const handleQuantityMinus = (coffeeId: number) => {
    if(quantities[coffeeId] > 0) {
        setQuantities({...quantities, [coffeeId]: (quantities[coffeeId]) - 1})
    }
}

const clearCart = () => {
    setCart({})
    setQuantities({})
}

const handleQuantityChange = (coffeeId: number, newQuantity: number) => {
    setQuantities({...quantities, [coffeeId]: newQuantity})
}

const handleTotalAmount = () => getCoffees().reduce((acc, curr) => acc + (curr.price * quantities[curr.id] || 0), 0)

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
                    <input type="button" value="-" onClick={() => handleQuantityMinus(item.id)} />
                    <input
                    type="number"
                    min="1"
                    value={quantities[item.id] || 0}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                    <input type="button" value="+" onClick={() => handleQuantityPlus(item.id)}/>
                    <p>Total: ${item.price * (quantities[item.id] || 0)}</p>
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
        </section>
    )
}
export default Cart