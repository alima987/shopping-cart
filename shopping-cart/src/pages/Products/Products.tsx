import { useEffect, useState } from "react"; 
import "./Products.scss";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    region: string;
    weight: number;
    roast_level: number;
    flavor_profile: [];
    grind_option: [];
    image_url: string;
}

const Products = () => {

    const [coffees, setCoffees] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3;

    const getApiData = async () => {
      setIsLoading(true)
      try {
        const baseUrl = `https://fake-coffee-api.vercel.app/api`;
        const response = await fetch(baseUrl);
        const data = await response.json();
        setCoffees(data)
        setIsLoading(false)
      } catch(error) {
         setError(error instanceof Error ? error.message : 'Unknown Error: api.get.data')
         setIsLoading(false)
      }
    }    

 useEffect(() => {
    getApiData();
 }, [])

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
      {currentItem.map((coffee) => (
        <div key={coffee.id} className="product">
          <img className="product-img" src={coffee.image_url} />
          <p className="poduct-text">{coffee.name}</p>
          <p className="poduct-text">{coffee.description}</p>
          <p className="poduct-text">{coffee.price}</p>
          <p className="poduct-text">{coffee.region}</p>
          <p className="poduct-text">{coffee.weight}</p>
          <p className="poduct-text">{coffee.roast_level}</p>
          <p className="poduct-text">{coffee.flavor_profile}</p>
          <p className="poduct-text">{coffee.grind_option}</p>
          <Link to={`/cart/${coffee.id}`}>ADD TO CART</Link>
          <Link to={`/coffees/${coffee.id}`}>Detailed</Link>
          <Outlet />
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