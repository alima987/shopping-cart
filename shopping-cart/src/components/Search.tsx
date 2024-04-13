import { useState } from "react";
import styles from '../components/Search/Search.module.css'
import search from '../assets/search.png'
interface Props {
    onSearch:(query: string) => void
}
const Search = ({onSearch}: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm)
    }
    
 return (
    <div className={styles.searchContainer}>
        <input 
        className={styles.searchInput}
        type="search"
        name="search-input"
        id="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
         <button
          className={styles.searchBtn}
          onClick={handleSearch}
            >
          <img  className={styles.searchImg} src={search} alt="Search" />
          </button>
    </div>
 )
}
export default Search