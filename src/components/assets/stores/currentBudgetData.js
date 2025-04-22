import { defineStore, storeToRefs } from "pinia";
import { useColourStore } from "./colourStore";

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
    }, 
    
    addCategory(name, description, categoryId=this.categories.length, colourId = 301){
      
      const newCategory = {
        category_id: categoryId,
        colour_id: colourId,
        description,
        expenses: [],
        name
      }
      
      this.categories.push(newCategory)
      
      
    },

    changeBudget(newTotalBudget) {
      this.$patch({budget:{budget:newTotalBudget}})
    }

  },
  getters: {
    getCategories: (state) => {
      let colorStore = useColourStore()
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
      newCategories.forEach(
        (cat) =>
          cat.hex_code = colorStore.getHexFromId(cat.colour_id)
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
    getCatPieDataFull(){
      const getNewPie = structuredClone(this.getCatPieData)
      
      getNewPie.labels.push("Remaining")
      getNewPie.datasets[0].backgroundColor.push("#008000")
      getNewPie.datasets[0].data.push(this.getSpendingLeft)
      getNewPie.datasets[0].budgetInfo = [this.getSpendingLeft,this.budget.budget]
      return getNewPie
    },
    getCatPieData: (state)=>{
      let colorStore = useColourStore()
      return {
        labels: (state.categories.map((cat) => {
          return cat.name;
        })),
        datasets: [
          {
            backgroundColor: state.categories.map((cat)=>colorStore.getHexFromId(cat.colour_id)),
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
    },
    getRatioLeftOfPeriod (){

    
      return (Date.now() - this.budget.interval.start_date)/(this.budget.interval.end_date-this.budget.interval.start_date)
    },
    getSpendingLeft () {
      return this.budget.budget - this.getCatAmounts.reduce((acc,curr)=>acc + curr,0)
    }
  },
});
