import { useState  } from "react";
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







