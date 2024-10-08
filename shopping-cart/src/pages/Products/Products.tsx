import { useState } from "react"; 
import styles from "./Products.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useCoffeeApi, Product } from "../../hooks/useCoffeeApi";
import Search from "../../components/Search";

export interface CartProps {
  [coffeeId: string]: Product
}
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 3;
    const baseUrl = `https://fake-coffee-api.vercel.app/api`;
    const { data: coffees, error, isLoading } = useCoffeeApi(baseUrl);

 const renderLoader = () => {
    return <div>Loading...</div>
 }
 
 const lastItemIndx = currentPage * itemsPerPage;
 const firstItemIndx = lastItemIndx - itemsPerPage;
 const filteredCoffees = coffees.filter((coffee) =>
  coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
);
 const currentItem = filteredCoffees.slice(firstItemIndx, lastItemIndx);
 const paginate = (pageNum: number) => setCurrentPage(pageNum)
 
 const handleSearch = (query: string) => {
  setSearchTerm(query);
  setCurrentPage(1);
};
  return (
    <div className={styles.productContainer}>
    {error && <div>Error: {error}</div>}
    {isLoading ? renderLoader() : null}
    <h2 className={styles.productTitle}>Coffee</h2>
    <Search onSearch={handleSearch}/>
    {filteredCoffees.length === 0 ? (
                <div className={styles.noResults}>Try again with other search terms…</div>
            ) : (
    <div className={styles.poducts}>
      {currentItem.map((coffee: any) => (
        <div key={coffee.id} className={styles.product}>
          <Link to={`/coffees/${coffee.id}`}>
          <img className={styles.productImg} src={coffee.image_url} />
          <p className={styles.productTextTitle}>{coffee.name}</p>
          <p className={styles.productText}><strong>$</strong> {coffee.price}</p>
          </Link>
          <Outlet />
        </div>
      ))}
    </div>
      )}
    <Pagination 
    onNextPageClick={() => paginate(currentPage + 1)}
    onPrevPageClick={() => paginate(currentPage - 1)}
    disable={{left: currentPage === 1, right: lastItemIndx >= coffees.length}}
    nav={{current: currentPage, total: Math.ceil(coffees.length / itemsPerPage)}}
    />
    </div>
  )
}
export default Products