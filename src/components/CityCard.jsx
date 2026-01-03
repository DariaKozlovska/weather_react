import { useNavigate } from "react-router-dom";

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${city.id}`)}
      style={{ cursor: "pointer", padding: 16, border: "1px solid #ccc" }}
    >
      <h3>{city.name}</h3>
    </div>
  );
};

export default CityCard;