import { useEffect, useState } from "react"; 
import "./Products.scss";

interface Product {
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

    const getApiData = async () => {
       const baseUrl = "https://fake-coffee-api.vercel.app/api";
       const response = await fetch(baseUrl);
       const data = await response.json();
       setCoffees(data)
    }    
 useEffect(() => {
    getApiData();
 }, [])

  return (
    <>
    <h2>Coffee</h2>
    <div className="poducts">
      {coffees.map((coffee) => (
        <div key={coffee.id} className="product">
          <img className="product-img" src={coffee.image_url}/>
          <p className="poduct-text">{coffee.name}</p>
          <p className="poduct-text">{coffee.description}</p>
          <p className="poduct-text">{coffee.price}</p>
          <p className="poduct-text">{coffee.region}</p>
          <p className="poduct-text">{coffee.weight}</p>
          <p className="poduct-text">{coffee.roast_level}</p>
          <p className="poduct-text">{coffee.flavor_profile}</p>
          <p className="poduct-text">{coffee.grind_option}</p>
        </div>
      ))}
    </div>
    </>
  )
}
export default Products