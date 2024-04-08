import styles from "./Checkout.module.css";
import x from "../assets/x.png"
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
    <div className={styles.modalContent}>
      <img src={x} onClick={onClose}/>
      <h2>Order Confirmed</h2>
      <p>Your order has been successfully received and is now being processed. Thank you for shopping with us!</p>
      <p>Unfortunately, this is a fake store, and your order has not been accepted. </p>
      <div className={styles.modalButtons}>
      </div>
    </div>
  </div>
  )
};

export default Modal;