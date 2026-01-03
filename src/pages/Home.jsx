import './Home.css';

import CityCard from "../components/CityCard";
import { CITIES } from "../constants/cities";

const Home = () => {
  return (
    <div>
      <h1>Lista miejscowości</h1>
      {CITIES.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
};

export default Home;