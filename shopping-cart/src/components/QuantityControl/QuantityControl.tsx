import { useState  } from "react";
import styles from "./Quantityontrol.module.css";
export type Operation = 'plus'|'minus'

interface Props {
    handleQuantityChange: (coffeeId: number, operation: Operation) => void
    coffeeId: number
    currentQuantity: number
}
const QuantityControl = ({handleQuantityChange, coffeeId, currentQuantity}: Props) => {
    //const storedAmount = localStorage.getItem('amount');
    //const initialAmount = storedAmount ? parseInt(storedAmount) : 1;
    const [amount, setAmount] = useState<number>(currentQuantity);

    const handleQuantityPlus = (): void => {
        const updatedAmount = amount + 1;
        setAmount(updatedAmount);
        handleQuantityChange(coffeeId, 'plus');
        localStorage.setItem('amount', JSON.stringify(updatedAmount));
    }
        
    const handleQuantityMinus = (): void => {
        if (amount > 1) {
            const updatedAmount = amount - 1;
            setAmount(updatedAmount);
            handleQuantityChange(coffeeId, 'minus');
            localStorage.setItem('amount', JSON.stringify(updatedAmount));
        }
}

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAmount = parseInt(e.target.value);
    setAmount(updatedAmount);
    localStorage.setItem('amount', JSON.stringify(updatedAmount))
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
                onChange={handleInput}
                />
            <input className={styles.quantityPlusBtn} type="button" value="+" onClick={handleQuantityPlus}/>
        </div>
    )

}
export default QuantityControl







