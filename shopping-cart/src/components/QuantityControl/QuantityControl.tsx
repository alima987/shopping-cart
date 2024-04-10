import { useState  } from "react";
import styles from "./Quantityontrol.module.css";
export type Operation = 'plus'|'minus'

interface Props {
    handleQuantityChange: (coffeeId: number, operation: Operation) => void
    coffeeId: number
    
}
const QuantityControl = ({handleQuantityChange, coffeeId }: Props) => {
    const [amount, setAmount] = useState<number>(1);
    
    const handleQuantityPlus = (): void => {
        const updatedAmount = amount + 1;
        setAmount(updatedAmount);
        handleQuantityChange(coffeeId, 'plus');
    }
        
    const handleQuantityMinus = (): void => {
        if (amount > 0) {
            const updatedAmount = amount - 1;
            setAmount(updatedAmount);
            handleQuantityChange(coffeeId, 'minus');
        }
}
    

    return (
        <div className={styles.quantityContainer}>
            <input className={styles.quantityMinusBtn} type="button" value="-" onClick={handleQuantityMinus} />
            <input
                className={styles.quantityInputBtn}
                type="number"
                min="1"
                max="20"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                />
            <input className={styles.quantityPlusBtn} type="button" value="+" onClick={handleQuantityPlus}/>
        </div>
    )

}
export default QuantityControl







