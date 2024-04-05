import { useParams } from "react-router-dom";
import { useCoffeeApi } from "../../hooks/useCoffeeApi";

const Detailed = () => {
    const { coffeeId } = useParams()
    const baseUrl = `https://fake-coffee-api.vercel.app/api/${coffeeId}`;
    const { data: coffee, error, isLoading } = useCoffeeApi(baseUrl);
    
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
          <p className="detail-text">{detail.name}</p>
          <p className="detail-text">{detail.description}</p>
          <p className="detail-text">{detail.price}</p>
          <p className="detail-text">{detail.region}</p>
          <p className="detail-text">{detail.weight}</p>
          <p className="detail-text">{detail.roast_level}</p>
          <p className="detail-text">{detail.flavor_profile}</p>
          <p className="detail-text">{detail.grind_option}</p>
        </div>
      ))}
      </div>
        </div>
      );

}
export default Detailed

