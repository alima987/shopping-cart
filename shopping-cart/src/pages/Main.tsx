import coffee from "../assets/coffee.jpg"
import selection from "../assets/selection.jpg"
import gift from "../assets/gift.webp"
import giftTwo from "../assets/giftTwo.webp"
import giftThree from "../assets/giftThree.webp"

const Main = () => {

  return (
    <div>
        <div>
        <h2>Fresh Roasted Coffee</h2>
        <div>
          <h3>The New Sensation</h3>
          <p>Introducing Roastopus, the newest sensation in the world of coffee! Made from a unique blend of premium beans, Roastopus offers a taste experience like no other. With its rich aroma and smooth flavor profile, Roastopus is sure to become your new favorite brew. Discover the difference with Roastopus and elevate your coffee experience to new heights!</p>
          <img src={coffee}/>
        </div>
        <div>
          <h3>Our Coffee Selections</h3>
          <p>Explore the diverse and exquisite flavors of our coffee selections, including the exceptional ACRE blend, crafted to delight coffee enthusiasts with its unique taste profile.</p>
          <img src={selection}/>
        </div>
        <div>
          <h3>Find Your Gift</h3>
          <img src={gift} />
          <img src={giftTwo} />
          <img src={giftThree} />
        </div>
        </div>
    </div>
  )

}
export default Main