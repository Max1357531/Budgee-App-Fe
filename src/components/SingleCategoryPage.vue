<script setup>
import { useRouter } from 'vue-router';
import ExpenseCard from './ExpenseCard.vue';
import { useStore } from './assets/stores/currentBudgetData';
import { computed } from 'vue';

import CategoryCard from './CategoryCard.vue';

const router = useRouter()
let budgetStore = useStore()

const category = computed(()=>budgetStore.getCategories[Number(router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1))])
const expensesShown = computed(()=>budgetStore.categories[Number(router.currentRoute.value.fullPath.match(/\/[^\/]+/g).at(-1).substring(1))].expenses)
console.log(expensesShown.value)


</script>

<template>
  <div>
  
  <div class="categoryList">
    <CategoryCard
        :key="category.category_id"
        :id="category.category_id"
        :name="category.name"
        :amount="category.amount"
        :percentage="category.percentage"
        :hex_code="category.hex_code"
        />


      <div>

        <ExpenseCard v-for="expense in expensesShown" :key="expense.expense_id":expense="expense" :hex_code="category.hex_code"></ExpenseCard>
      </div>

  </div>
</div>
</template>

<style scoped>
</style>