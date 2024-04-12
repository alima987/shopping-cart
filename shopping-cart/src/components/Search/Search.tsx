import { useState } from "react";
interface Props {
    onSearch:(query: string) => void
}
const Search = ({onSearch}: Props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const hendleSearch = () => {
        onSearch(searchTerm)
    }
   
 return (
    <div>
        <input 
        type="search"
        name="search-input"
        id="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input 
        type="button"
        value="Search"
        onClick={hendleSearch}/>
    </div>
 )
}
export default Search