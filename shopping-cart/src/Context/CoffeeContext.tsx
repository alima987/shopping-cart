import { createContext } from "react";
import { CartProps } from "../pages/Products/Products";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { Operation } from '../components/QuantityControl/QuantityControl'
import { Product } from "../hooks/useCoffeeApi";
interface CoffeeContextType {
    addToCart: (coffee: Product) => void
    handleDeleteCoffees: (coffeeId: number) => void;
    clearCart: () => void
    handleQuantityChange: (coffeeId: number, operation: Operation) => void
    handleCheckout: () => void
  }
export const CoffeeContext = createContext<CoffeeContextType>({
    addToCart: () => {},
    handleDeleteCoffees: () => {},
    clearCart: () => {},
    handleQuantityChange: () => {},
    handleCheckout: () => {},
})

const CoffeeProvider = ({ children }: any) => {
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (coffee: Product) => {
        const newCart = {...cart}
        if (newCart[coffee.id]) {
          const updatedCart = { ...cart, [coffee.id]: { ...coffee, quantity: newCart[coffee.id].quantity + 1 } };
          setCart(updatedCart);
        } else {
          const updatedCart = { ...cart, [coffee.id]: { ...coffee, quantity: 1 } };
          setCart(updatedCart);
    }
  }    
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

    const handleCheckout = () => {
        clearCart()
        setIsModalOpen(true);
        isModalOpen
      };
    const contextValue = {
      addToCart,
      handleDeleteCoffees,
      clearCart,
      handleQuantityChange,
      handleCheckout,
    }
    return (
        <CoffeeContext.Provider value={contextValue}>
            {children}
        </CoffeeContext.Provider>
    )
}
export default CoffeeProvider