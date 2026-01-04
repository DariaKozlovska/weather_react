import { useReducer } from 'react';
import CityCard from '../components/CityCard';
import Details from './Details';
import { CITIES } from '../constants/cities';

const initialState = {
  view: 'LIST',
  selectedCity: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_DETAILS':
      return {
        view: 'DETAILS',
        selectedCity: action.payload,
      };
    case 'BACK_TO_LIST':
      return initialState;
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Lista miejscowości</h1>

      {state.view === 'LIST' && (
        <div>
          {CITIES.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onClick={() =>
                dispatch({ type: 'SHOW_DETAILS', payload: city })
              }
            />
          ))}
        </div>
      )}

      {state.view === 'DETAILS' && state.selectedCity && (
        <Details
          city={state.selectedCity}
          onBack={() => dispatch({ type: 'BACK_TO_LIST' })}
        />
      )}
    </div>
  );
};

export default Home;