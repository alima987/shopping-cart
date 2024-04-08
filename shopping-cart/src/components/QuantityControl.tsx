import { useState, useEffect } from "react";
export type Operation = 'plus'|'minus'

interface Props {
    handleQuantityChange: (coffeeId: number, operation: Operation) => void
    coffeeId: number
    
}
const QuantityControl = ({handleQuantityChange, coffeeId }: Props) => {
    const initialAmount = localStorage.getItem(`quantity_${coffeeId}`) || '1';
    const [amount, setAmount] = useState<number>(parseInt(initialAmount))
    useEffect(() => {
        localStorage.setItem(`quantity_${coffeeId}`, amount.toString());
    }, [amount, coffeeId]);

    useEffect(() => {
        setAmount(1);
    }, [coffeeId]);
    const handleQuantityPlus = (): void => {
        const updatedAmount = amount + 1;
        setAmount(updatedAmount);
        handleQuantityChange(coffeeId, 'plus')
    }
    const handleQuantityMinus = (): void => {
        if (amount > 0) {
            const updatedAmount = amount - 1;
            setAmount(updatedAmount);
            handleQuantityChange(coffeeId, 'minus');
        }
    }
    

    return (
        <div>
            <input type="button" value="-" onClick={handleQuantityMinus} />
            <input
                type="number"
                min="1"
                max="20"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                />
            <input type="button" value="+" onClick={handleQuantityPlus}/>
        </div>
    )

}
export default QuantityControl







