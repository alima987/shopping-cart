import { Product } from "../Products/Products"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detailed = () => {
    const { coffeeId } = useParams()
    const [coffee, setCoffee] = useState<Product[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
      const baseUrl = 'https://fake-coffee-api.vercel.app/api';
      setIsLoading(true)
      const fetchCoffee = async () => {
        try {
          const response = await fetch(`${baseUrl}/${coffeeId}`);
          const data = await response.json();
          setCoffee(data)
          setIsLoading(false)
        } catch(error) {
           setError(error instanceof Error ? error.message : 'Unknown Error: api.get.data')
           setIsLoading(false)
        }
      }
      fetchCoffee()
    }, [coffeeId])

    const renderDetailLoader = () => {
      return <div>Loading...</div>
   }
   console.log()

      return (
        <div>
        {error && <div>Error: {error}</div>}
        {isLoading ? renderDetailLoader() : null}
         <div className="detail-page">
        {coffee.map((detail) => (
        <div key={detail.id} className="product">
          <img className="product-img" src={detail.image_url} />
          <p className="poduct-text">{detail.name}</p>
          <p className="poduct-text">{detail.description}</p>
          <p className="poduct-text">{detail.price}</p>
          <p className="poduct-text">{detail.region}</p>
          <p className="poduct-text">{detail.weight}</p>
          <p className="poduct-text">{detail.roast_level}</p>
          <p className="poduct-text">{detail.flavor_profile}</p>
          <p className="poduct-text">{detail.grind_option}</p>
        </div>
      ))}
      </div>
        </div>
      );

}
export default Detailed

