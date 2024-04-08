import { useParams } from "react-router-dom";
import { Product, useCoffeeApi } from "../../hooks/useCoffeeApi";
import { CartProps } from "../Products/Products";
import useLocalStorageState from "use-local-storage-state";
const Detailed = () => {
    const { coffeeId } = useParams()
    const baseUrl = `https://fake-coffee-api.vercel.app/api/${coffeeId}`;
    const { data: coffee, error, isLoading } = useCoffeeApi(baseUrl);
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    
    const renderDetailLoader = () => {
      return <div>Loading...</div>
   }
   
   const addToCart = (coffee: Product) => {
    coffee.quantity = 1
    const updatedCart = {...cart, [coffee.id]: coffee}
    setCart(updatedCart)
  }

  const isInCart = (coffeeId: number):boolean => Object.values('cart' || {}).includes(coffeeId.toString())

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
          <button
            key={detail.id}
            name="ADD TO CART"
            className="cart-btn"
            disabled={isInCart(detail.id)}
            onClick={(() => addToCart(detail))}>
               ADD TO CART
          </button>
        </div>
      ))}
      </div>
        </div>
      );

}
export default Detailed

