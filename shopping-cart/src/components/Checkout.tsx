import styles from "../components/Modal/Checkout.module.css";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modal} onClick={onClose}>
    <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>Order Confirmed</h2>
      <p className={styles.modalText}>Your order has been successfully received and is now being processed. Thank you for shopping with us!</p>
      <p className={styles.modalSecondText}>Unfortunately, this is a fake store, and your order has not been accepted. </p>
    </div>
  </div>
  )
};

export default Modal;