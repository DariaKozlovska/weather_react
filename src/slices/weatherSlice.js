import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentWeather, getForecast } from '../services/weatherServices';

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({ lat, lon }) => {
        const [current, forecast] = await Promise.all([
            getCurrentWeather(lat, lon),
            getForecast(lat, lon),
        ]);

        return {
            current: current.data,
            forecast: forecast.data.list,
        };
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        current: null,
        forecast: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload.current;
                state.forecast = action.payload.forecast;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.loading = false;
                state.error = 'Błąd pobierania danych pogodowych';
            });
    },
});

export const {setTemperatureUnits} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;