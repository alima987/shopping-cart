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
          <p>{coffee.name}</p>
          <p>{coffee.description}</p>
          <p>{coffee.price}</p>
          <p>{coffee.region}</p>
          <p>{coffee.weight}</p>
          <p>{coffee.roast_level}</p>
          <p>{coffee.flavor_profile}</p>
          <p>{coffee.grind_option}</p>
        </div>
      ))}
    </div>
    </>
  )
}
export default Products