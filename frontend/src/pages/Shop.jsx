import Hero from "../components/hero/Hero";
import NewCollections from "../components/newCollections/NewCollections";
import NewsLetter from "../components/newsLetter/NewsLetter";
import Offers from "../components/offers/Offers";
import Popular from "../components/popular/Popular";

import './css/Shop.css';

export const Shop = () => {
  return (
    <div className="shop">
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  )
}

export default Shop;