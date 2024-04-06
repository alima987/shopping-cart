import { useParams } from "react-router-dom";
import { useCoffeeApi } from "../../hooks/useCoffeeApi";
import { useState } from "react";
import { Product } from "../../hooks/useCoffeeApi";
import { CartProps } from "../Products/Products";
import useLocalStorageState from "use-local-storage-state";
const Detailed = () => {
    const { coffeeId } = useParams()
    const baseUrl = `https://fake-coffee-api.vercel.app/api/${coffeeId}`;
    const { data: coffee, error, isLoading } = useCoffeeApi(baseUrl);
    const [quantities, setQuantities] = useState<{[key: number]: number}>({})
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    
    const renderDetailLoader = () => {
      return <div>Loading...</div>
   }
   
   const handleQuantityPlus = (coffeeId: number) => {
    setQuantities({...quantities, [coffeeId]: (quantities[coffeeId] || 0) + 1})
}
const handleQuantityMinus = (coffeeId: number) => {
    if(quantities[coffeeId] > 0) {
        setQuantities({...quantities, [coffeeId]: (quantities[coffeeId]) - 1})
    }
}

const addToCart = (coffee: Product) => {
  const updatedCart = { ...cart, [coffee.id]: coffee };
  setCart(updatedCart);
  setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [coffee.id]: (prevQuantities[coffee.id])
  }));
};
const handleQuantityChange = (coffeeId: number, newQuantity: number) => {
  setQuantities({...quantities, [coffeeId]: newQuantity})
}


      return (
        <div>
        {error && <div>Error: {error}</div>}
        {isLoading ? renderDetailLoader() : null}
         <div className="detail-page">
        {coffee.map((detail) => (
        <div key={detail.id} className="product">
          <img className="product-img" src={detail.image_url} />
          <p className="detail-text">{detail.name}</p>
          <p className="detail-text">{detail.description}</p>
          <p className="detail-text">{detail.price}</p>
          <p className="detail-text">{detail.region}</p>
          <p className="detail-text">{detail.weight}</p>
          <p className="detail-text">{detail.roast_level}</p>
          <p className="detail-text">{detail.flavor_profile}</p>
          <p className="detail-text">{detail.grind_option}</p>
          <input type="button" value="-" onClick={() => handleQuantityMinus(detail.id)} />
                    <input
                    type="number"
                    min="1"
                    value={quantities[detail.id] || 0}
                    onChange={(e) => handleQuantityChange(detail.id, parseInt(e.target.value))}
                    />
                    <input type="button" value="+" onClick={() => handleQuantityPlus(detail.id)}/>
                    <button
         name="ADD TO CART"
         className="cart-btn"
         onClick={() => addToCart(detail)}
         data-amount={quantities[detail.id] || 0}
         >
          ADD TO CART
         </button>
        </div>
      ))}
      </div>
        </div>
      );

}
export default Detailed

