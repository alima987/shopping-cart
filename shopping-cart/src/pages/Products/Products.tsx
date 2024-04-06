import { useState } from "react"; 
import useLocalStorageState from 'use-local-storage-state'
import "./Products.scss";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useCoffeeApi, Product } from "../../hooks/useCoffeeApi";
export interface CartItem {
  product: Product;
  quantity: number;
}
export interface CartProps {
  [coffeeId: string]: Product
}
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3;
    const baseUrl = `https://fake-coffee-api.vercel.app/api`;
    const { data: coffees, error, isLoading } = useCoffeeApi(baseUrl);
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})

    const addToCart = (coffee: Product) => {
     const updatedCart = {...cart, [coffee.id]: coffee}
     setCart(updatedCart)
    }

 const renderLoader = () => {
    return <div>Loading...</div>
 }

 const lastItemIndx = currentPage * itemsPerPage;
 const firstItemIndx = lastItemIndx - itemsPerPage;
 const currentItem = coffees.slice(firstItemIndx, lastItemIndx);
 const paginate = (pageNum: number) => setCurrentPage(pageNum)
 
  return (
    <>
    {error && <div>Error: {error}</div>}
    {isLoading ? renderLoader() : null}
    <h2>Coffee</h2>
    <div className="poducts">
      {currentItem.map((coffee: any) => (
        <div key={coffee.id} className="product">
          <Link to={`/coffees/${coffee.id}`}>
          <img className="product-img" src={coffee.image_url} />
          <p className="poduct-text">{coffee.name}</p>
          <p className="poduct-text">{coffee.price}</p>
          </Link>
          <Outlet />
          <button
         name="ADD TO CART"
         className="cart-btn"
         onClick={() => addToCart(coffee)}
         >
          ADD TO CART
         </button>
        </div>
      ))}
    </div>
    <Pagination 
    onNextPageClick={() => paginate(currentPage + 1)}
    onPrevPageClick={() => paginate(currentPage - 1)}
    disable={{left: currentPage === 1, right: lastItemIndx >= coffees.length}}
    nav={{current: currentPage, total: Math.ceil(coffees.length / itemsPerPage)}}
    />
    </>
  )
}
export default Products