import { useState } from "react";
export type Operation = 'plus'|'minus'

interface Props {
    handleQuantityChange: (coffeeId: number, operation: Operation) => void
    coffeeId: number
    
}
const QuantityControl = ({handleQuantityChange, coffeeId }: Props) => {
    const [amount, setAmount] = useState<number>(1)


    const handleQuantityPlus = (): void => {
        handleQuantityChange(coffeeId, 'plus')
        const updatedAmount = amount + 1
        setAmount(updatedAmount)
        
    }
    const handleQuantityMinus = (): void => {
        handleQuantityChange(coffeeId, 'minus')
        if(amount > 0) {
           setAmount(amount - 1)
        }
    }
    return (
        <div>
            <input type="button" value="-" onClick={handleQuantityMinus} />
            <input
                type="number"
                min="1"
                step="1"
                max=""
                value={amount}
                onChange={((e) => setAmount(parseInt(e.target.value)))}
                />
            <input type="button" value="+" onClick={handleQuantityPlus}/>
        </div>
    )

}
export default QuantityControl







