//import coffee from "../assets/coffee.jpg"
import selection from "../assets/selection.jpg"
import { useCoffeeApi } from "../hooks/useCoffeeApi"
import styles from "../pages/Main/Main.module.css"
import { Link } from "react-router-dom";

const Main = () => {
  const baseUrl = `https://fake-coffee-api.vercel.app/api?limit=1`;
  const { data: coffees, isLoading} = useCoffeeApi(baseUrl);
  const renderLoader = () => {
    return <div>Loading...</div>
 }
  return (
    <div className={styles.container}>
        <div className={styles.section}>
        <h2 className={styles.mainHeadTitle}>Fresh Roasted Coffee</h2>
        <h3 className={styles.mainTitle}>The New Sensation</h3>
        <div className={styles.sensation}>
          <p className={styles.sensationText}>Explore the diverse and exquisite flavors of our coffee selections, including the exceptional ACRE blend, crafted to delight coffee enthusiasts with its unique taste profile.</p>
          <img className={styles.sensationImg} src={selection}/>
        </div>
        <h3 className={styles.mainTitle}>Our Coffee Selections</h3>
        {isLoading ? renderLoader() : null}
          {coffees.map((item) => (
            <div key={item.id} className={styles.selections}>
              <div>
               <img className={styles.mainImg} src={item.image_url}/>
              </div>
              <div>
              <h4 className={styles.selectionTitle}>{item.name}</h4>
              <p className={styles.selectionText}><strong>Description:</strong> {item.description}</p>
              <p className={styles.selectionText}><strong>Region:</strong> {item.region}</p>
              <Link to={`/coffees/${item.id}`}> <button className={styles.seeMoreBtn}>See more</button></Link>
              </div>
            </div>
          ))}
        <div className={styles.section}>
          <h3 className={styles.mainTitle}>Contact Us</h3>
          <p className={styles.selectionText}>Address: 187 Black Street, Brewed Bliss Coffee Co NY 13502</p>
          <p className={styles.selectionText}>Email: coffee@brewedblisscoffee.com</p>
          <p className={styles.selectionText}>Phone: (+1) 958-256-4587</p>
        </div>
        </div>
    </div>
  )

}
export default Main