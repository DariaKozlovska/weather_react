import { useNavigate } from 'react-router-dom';

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  return (
    <div
      className="city-card"
      onClick={() => navigate(`/details/${city.id}`)}
    >
      <h3>{city.name}</h3>
    </div>
  );
};

export default CityCard;