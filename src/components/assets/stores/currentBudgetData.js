import { defineStore } from "pinia";

export const useStore = defineStore("budgetData", {
  state: () => {
    return { categories: [], budget: {budget_id: 1, budget: 0, interval: {start_date: new Date(), end_date: new Date()}} };
  },
  // could also be defined as
  //  state: () => ({ count: 0 })

  actions: {
    addExpense(amount, categoryId, budgetId = 1, date=new Date(), description = "", expenseId = 0) {
      
      const category = this.categories.find((cat => 
        cat.category_id === categoryId
      ))

      if (!category) return false

      const newExpense = {
        amount,
        budget_id: budgetId,
        category_id: categoryId,
        date,
        description,
        expense_id: expenseId,
      }

      category.expenses.push(newExpense)

      return true
      
      // console.log(newExpense);
    },
    changeBudget(newTotalBudget) {
      
      this.budget.budget = newTotalBudget

    }
  },
  getters: {
    getCategories: (state) => {
      const newCategories = state.categories.map((cat) => {
        const newCat = { ...cat };
        newCat.amount =
          Math.round(
            100 *
              newCat.expenses.reduce((acc, curr) => {
                return acc + curr.amount;
              }, 0)
          ) / 100;
        delete newCat.expenses;
        return newCat;
      });
      const totalSpend = newCategories.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      newCategories.forEach(
        (cat) =>
          (cat.percentage = Math.round((cat.amount / totalSpend) * 10000) / 100)
      );
      return newCategories;
    },
    getCatNames: (state) => {
      return (state.categories.map((cat) => {
        return cat.name;
      }));
    },
    getCatAmounts: (state) => {
      return (state.categories.map((cat) => {
        return  Math.round(
          100 *
            cat.expenses.reduce((acc, curr) => {
              return acc + curr.amount;
            }, 0)
        ) / 100;
      }));
    },
    getCatPieData: (state)=>{
      return {
        labels: (state.categories.map((cat) => {
          return cat.name;
        })),
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#DD3B16'],
            data: (state.categories.map((cat) => {
              return  Math.round(
                100 *
                  cat.expenses.reduce((acc, curr) => {
                    return acc + curr.amount;
                  }, 0)
              ) / 100;
            }))
          }
        ]
      }
    }
  },
});
