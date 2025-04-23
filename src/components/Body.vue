<script setup>
import {
  getCategories,
  getColours,
  getExpenses,
  PLACEHOLDER_GET_CURR_BUDGET,
} from "@/api/requests";
import PieChart from "./PieChart.vue";
import {useColourStore} from "./assets/stores/colourStore";

import {useStore} from "./assets/stores/currentBudgetData";
import {
  generateCategoryData,
  generateColorData,
  generateCurrentBudget,
  generateExpenseData,
} from "@/utils/testData";

let categoryData = [];
let budgetStore = useStore();
let colorStore = useColourStore();
let colorData = [];

getColours()
  .then((colorData) => {
    colorData = colorData;
    colorStore.$patch({colourPalette: colorData});
    console.log(colorStore, '<<colorStore')
    return PLACEHOLDER_GET_CURR_BUDGET();
  })
  .then((budgetData) => {
    budgetStore.$patch({budget: budgetData});
    return getCategories();
  })
  .then((res) => {
    categoryData = res;
    return getExpenses();
  })
  .then((expensesData) => {
    const category_ids = categoryData.map((cat) => cat._id);

    categoryData.forEach((cat) => (cat.expenses = []));
    categoryData.forEach((cat) => (cat.confirmed = true));

    for (let expense of expensesData) {
      const index = category_ids.indexOf(expense.category_id);
      if (index === -1) {
        return Promise.reject({msg: "no cat found"});
      }

      categoryData[index].expenses.push(expense);
    }

    budgetStore.$patch({categories: categoryData});
  })
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

</script>

<template>
  <div id="bodyDiv">
    <PieChart />

    <router-view v-slot="{Component}" id="routedComponent">
      <Transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </Transition>
    </router-view>
  </div>
</template>

<style scoped>
#bodyDiv {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#routedComponent {
  overflow: scroll;
  height: 29vh;
  width: 90%;
  margin-top: -2.2rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
