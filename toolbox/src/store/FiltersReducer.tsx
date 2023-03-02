import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './Store';

interface IAction {
    type: string
    payload: IFiltersSlice
}

interface SetFilterAction {
    type: string;
    payload: {
        field: keyof IFiltersSlice;
        value: string | number | null | undefined;
    }
}

// Define a type for the slice state
interface IFiltersSlice {
    search: string | undefined;
    category: string;
    minPrice: number | undefined;
    maxPrice: number | undefined;
}

const initialState: IFiltersSlice = {
    search: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined, // 9007199254740991
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(_, action: IAction) {
            return action.payload;
        },
        setFilter(state, action: SetFilterAction) {
            return { ...state, [action.payload.field]: action.payload.value };
        }
    },
})

export const { setFilters, setFilter } = filtersSlice.actions
export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer