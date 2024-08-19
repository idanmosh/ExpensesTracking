type Expense = {
  id: string;
  title: string;
  amount: string;
  date: string;
};

type MainSliceState = {
  userName: string;
  expenses: Expense[];
  filters: Filters;
};

type Filters = {
  title: string;
  amount: string;
  date: string;
};
