import { useNavigate } from 'react-router-dom';

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${city.id}`, {
      state: city,
    });
  };

  return (
    <div className="city-card" onClick={handleClick}>
      <h3>{city.name}</h3>
    </div>
  );
};

export default CityCard;