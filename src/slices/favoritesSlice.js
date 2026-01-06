import {createSlice} from '@reduxjs/toolkit';
import {loadFromLocalStorage} from '../utils/localStorage';

const initialState = {
    cities: loadFromLocalStorage('favorites') || [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action) {
            const exists = state.cities.some(c => c.id === action.payload.id);

            if (exists) {
                state.cities = state.cities.filter(
                    c => c.id !== action.payload.id,
                );
            } else {
                state.cities.unshift(action.payload);
            }
        },
    },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
