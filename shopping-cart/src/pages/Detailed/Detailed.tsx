import { useParams } from "react-router-dom"
import { Product } from "../Products/Products"
import { useEffect, useState} from "react";

type DetailedProps = {
    coffees: Product[];
  }
  

const Detailed = ({coffees}: DetailedProps) => {
    const { id } = useParams();
      useEffect(() => {
        const detailData= coffees.find((coffee) => coffee.id === Number(id))
      }, [coffees])

    //const detailData= coffees.find((coffee) => coffee.id === Number(id));
    //console.log(detailData)
    
    if (!coffees) {
        return <div>Product not found</div>;
      }
    
      return (
        <div>
            {coffees.name}
        </div>
      );

}
export default Detailed