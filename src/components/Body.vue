<script setup>
import PieChart from './PieChart.vue';

import { useStore } from './assets/stores/currentBudgetData';
import { generateCategoryData, generateCurrentBudget, generateExpenseData } from '@/utils/testData';

let categoryData = []
let budgetStore = useStore()
console.log(Object.keys(budgetStore), "here")


generateCurrentBudget().then((budgetData) => {
    budgetStore.$patch({budget:budgetData})
    return generateCategoryData(5)
})
    .then((res) => {
        categoryData = res
        return generateExpenseData(categoryData, 10)
    })
    .then((expensesData) => {
        const category_ids = categoryData.map((cat) => cat.category_id)
        categoryData.forEach((cat) => cat.expenses = [])

        for (let expense of expensesData) {
            const index = category_ids.indexOf(expense.category_id)
            if (index === -1) {
                return Promise.reject()
            }
            categoryData[index].expenses.push(expense)
        }
        budgetStore.$patch({categories:categoryData})
        console.log(expensesData[0])
    })
    .then(() => {


    })
    .catch((err) => {
        console.log(err)
    })



</script>

<template>
    <div id="bodyDiv">
        <PieChart />
        <router-view></router-view>
    </div>
</template>

<style scoped>
#bodyDiv {
    display: flex;
    align-items: center;
    flex-direction: column;


}
</style>