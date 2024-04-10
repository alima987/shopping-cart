import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "../Products/Products"
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Operation } from '../../components/QuantityControl/QuantityControl'
import QuantityControl from "../../components/QuantityControl/QuantityControl";
import Modal from "../../components/Checkout";
import styles from "./Cart.module.css"
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
    <>
      <section className={styles.cartSection}>
        <h2 className={styles.cartTitle}>Shopping Cart</h2>
        {Object.keys(cart || {}).length < 1 ? (
            <>
            <p>Your cart is currently empty.</p>
            <p>Continue browsing <Link to="/coffee">here</Link>.</p>
            </>
        ) : (
          <div className={styles.cartProducts}>
            <div className={styles.grid}>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            {getCoffees().map((item) => (
              <div key={item.id} className={styles.cartProduct}>
                <div>
                  <img className={styles.cartImg} src={item.image_url} alt={item.name} />
                </div>
                <div>
                  <p className={styles.cartName}>{item.name}</p>
                  <p className={styles.cartText}>Grind: {item.grind_option}</p>
                </div>
                <div><p>$ {item.price}</p></div>
                <div>
                  <QuantityControl
                    handleQuantityChange={handleQuantityChange}
                    coffeeId={item.id}
                  />
                  <button className={styles.cartRemoveBtn} onClick={() => handleDeleteCoffees(item.id)}>
                    Remove
                  </button>
                </div>
                <div>
                  <p className={styles.cartTotal}>$ {item.price * item.quantity}</p>
                </div>
              </div>
            ))}
            <button className={styles.removeAllBtn} onClick={() => clearCart()}>
              Remove all
            </button>
            <p className={styles.cartSubtotal}>Subtotal: $ {handleTotalAmount()}</p>
            <button className={styles.checkout} onClick={handleCheckout}>
               CHECK OUT
            </button>
          </div>
        )}
      </section>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
  
}
export default Cart