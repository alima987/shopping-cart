import { useParams } from "react-router-dom";
import { useState  } from "react";
import { Product, useCoffeeApi } from "../../hooks/useCoffeeApi";
import { CartProps } from "../Products/Products";
import useLocalStorageState from "use-local-storage-state";
import styles from "./Detailed.module.css"
const Detailed = () => {
    const { coffeeId } = useParams()
    const baseUrl = `https://fake-coffee-api.vercel.app/api/${coffeeId}`;
    const { data: coffee, error, isLoading } = useCoffeeApi(baseUrl);

    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    const [quantity, setQuantity] = useState<number>(1);
    const renderDetailLoader = () => {
      return <div>Loading...</div>
   }

const addToCart = (coffee: Product) => {
    coffee.quantity = quantity
    const updatedCart = {...cart, [coffee.id]: coffee}
    setCart(updatedCart)
    setQuantity(quantity)
  }
  
let productObj: any;
  if (coffee) {
    coffee.forEach((product) => {
      if (product.id === Number(coffeeId)) {
        productObj = product;
      }
    });
  }


  const isInCart = (coffeeId: number):boolean => Object.values('cart' || {}).includes(coffeeId.toString())

      return (
        <div className={styles.detailContainer}>
        {error && <div>Error: {error}</div>}
        {isLoading ? renderDetailLoader() : null}
         <div className={styles.detailPage}>
         {coffee.map((detail) => (
        <div key={detail.id} className={styles.detailProducts}>
          <div>
          <img className={styles.detailImg} src={detail.image_url} />
          </div>
          <div>
          <p className={styles.detailTitle}>{detail.name}</p>
          <p className={styles.detailText}><strong>Description:</strong> {detail.description}</p>
          <p className={styles.detailText}><strong>Price:</strong> $ {detail.price}</p>
          <p className={styles.detailText}><strong>Region:</strong> {detail.region}</p>
          <p className={styles.detailText}><strong>Weight:</strong> {detail.weight}</p>
          <p className={styles.detailText}><strong>Roast Level:</strong> {detail.roast_level}</p>
          <p className={styles.detailText}><strong>Flavor:</strong> {detail.flavor_profile}</p>
          <p className={styles.detailText}><strong>Grind:</strong> {detail.grind_option}</p>
          <button
            key={detail.id}
            name="ADD TO CART"
            className={styles.detailCartBtn}
            disabled={isInCart(detail.id)}
            data-id={productObj.id}
            data-amount={quantity}
            onClick={(() => addToCart(detail))}>
               ADD TO CART
          </button>
          </div>
        </div>
      ))}
      </div>
        </div>
      );

}
export default Detailed

