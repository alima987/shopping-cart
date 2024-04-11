import useLocalStorageState from "use-local-storage-state";
import { CartProps } from "../Products/Products"
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import QuantityControl from "../../components/QuantityControl/QuantityControl";
import Modal from "../../components/Checkout";
import styles from "./Cart.module.css"
import { CoffeeContext } from "../../CoffeeContext";

const Cart = () => {
const [cart, ] = useLocalStorageState<CartProps>('cart', {})
const [isModalOpen, setIsModalOpen] = useState(false);
const { handleDeleteCoffees, clearCart, handleQuantityChange, /*handleCheckout,*/ } = useContext(CoffeeContext)
const location = useLocation()
const getCoffees = () => Object.values(cart || {})
useEffect(() => {
    window.scrollTo(0,0)
}, [location])
const handleTotalAmount = (): number => getCoffees().reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
const handleCheckout = () => {
  clearCart()
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
                <div><p className={styles.cartText}>$ {item.price}</p></div>
                <div>
                  <QuantityControl
                    handleQuantityChange={handleQuantityChange}
                    coffeeId={item.id}
                    currentQuantity={item.quantity}
                  />
                  <button className={styles.cartRemoveBtn} onClick={(() => handleDeleteCoffees(item.id))}>
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
          </div>
        )}
         <button disabled={Object.keys(cart || {}).length === 0} className={styles.checkout} onClick={() => handleCheckout()}>
               CHECK OUT
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </>
  );
  
}
export default Cart