import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    unit: 'C',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setUnit(state, action) {
            state.unit = action.payload;
        },
    },
});

export const {setUnit} = settingsSlice.actions;
export default settingsSlice.reducer;
