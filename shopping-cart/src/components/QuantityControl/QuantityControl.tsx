import { useState, useEffect } from "react";
import styles from "./Quantityontrol.module.css";
export type Operation = 'plus'|'minus'

interface Props {
    handleQuantityChange: (coffeeId: number, operation: Operation) => void
    coffeeId: number
    currentQuantity: number
}
const QuantityControl = ({handleQuantityChange, coffeeId, currentQuantity }: Props) => {
    const [amount, setAmount] = useState<number>(currentQuantity);

    useEffect(() => {
        setAmount(currentQuantity);
    }, [currentQuantity]);


    const handleQuantityPlus = (): void => {
        const updatedAmount = amount + 1;
        setAmount(updatedAmount);
        handleQuantityChange(coffeeId, 'plus');
    }
        
    const handleQuantityMinus = (): void => {
        if (amount > 1) {
            const updatedAmount = amount - 1;
            setAmount(updatedAmount);
            handleQuantityChange(coffeeId, 'minus');
        }
}

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAmount = parseInt(e.target.value);
    setAmount(updatedAmount);
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







