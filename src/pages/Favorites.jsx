import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CityCard from '../components/CityCard';
import { setUnit } from '../slices/unitSlice';
import starIcon from '../assets/icons/star.png';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.cities);
  const unit = useSelector(state => state.unit.unit);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-indigo-950 text-white p-6">
      <div className="max-w-5xl mx-auto relative">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-white/70 hover:text-white transition"
        >
          ← Powrót
        </button>

        {/* UNIT SWITCH */}
        <div className="absolute top-6 right-6 flex gap-2">
          {['C', 'F', 'K'].map(u => (
            <button
              key={u}
              onClick={() => dispatch(setUnit(u))}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                unit === u
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {u}°
            </button>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-6">Ulubione miasta</h1>

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-white/70 mt-24">
            {/* <span className="text-5xl mb-4">⭐</span> */}
            <img src={starIcon} alt="Star Icon" className="text-5xl mb-4" />
            <p className="text-lg font-medium">
              Nie masz jeszcze ulubionych miast
            </p>
            <p className="text-sm mt-1">
              Dodaj je klikając gwiazdkę przy nazwie miasta
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map(city => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;