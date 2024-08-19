export const generateRandomId = (length = 32) => {
  return [...Array(length)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
};

export const addCommasToNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const groupExpensesByDate = (expenses: Expense[]) => {
  expenses.sort(
    (a, b) =>
      new Date(convertDateStringToISO(b.date)).getTime() -
      new Date(convertDateStringToISO(a.date)).getTime()
  );

  const grouped = expenses.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {} as Record<string, Expense[]>);

  return Object.keys(grouped).map((date) => ({
    title: date,
    data: grouped[date]
  }));
};

export const getPrefixSuffixFromNumber = (number: number) => {
  return number.toFixed(2).split('.');
};

const convertDateStringToISO = (dateString: string, time: string = '00:00:00') => {
  const [day, month, year] = dateString.split('.');
  return `${year}-${month}-${day}T${time}`;
};

export const filterExpenses = (expenses: Expense[], filters: Filters) => {
  return expenses.filter((expense) => {
    const { date, title, amount } = expense;
    const { amount: filterAmount, date: filterDate, title: filterTitle } = filters;

    const isAmountMatch = filterAmount ? amount === filterAmount : true;
    const isDateMatch = filterDate ? date === filterDate : true;
    const isTitleMatch = filterTitle ? title.includes(filterTitle) : true;

    return isAmountMatch && isDateMatch && isTitleMatch;
  });
};
