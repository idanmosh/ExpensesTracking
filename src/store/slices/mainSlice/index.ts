import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MainSliceState = {
  userName: '',
  expenses: [],
  filters: {
    title: '',
    amount: '',
    date: ''
  }
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex((expense) => expense.id === action.payload.id);
      state.expenses[index] = action.payload;
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
    },
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    signOut: () => initialState
  }
});

export const {
  setUserName,
  addExpense,
  signOut,
  updateExpense,
  removeExpense,
  updateFilters,
  resetFilters
} = mainSlice.actions;
export default mainSlice.reducer;
